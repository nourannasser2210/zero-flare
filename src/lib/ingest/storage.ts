/**
 * Storage layers for batched ingestion + cumulative registries.
 *
 * Layout (exactly the layers requested by the ingestion contract):
 *   data/raw/batches/<batchId>/…        immutable uploaded bytes
 *   data/extracted/batches/<batchId>/…  per-file extraction JSON + plain text
 *   data/normalized/batches/<batchId>/… harmonized tabular snapshots
 *   data/curated/…                      post-audit curated content
 *   data/derived/…                      derived artifacts (post-audit)
 *   data/media/batches/<batchId>/…      figures, images, video frames
 *   data/ingest/registry.json           global file registry (hash → first seen)
 *   data/ingest/batches.json            batch index
 *   data/ingest/batches/<id>.json       full batch receipts
 *   data/ingest/cumulative.json         cumulative totals + user-confirmation gate
 *   knowledge/entities.json             cumulative entity registry (evidence-backed)
 *   knowledge/index.json                searchable text index for retrieval
 *   reports/…                           global audit reports
 *   models/MODEL_POLICY.md              versioning policy (never silent overwrite)
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import type { BatchReceipt, CumulativeTotals } from "./types";

export const ROOT = process.cwd();

export const LAYERS = {
  raw: "data/raw/batches",
  extracted: "data/extracted/batches",
  normalized: "data/normalized/batches",
  curated: "data/curated",
  derived: "data/derived",
  media: "data/media/batches",
  ingest: "data/ingest",
  knowledge: "knowledge",
  models: "models",
  reports: "reports",
} as const;

async function ensureDir(p: string) {
  await fs.mkdir(path.join(ROOT, p), { recursive: true });
}

export async function ensureLayers() {
  for (const layer of [
    "data/raw/batches",
    "data/extracted/batches",
    "data/normalized/batches",
    "data/curated",
    "data/derived",
    "data/media/batches",
    "data/ingest/batches",
    "knowledge",
    "models",
    "reports",
  ]) {
    await ensureDir(layer);
  }
}

export async function writeJson(relPath: string, data: unknown) {
  const abs = path.join(ROOT, relPath);
  await fs.mkdir(path.dirname(abs), { recursive: true });
  const tmp = `${abs}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmp, abs); // atomic-ish swap; registry never left half-written
}

export async function readJson<T>(relPath: string, fallback: T): Promise<T> {
  try {
    const abs = path.join(ROOT, relPath);
    return JSON.parse(await fs.readFile(abs, "utf8")) as T;
  } catch {
    return fallback;
  }
}

export async function writeText(relPath: string, text: string) {
  const abs = path.join(ROOT, relPath);
  await fs.mkdir(path.dirname(abs), { recursive: true });
  await fs.writeFile(abs, text, "utf8");
}

export async function fileExists(relPath: string) {
  try {
    await fs.access(path.join(ROOT, relPath));
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Registry: sha256 → first-seen record. Drives duplicate detection.
// ---------------------------------------------------------------------------

export interface RegistryEntry {
  sha256: string;
  firstSeenBatch: string;
  firstSeenName: string;
  firstSeenAt: string;
  sizeBytes: number;
  kind: string;
}

export interface Registry {
  version: 1;
  entries: Record<string, RegistryEntry>;
}

export async function loadRegistry(): Promise<Registry> {
  return readJson<Registry>("data/ingest/registry.json", { version: 1, entries: {} });
}

export async function saveRegistry(r: Registry) {
  await writeJson("data/ingest/registry.json", r);
}

// ---------------------------------------------------------------------------
// Batch index + receipts.
// ---------------------------------------------------------------------------

export interface BatchIndexEntry {
  batchId: string;
  receivedAt: string;
  fileCount: number;
}

export async function loadBatchIndex(): Promise<BatchIndexEntry[]> {
  return readJson<BatchIndexEntry[]>("data/ingest/batches.json", []);
}

export async function saveBatchIndex(entries: BatchIndexEntry[]) {
  await writeJson("data/ingest/batches.json", entries);
}

export async function loadReceipt(batchId: string): Promise<BatchReceipt | null> {
  const safeId = batchId.replace(/[^A-Za-z0-9_-]/g, "");
  return readJson<BatchReceipt | null>(`data/ingest/batches/${safeId}.json`, null);
}

export async function saveReceipt(receipt: BatchReceipt) {
  await writeJson(`data/ingest/batches/${receipt.batchId}.json`, receipt);
}

// ---------------------------------------------------------------------------
// Cumulative totals.
// ---------------------------------------------------------------------------

export const EMPTY_CUMULATIVE: CumulativeTotals = {
  batches: 0,
  files: 0,
  uniqueFiles: 0,
  duplicateFiles: 0,
  documents: 0,
  pages: 0,
  chars: 0,
  tables: 0,
  tableRows: 0,
  equations: 0,
  figures: 0,
  mediaAssets: 0,
  entities: 0,
  errors: 0,
  userConfirmedAllUploads: false,
  lastBatchId: null,
  updatedAt: new Date(0).toISOString(),
};

export async function loadCumulative(): Promise<CumulativeTotals> {
  return readJson<CumulativeTotals>("data/ingest/cumulative.json", EMPTY_CUMULATIVE);
}

export async function saveCumulative(c: CumulativeTotals) {
  await writeJson("data/ingest/cumulative.json", c);
}

// ---------------------------------------------------------------------------
// Knowledge registry — entities with evidence-backed mentions.
// ---------------------------------------------------------------------------

export interface KnowledgeEntity {
  id: string;
  label: string;
  type: string;
  firstSeenBatch: string;
  mentions: {
    batchId: string;
    source: string;
    location: string;
    context: string;
  }[];
}

export interface KnowledgeBase {
  version: 1;
  entities: Record<string, KnowledgeEntity>;
}

export async function loadKnowledge(): Promise<KnowledgeBase> {
  return readJson<KnowledgeBase>("knowledge/entities.json", { version: 1, entities: {} });
}

export async function saveKnowledge(k: KnowledgeBase) {
  await writeJson("knowledge/entities.json", k);
}

// ---------------------------------------------------------------------------
// Searchable text index (feeds future BM25; records provenance per doc).
// ---------------------------------------------------------------------------

export interface IndexDoc {
  id: string;
  source: string;
  batchId: string;
  kind: string;
  location: string;
  text: string; // ≤ 4000 chars per doc
}

export interface TextIndex {
  version: 1;
  docs: IndexDoc[];
}

export async function loadTextIndex(): Promise<TextIndex> {
  return readJson<TextIndex>("knowledge/index.json", { version: 1, docs: [] });
}

export async function saveTextIndex(i: TextIndex) {
  await writeJson("knowledge/index.json", i);
}

export function nextBatchId(existing: { batchId: string }[]): string {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const prefix = `B-${today}-`;
  const seq = existing.filter((b) => b.batchId.startsWith(prefix)).length + 1;
  return `${prefix}${String(seq).padStart(3, "0")}`;
}
