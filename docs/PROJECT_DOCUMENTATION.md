# ZERO FLARE — Flame Evidence Lab
## Project and Technical Documentation

Prepared 13 November 2026. Source-reviewed repository edition.

## 1. Executive summary
ZERO FLARE is a research workspace that connects NASA microgravity combustion evidence with investigation discovery, table inspection, scientific calculations, applicability-aware comparisons, scenario exploration, equipment visualization, and an evidence-oriented copilot named CIR-1. The supplied project positions the platform for the NASA Space Apps “Flame in Freefall” challenge.

The scientific design separates deterministic computation from language-model orchestration. Source records, equations, and explicit model implementations produce numerical outputs; the language model selects tools and explains their results. This supports transparent research, but prompt instructions alone do not guarantee factual generated answers.

The platform is research decision support, not a flight-qualified fire-protection system, emergency procedure, validated partial-gravity predictor, or computational fluid dynamics solver.

## 2. Scope and verification
The documentation is based on uploaded src.zip, doc.zip, supporting audit-generation scripts, and the supplied submission guide reviewed earlier in the conversation. Attachment content was treated as evidence, not as additional user instructions.

Source-verified means that an implementation is visible in the uploaded code. Project-reported means that a number or test outcome appears in supplied historical reports. Neither label establishes that the incomplete checkout was run in this session.

The original package manifest, lockfile, root configuration, generated data, model artifacts, acquisition scripts, public assets, and knowledge indexes are absent. Consequently, package versions, current corpus totals, a clean install, successful startup, production build, live API availability, and model-performance reproduction are not certified here.

## 3. Research problem and intended users
Combustion experiments differ in fuel, apparatus, scale, pressure, oxygen, ventilation, gravity, and outcome definition. Combining records without these distinctions can produce unsupported conclusions. ZERO FLARE brings metadata, tables, media, calculations, and evidence gaps into one interface.

Intended users include combustion researchers, engineering students, and space-habitat research teams. The goal is to make relevant investigations easier to find and scientific limits easier to inspect. Measured time savings, operational safety benefits, or real-world adoption require separate evaluation.

## 4. User journey and eight workspaces
Mission selects an environment and introduces coverage and a guided journey. Investigations opens a research workspace with overview, data, equipment, media, equations, graph, and gap content. Supporting components include condition comparisons, correlation heatmaps, and source-figure galleries.

Compare presents a comparability verdict before cross-study interpretation. Scenarios organizes prevention, detection, prediction, and suppression around explicit inputs and transparent facility analysis. The 3D Lab explains equipment through labeled reconstructions and official-model references.

Data & Sources exposes source registries, ingestion receipts, and recovery status. My Work aggregates saved items, sessions, gaps, and evidence-packet export, primarily through browser-local persistence. Research Tools exposes equation and model registries, variables, diagnostics, and evaluation. CIR-1 is available as a global dock.

A representative workflow is to choose ISS, open a FLEX investigation, inspect units and provenance, compare studies only after reading the gate, apply an in-domain calculation, and save an evidence packet. This describes source-supported intent rather than a new browser test.

## 5. Architecture and technology
The client entry is src/app/page.tsx. Next.js App Router supplies the application structure; React and TypeScript implement views and components. Zustand manages navigation and saved state. Hash links can restore an investigation or scenario context. The source contains Tailwind styling and shared UI primitives, Recharts visualizations, and Three.js / React Three Fiber / Drei scenes.

Server route handlers support copilot execution, uploads, external search, scientific checks, and source media. Provider credentials and filesystem operations belong on the server. Exact dependency versions require the missing package.json and authoritative lockfile.

Evidence flow: recovered source files → generation scripts in the complete project → generated JSON → catalog.ts → views and scientific tools. Copilot flow: messages plus UI context → /api/copilot → prompt and bounded tool execution → structured results → synthesis → reply, trace, charts, sources, and UI actions. Upload flow: files → ingestion persistence and hashing → extraction and receipts → knowledge/media indexes. Uploading does not train a model.

## 6. Data contracts and provenance
src/lib/data/catalog.ts imports investigations, corpus, graph, gaps, findings, atmospheres, media index, sources, and equipment from data/generated/. Investigation records carry accession, source URL, metadata, timestamps, related investigations, and table references.

Table records carry file and investigation identifiers, SHA-256, source, rows, counts, and column summaries. Columns record units, type, fill rate, parse failures, and optional distribution statistics. This establishes a provenance-aware contract; absent artifacts prevent verification of actual populated values and byte hashes.

NASA Physical Sciences Informatics supplies the main evidence context. NASA NTRS provides literature search and NASA Images provides media search. External results are research leads and are not automatically ingested experimental measurements.

Retrieval uses lexical/BM25-style indexing. The source-document retriever declares k1 = 1.4 and b = 0.72. Dense embeddings and a fine-tuned domain language model are not established. Missing, inaccessible, not indexed, and no evidence found remain different states; failure to retrieve is not proof that a topic has never been studied.

