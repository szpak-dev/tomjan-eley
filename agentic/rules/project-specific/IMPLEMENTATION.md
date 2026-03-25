# Project-Specific Implementation Rules

Document Class: leaf

## Purpose

Use this file to implement work in this repository once the task has already been classified and routed.

## Applies When

Read this file after [TASK_BOOTSTRAP.md](TASK_BOOTSTRAP.md) or when a trivial task already has clear ownership and does not need a separate planning or refactoring pass.

## Scope

This file defines the project task model for direct implementation.
It does not replace the generic planning, module, refactoring, or testing rules.
It adapts them to this repository so agents do not invent a backend-style architecture that the codebase does not use.

## Repository Shape

Treat the repository as a content-driven Astro site with these ownership seams:

1. `src/pages` owns route entrypoints and static path generation.
2. `src/layouts` owns page composition and route-level rendering structure.
3. `src/components` owns reusable presentation pieces.
4. `src/content` owns content access, read models, and translation access used by the UI.
5. `src/i18n` owns translation dictionaries and translation utilities.
6. `src/libs` owns generic environment, URL, and external-service helpers.
7. `src/content.loader.ts`, `src/content.dictionaries.ts`, and `src/content.translations.ts` own content ingestion and transformation scripts.
8. `public` and `scraped` are assets and source material, not ownership anchors for application behavior.

## Task Classification

Use the primary work type chosen during bootstrap.

### Content Ingestion Task

Use this when the task changes scraped input handling, content generation, dictionaries, or translation synchronization.

Primary owners:

1. `src/content.loader.ts`
2. `src/content.dictionaries.ts`
3. `src/content.translations.ts`
4. `src/content/**`

### Content Access Task

Use this when the task changes how pages or components read categories, manufacturers, products, or translation helpers.

Primary owners:

1. `src/content/*.repository.ts`
2. `src/content/index.ts`
3. `src/i18n/**` when translation access changes

### Presentation Task

Use this when the task changes markup, styling, composition, or route presentation.

Primary owners in order:

1. `src/components/**`
2. `src/layouts/**`
3. `src/pages/**`
4. `src/styles/**`

### Integration Helper Task

Use this when the task changes Cloudinary, deployment, or URL helpers.

Primary owners:

1. `src/libs/**`

## Deterministic Placement Rules

1. Keep `src/pages` thin. A page should declare route params, static paths, and hand off rendering.
2. Put route composition in `src/layouts`, not in `src/pages`.
3. Keep reusable visual building blocks in `src/components`.
4. Keep repository and read-model logic in `src/content`, not in layouts or components.
5. Keep translation primitives in `src/i18n`. Do not move translation dictionaries or translator construction into components.
6. Keep environment-specific or third-party helper code in `src/libs`.
7. Prefer passing route-derived state as props from pages or layouts. Read `Astro.params` deep in components only when the existing local pattern makes a wider refactor disproportionate.
8. If a component needs multiple repositories or orchestration logic, move that logic up to the layout or page instead of turning the component into a controller.
9. Prefer importing repositories through `src/content/index.ts` when consuming behavior. Use direct repository imports only when a file needs a type that is not re-exported cleanly.
10. Do not create new architectural layers unless a task proves the current seams cannot express the responsibility clearly.

## Default Execution Order

Choose the first matching sequence.

### Content Ingestion

1. source input contract
2. transformation script
3. generated content shape
4. repository access
5. UI consumption

### Content Access

1. repository contract
2. repository implementation
3. layout or page consumer
4. component consumer

### Presentation

1. supporting content or helper contract if needed
2. component
3. layout
4. page
5. style adjustment

### Integration Helper

1. helper contract
2. helper implementation
3. consuming layout or component

If a higher-level file reveals a missing lower-level concept, stop and place the missing concept in its owning seam before continuing.

## Verification Matrix

Run the smallest valid set that matches the change.

1. For repository, routing, layout, or component changes, run `npm run build`.
2. For content loader changes, run `npm run load:contents` and then `npm run build`.
3. For dictionary generation changes, run `npm run dicts:build` and then `npm run build`.
4. For translation synchronization changes, run `npm run translations` or `npm run translations:update` as appropriate, then `npm run build`.
5. For route or user-visible rendering regressions that are hard to trust from build output alone, run the relevant Playwright coverage if it exists.

## Refactoring Rule For This Repo

1. Default to in-place refactors for small Astro site changes.
2. Use the generic refactoring rule set only when ownership is unclear, responsibilities are being moved substantially, or a fresh slice is cleaner than incremental repair.
3. Do not create backend-style `domain`, `application`, `infrastructure`, or `ui` folders under `src` unless the repository is intentionally being re-architected and that plan is explicitly approved.

## Stop And Ask If

1. the task requires changing generated content files and the intended source of truth is unclear
2. a new responsibility could live in either `src/content` or `src/libs` and the deciding boundary is not obvious
3. a page starts owning business or content-selection logic that should move into a repository or layout
4. the task appears to require a new public seam that current pages, layouts, components, content, i18n, and libs cannot represent cleanly

## Acceptance Check

1. The task is classified into one primary work type before implementation.
2. Changes stay inside the owning seam unless a supporting seam is explicitly required.
3. Pages remain thin, layouts compose, components present, content reads, i18n translates, and libs integrate.
4. The verification commands match the files that changed.