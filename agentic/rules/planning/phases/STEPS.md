# Step Planning Rules

Document Class: leaf

## Purpose

Use this file to define executable step contracts after a high-level plan is accepted.

## Applies When

Use this file after a high-level plan is accepted and the work is being split into executable steps.

## Scope

Executable step files must be named `PLAN_STEP_0X.md` in the order they are intended to run.
Executable step files must live at the same directory level as their owning `PLAN.md`.
Do not place step files in nested planning subdirectories.
Steps should be organized around one primary owning repository seam at a time.

## Core Rules

1. Preserve approved inputs, outputs, and acceptance criteria.
2. Make each step narrow, end to end, verifiable, and owned by exactly one primary seam.
3. Name owner, enclosure, public boundary, public seam, scope, and out-of-scope area explicitly.
4. State the allowed dependency direction for the touched parts explicitly.
5. State which repository concepts are created, changed, moved, or intentionally left unchanged.
6. If introducing or changing repository access, name the owner of the access contract and the owner of the consuming seam separately.
7. Do not mix unfinished work from multiple primary seams inside one step.
8. Each step file must show the target files tree for that step clearly enough that the intended file names and owned responsibilities are visible before implementation starts.
9. After completing a step, check the code against both the approved high-level plan and the active step file, then update the step file if the verified implementation differs in a still-approved way.
10. After the last step, run one final alignment check across the code, the high-level plan, and the full step set.

### Sequencing Model

Choose the sequence that matches the task type from bootstrap.

Default orders:

1. Content ingestion: input contract -> generation script -> generated content shape -> repository access -> UI consumer
2. Content access: repository contract -> repository implementation -> layout or page consumer -> component consumer
3. Presentation: supporting content or helper contract if needed -> component -> layout -> page -> style adjustment
4. Integration helper: helper contract -> helper implementation -> consuming layout or component

If a higher-level seam reveals a missing lower-level concept, amend the plan and return to the owning seam instead of patching around the gap.

## Constraints

### Required Sections

Each step file must include:

1. `Goal`
2. `Inputs`
3. `Outputs`
4. `Scope`
5. `Out of Scope`
6. `Constraints`
7. `Concept Impact`
8. `Owning Seam`
9. `Seam Ownership`
10. `Dependency Direction`
11. `Execution Order`
12. `Allowed Adaptations`
13. `Stop And Ask If`
14. `Implementation Notes`
15. `Detailed Implementation Tree`
16. `Decision Log`
17. `Verification`
18. `Completion Criteria`
19. `Handoff Notes`
20. `Files Tree`

`Files Tree` must be the final section.

`Files Tree` is the target files tree for the step. It must show the planned file names and owning responsibilities so the intended implementation shape is reviewable before coding.

### Step Lifecycle

For each approved step:

1. implement the step through the owning seam
2. verify the code against the active step file
3. verify the code still aligns with the approved high-level plan
4. update the step file if the verified implementation changed in a way that remains within approved scope

After the final step:

1. run a final alignment check across the codebase, the approved high-level plan, and all `PLAN_STEP_0X.md` files
2. resolve any drift or record the approved final state in the relevant plan files

## If Ambiguous, Go To

### Layer Routing

When a step needs repository-specific ownership or verification detail, read [../../project-specific/IMPLEMENTATION.md](../../project-specific/IMPLEMENTATION.md) or [../../project-specific/TESTING.md](../../project-specific/TESTING.md) first.

Use `rules/feature/module/layers/` only if the work is explicitly being treated as a true layered re-architecture.

## Acceptance Check

1. Each step is narrow, end to end, verifiable, and owned by exactly one primary seam.
2. Each step file contains the required sections, with `Files Tree` last.
3. The implementation order respects the approved plan and seam ownership.
4. Step execution includes verification against both the active step file and the approved high-level plan.