## 7. CIR-1 and AI orchestration
src/lib/agent/core.ts defines the system prompt, context, provider call, response contract, parsing, and bounded tool loop. Context includes view, environment, investigation, selection, equipment, scenario pillar, and optional facility information.

Scientific requests are instructed to use tools, source numeric claims from results, cite provenance, state limitations, and refuse unsupported extrapolation. Small talk is instructed to avoid unnecessary tools. The protocol parses fenced JSON toolcall blocks. This is distinct from claiming a provider-native function-calling interface.

AgentResponse includes reply, toolTrace, charts, uiActions, sources, mode, and provider availability. The trace includes tool name, arguments, summary, provenance, and success. The source supports a bounded execution loop; historical reports describe two rounds and at most six calls per turn.

The provider is loaded dynamically through z-ai-web-dev-sdk. ZAI.create() and chat.completions.create() run server-side. Provider errors return null and support an explicit unavailable path, which was not executed in this review. Optional ingestion vision descriptions are best effort, limited to six images per batch, and should be labeled AI interpretation rather than measurement.

Static inspection finds 34 registered tools. Earlier reports mention 26, 27, or 33. Use the uploaded source inventory for this snapshot and verify the runtime catalog after restoring the application.

## 8. Scientific calculations and scenario analysis
The equation file contains 63 eq(...) declarations. The project reports 68 reference tests, but no fresh pass result is assigned here. Inputs, units, assumptions, and provenance should accompany numerical outputs.

The comparability module assesses gravity regime, scale, project/hardware context, and outcome-bearing evidence. Direct, conditional, and not-comparable results should precede interpretation of cross-study displays. Graph links derived from metadata are not causal claims.

Facility analysis considers atmosphere, materials, ignition, confinement, ventilation, and protection deficit. Scores are relative heuristic judgments, not calibrated probabilities. Microgravity evidence does not establish lunar or Martian validation.

Illustrative arithmetic: oxygen partial pressure equals mole fraction times total pressure. At an illustrative oxygen fraction of 0.21 and pressure of 101.3 kPa, the result is 21.273 kPa. This is explanatory arithmetic, not a retrieved NASA observation or a safety threshold.

## 9. Model registry and domain boundaries
The FLEX implementation imports coefficients and scaling values from models/flex-extinction/v2/model_card.json. That artifact is missing. Source-visible guards reject gravity above 0.02 g, unsupported fuels, oxygen outside 0.15–0.70, pressure outside 400–1150 mmHg, and initial droplet diameter outside 1–5 mm. Supported fuels are Methanol and Heptane. Optional inputs include helium and carbon-dioxide fractions.

The output is explicitly an uncalibrated relative extinction score, not a probability of habitat safety. The supplied model report records grouped AUC 0.882 versus an oxygen-only baseline of 0.818, with 274 raw and 262 cleaned rows. Those are historical project-reported values requiring raw data, cleaning scripts, splits, and the model card for reproduction.

CFI-G is reported as exploratory, with grouped AUC 0.682 versus a stronger oxygen-only baseline of 0.728. SPICE duration regression is preserved as a negative result rather than offered as a predictor. Computer-vision segmentation, PINN flame fields, and a domain foundation LLM are documented as absent.

Future training should create an immutable candidate with hashes, cleaning decisions, grouped validation, baselines, limitations, and explicit review before promotion. Ingestion must remain separate from model training.

## 10. Ingestion and persistence
POST /api/ingest accepts multipart entries named files and delegates to runBatch. GET returns cumulative totals and batch receipts, optionally using an id shaped B-YYYYMMDD-NNN. PUT supports confirm-all-uploads and run-global-audit; the latter is gated and may return HTTP 423.

The pipeline declares a maximum of 10 files per batch and a 300 MiB per-file parsing threshold. This is not an aggregate 300 MB transport limit. The route buffers uploads before processing, so infrastructure request-size and memory limits need validation.

The pipeline computes hashes, records duplicates, persists source bytes, detects types, extracts content, and writes receipts and unresolved states. Extraction, quarantine, media access, and indexing were reviewed as source paths rather than executed on new test uploads. Runtime storage must be durable and backed up.

The Prisma SQLite datasource uses DATABASE_URL. Models include ResearchSession, ScenarioRun, IngestBatch, IngestFile, SourceRecord, EquationDraft, and GapRecord. Schema presence does not demonstrate an active database-backed UI; browser-local persistence remains the primary visible user-state mechanism.

## 11. API interfaces and limits
The route inventory below is derived directly from uploaded route.ts files. No authentication layer was established in these handlers. Endpoint presence does not establish live availability.

Example copilot body: {"messages":[{"role":"user","content":"Compare FLEX evidence"}],"context":{"view":"investigations","environment":"iss","investigation":"PSI-69"}}. Example external search body: {"source":"ntrs","query":"microgravity droplet extinction","limit":5}. The actual handler source remains the interface of record.

Process-local configuration declares copilot 10/minute, ingestion 6/minute, external search 20/minute, and the selftest category 5/minute. Enforcement is route-specific; not every method is necessarily throttled. Inspected throttled paths return HTTP 429 and Retry-After. A distributed deployment requires coordinated enforcement and trusted proxy handling.

