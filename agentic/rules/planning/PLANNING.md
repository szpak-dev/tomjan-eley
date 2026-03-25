# Planning Rules

Document Class: navigational

## Purpose

Use this file to route planning work.

## Use This When

1. Use this file when the task is planning work.
2. Choose the child document that matches the current planning stage.

## Available Options

| Document | Information You Can Obtain |
| --- | --- |
| [phases/BIG_PICTURE.md](phases/BIG_PICTURE.md) | the high-level planning contract for scope, capabilities, placement, phases, risks, and acceptance criteria |
| [phases/STEPS.md](phases/STEPS.md) | the step-planning contract for sequencing, step sections, implementation trees, and completion criteria |

## Navigation Rule

1. Start with [phases/BIG_PICTURE.md](phases/BIG_PICTURE.md).
2. The first planning output is the big-picture plan only.
3. Move to [phases/STEPS.md](phases/STEPS.md) only after the high-level plan is accepted.
4. After approval, split the accepted plan into executable step files named `PLAN_STEP_0X.md`.
5. Keep every `PLAN_STEP_0X.md` file at the same directory level as its owning `PLAN.md`.
6. Do not place step files in nested planning subdirectories.
7. Follow project-specific implementation or testing guidance when the planning document indicates that repository seam ownership or verification detail is needed.

## Local Context

In this repository, planning should speak in terms of repository seams and workflows:

1. `src/pages`
2. `src/layouts`
3. `src/components`
4. `src/content`
5. `src/i18n`
6. `src/libs`
7. content generation scripts under `src/content*.ts`

Use work types and owning seams from [../project-specific/TASK_BOOTSTRAP.md](../project-specific/TASK_BOOTSTRAP.md) rather than inventing backend-style layers unless a true re-architecture is explicitly approved.

## Exit Condition

1. You have selected the planning document that matches the current planning stage.
2. The next read is either [phases/BIG_PICTURE.md](phases/BIG_PICTURE.md) or [phases/STEPS.md](phases/STEPS.md), depending on approval state.