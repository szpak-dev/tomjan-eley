# Task Bootstrap Rules

Document Class: leaf

## Purpose

Use this file to start non-trivial work in this repository the same way every time.

## Applies When

Read this file before planning, refactoring, direct implementation, or verification design when the task is more than a narrow single-file edit.

## Scope

This file standardizes the first pass over a task.
It determines the work type, the owning seam, the complexity level, the expected verification, and the next rule set.

## Non-Trivial Task Check

Treat the task as non-trivial if any of the following are true:

1. it touches more than one repository seam
2. it changes routing, page composition, or route-level data flow
3. it changes content ingestion, dictionary generation, or translation synchronization
4. it changes ownership or structure rather than only behavior inside an existing file shape
5. it needs phased work, explicit acceptance criteria, or reviewable task steps
6. the owning seam is not obvious at first glance

If none of these are true, move directly to [IMPLEMENTATION.md](IMPLEMENTATION.md).

## Required Bootstrap Output

Before implementation, name these items explicitly:

1. objective
2. primary work type
3. owning seam
4. touched supporting seams
5. whether the task is direct implementation, planning work, refactoring work, or verification work
6. minimum verification command set
7. stop-and-ask conditions already visible

## Work Types

Choose exactly one primary work type:

1. content ingestion
2. content access
3. presentation
4. integration helper
5. verification design
6. structural refactor

## Owning Seams

Choose one primary owning seam:

1. `src/pages`
2. `src/layouts`
3. `src/components`
4. `src/content`
5. `src/i18n`
6. `src/libs`
7. `src/content.loader.ts`
8. `src/content.dictionaries.ts`
9. `src/content.translations.ts`

If you cannot name one primary owner, the task is not ready for direct implementation.

## Next Rule Selection

Choose the next document by first match:

1. If the task needs approval, phases, or explicit cross-seam planning, go to [../planning/PLANNING.md](../planning/PLANNING.md).
2. If the task changes ownership, boundaries, or the current structure is the problem, go to [../refactoring/REFACTORING.md](../refactoring/REFACTORING.md).
3. If the task is ready to implement and ownership is clear, go to [IMPLEMENTATION.md](IMPLEMENTATION.md).
4. If the main unresolved question is how to verify Astro rendering, content workflows, or available commands in this repository, go to [TESTING.md](TESTING.md).
5. If the main unresolved question is generic public-seam test strategy, go to [../tests/TESTS.md](../tests/TESTS.md).

## Constraints

1. Do not jump into file edits before naming the primary work type and primary owning seam.
2. Do not treat generated content under `src/content/**` as the source of truth when the real source is scraped data or transformation scripts.
3. Do not escalate a narrow presentation change into a refactor or plan unless ownership is genuinely unclear.
4. Do not skip planning when the task will predictably require multiple ordered steps across seams.

## Acceptance Check

1. The task is classified.
2. One primary owning seam is named.
3. The minimum verification path is named.
4. One next rule document has been selected deliberately.