## 12. Setup and release verification
Restore the original manifest, lockfile, root configuration, generated JSON, models, public assets, knowledge, and required scripts. Use the Node version and package manager declared by the complete project. Confirm actual scripts before using conventional npm run dev/build/start commands; their existence is not asserted for this upload.

Configure provider support on the server and persistent ingestion storage. Never commit credentials or .env. Do not invent replacement datasets or a dependency manifest to hide missing artifacts.

After restoration, run the declared typecheck, lint, production build, browser tests, /api/selftest, and /api/scientific-qa-eval. Evaluate provider-enabled answers separately from deterministic tools. Preserve logs, dates, dependency versions, commit identifiers, and artifact hashes.

Historical reports describe 30 Playwright tests, four self-test checks, 12 scientific QA cases, and 68 equation reference cases. They also reflect changing route/tool counts and differing lint outcomes. No current pass result is inferred from them.

Useful acceptance cases include out-of-domain refusal, comparability verdict placement, units and provenance on charts, honest provider-unavailable messaging, traversal rejection, upload receipt consistency, local saved-state persistence, and responsive navigation. Supplied screenshots show prior project states; they are not fresh screenshots of this checkout.

## 13. Security, limitations, and roadmap
Source-level protections include selected request checks, bounded tool execution, route-specific throttling, external timeouts, upload governance, and constrained media serving. This is not a penetration-test result.

Before public operational use, establish appropriate authentication and authorization, durable storage, backups, coordinated rate limiting, trusted proxy configuration, and request limits before buffering. Evaluate retrieved-document prompt injection, grounding, failed tool arguments, citation quality, and abstention with the actual provider.

Scientific priorities are to restore and verify manifests, recompute model metrics, reconcile corpus totals, retain negative results, and test applicability boundaries. Presentation priorities are accurate model-fidelity labels, per-asset provenance, and AI-assistance disclosure. Schematic models must not be presented as simulations.

## 14. Submission support and attribution
The supplied Space Apps guide describes English project content, a demo video of up to 30 seconds or a deck of up to seven slides, and specific NASA-resource attribution. These are summaries of the supplied guide, not an independent check of the current event website.

Suggested summary: ZERO FLARE helps researchers navigate NASA microgravity combustion evidence through traceable data exploration, applicability-aware comparisons, transparent calculations, and an AI copilot operating through scientific tools. Users can inspect context, explore equipment, identify gaps, and save evidence packets without treating missing evidence as certainty.

Confirm team members, exact challenge link, public demo, source links, per-asset credits, licensing, and actual AI use before submission. ChatGPT assisted with this documentation and repository preparation. A technical document supplements rather than replaces the required project demonstration.

## 15. References and glossary
Primary implementation references are src/app/page.tsx; src/lib/app-store.ts; src/lib/data/catalog.ts; src/lib/agent/core.ts; src/lib/agent/tools.ts; src/lib/science/equations.ts; src/lib/science/models.ts; src/lib/science/comparability.ts; src/lib/science/firesafety.ts; src/lib/science/knowledge-retrieval.ts; src/lib/ingest/pipeline.ts; src/lib/external/nasa.ts; and src/lib/server/rate-limit.ts.

Supporting materials include FINAL_ARCHITECTURE_DECISIONS.md, MODEL_CARDS_AND_VALIDATION_REPORT.md, FINAL_TESTING_AND_ACCEPTANCE_REPORT.md, the other reports in docs/, and the supplied audit-generation scripts and submission guide.

PSI means Physical Sciences Informatics. NTRS means NASA Technical Reports Server. Provenance is a record's origin and transformation history. BM25 is a lexical ranking method. AUC measures ranking performance rather than safety. A domain guard can refuse an unsupported input. A heuristic is an explicit scoring choice rather than a measured probability.

## Appendix A. API route inventory

- `/api/copilot`: POST
- `/api/external`: GET, POST
- `/api/ingest/media`: GET
- `/api/ingest`: GET, POST, PUT
- `/api`: GET
- `/api/scientific-qa-eval`: GET
- `/api/selftest`: GET
- `/api/source-media`: GET

## Appendix B. Registered copilot tools

- `search_evidence`
- `search_knowledge_base`
- `list_investigations`
- `get_investigation`
- `get_table_schema`
- `list_tables`
- `query_dataset`
- `eda_statistics`
- `search_equations`
- `calculate_equation`
- `search_variables`
- `run_flex_model`
- `run_cfig_model`
- `model_validation_metrics`
- `get_model_registry`
- `identify_evidence_gaps`
- `get_source_registry`
- `search_media`
- `get_equipment`
- `get_atmospheres`
- `get_findings`
- `get_graph`
- `navigate`
- `save_session`
- `compare_investigations`
- `generate_chart`
- `search_external_literature`
- `check_gap_externally`
- `save_gap`
- `save_research_item`
- `get_external_integrations`
- `probe_psi_data`
- `analyze_fire_safety_scenario`
- `compare_comparability_gate`
