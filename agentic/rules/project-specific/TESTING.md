# Project-Specific Testing Rules

Document Class: leaf

## Purpose

Use this file to choose verification strategy and concrete checks for this Astro repository.

## Applies When

Read this file when the main question is how to verify changes in pages, layouts, components, content repositories, generation scripts, translations, or route behavior in this repository.

## Scope

This file converts generic testing intent into repository-specific verification choices.
It does not replace the generic test philosophy in [../tests/TESTS.md](../tests/TESTS.md).
It tells the agent which commands and seams are meaningful here.

## Verification Priority

Use the smallest check that gives trustworthy signal.

1. `npm run build` is the default verification for route composition, Astro rendering, repository usage, and import correctness.
2. Content generation changes should run the relevant generation command before `npm run build`.
3. Playwright should be used for route behavior or rendering confidence only when build output is not enough.
4. If no automated test exists for a user-visible behavior, prefer naming the missing coverage explicitly rather than inventing fragile deep tests.

## Repository-Specific Test Seams

Choose the highest seam that proves the behavior:

1. route seam: page generation, params, and final rendered route contract
2. layout seam: route-level composition and data handoff
3. component seam: reusable presentation contract with explicit props
4. content seam: repository behavior and translation access
5. generation seam: content loader, dictionary builder, and translation synchronization scripts
6. helper seam: URL, deployment, and Cloudinary helpers

## Command Matrix

Use the first matching set.

### Route, Layout, Component, or Repository Change

1. run `npm run build`

### Content Loader Change

1. run `npm run load:contents`
2. run `npm run build`

### Dictionary Builder Change

1. run `npm run dicts:build`
2. run `npm run build`

### Translation Workflow Change

1. run `npm run translations` or `npm run translations:update`
2. run `npm run build`

### Route Regression or UX-Critical Rendering Change

1. run the minimum relevant Playwright coverage if a test exists
2. if no Playwright coverage exists, record that limitation and fall back to build verification

## Playwright Notes

1. Playwright is configured in `playwright.config.ts` with a preview server and browser matrix.
2. There is currently no verified `tests/` suite present in this repository snapshot.
3. Do not claim Playwright verification unless an actual test file exists and was run.

## Constraints

1. Prefer testing through props, routes, repositories, and commands rather than through internal Astro implementation details.
2. Do not add test-only exports or route hacks to reach private behavior.
3. Do not deep-import component internals for tests.
4. For presentation changes, do not overfit tests to incidental markup order unless it is part of the public contract.
5. For generated content workflows, verify the command path and resulting consumer behavior rather than only asserting intermediate file shapes.

## Stop And Ask If

1. verification requires modifying generated content but the source-of-truth path is unclear
2. a user-visible behavior needs browser coverage but no Playwright tests exist yet
3. the only possible proof would require test-only production seams

## Acceptance Check

1. The chosen verification matches the owning seam and change type.
2. The smallest trustworthy command set was selected.
3. Any missing automated coverage is named explicitly.
4. No test-only production seam was introduced.