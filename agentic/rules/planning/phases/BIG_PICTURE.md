# High-Level Planning Rules

Document Class: leaf

## Purpose

Use this file to define the high-level plan before any executable step files exist.

## Applies When

The first planning response is the big-picture plan. Do not create step files until that plan is accepted.

## Scope

Keep the high-level plan at the boundary and contract level before file-level execution planning begins.
Plan in terms of repository seams, content flows, and verification commands that actually exist in this Astro project.

## Core Rules

### Required Content

Keep the high-level plan at the boundary and contract level.

Include:

1. objective
2. scope
3. repository slice, user-visible capability, or content workflow being changed
4. extracted concepts for the change such as routes, layouts, components, repositories, dictionaries, or helper contracts
5. identity, invariants, and lifecycle expectations for each material concept when they matter
6. primary owning seam, public boundary, and public seam
7. affected repository seams and the owning part of each touched responsibility
8. explicit seam placement for each material concept and why it belongs there
9. orchestration required across content access, rendering, or generation steps
10. external-service or helper responsibilities required to integrate, transform, or generate data
11. presentation responsibilities required to collect route input or present output without absorbing repository logic
12. intended dependency direction across touched seams
13. assumptions
14. major phases or steps
15. expected inputs and outputs for each phase
16. acceptance criteria
17. known risks or open questions

### Strategic Modeling

Before locking the plan:

1. name the repository slice or workflow being changed
2. extract the candidate concepts implied by the request and current behavior
3. classify each concept as a route entrypoint, layout composition unit, component, content repository, translation primitive, integration helper, generation script, or verification seam
4. state the identity, invariants when relevant, lifecycle, and owning seam for each material concept
5. stop and tighten the model if a concept cannot be classified or placed deterministically

## Constraints

### Placement Rule

Do not leave placement implicit. If a touched responsibility cannot be placed clearly in the governing repository seam model, the plan is not ready.

### Handoff To Step Planning

After the high-level plan is accepted:

1. split the approved plan into executable step files named `PLAN_STEP_0X.md`
2. place every `PLAN_STEP_0X.md` file at the same directory level as the owning `PLAN.md`
3. do not create nested planning subdirectories for step files
4. keep the step sequence aligned with the approved phase order
5. move file-level implementation detail, target file naming, and step verification into the step files rather than overloading the big-picture plan

## Acceptance Check

1. The high-level plan stays at the boundary and contract level.
2. Material concepts are classified and placed deterministically.
3. Step files are not created before the high-level plan is accepted.
4. The plan names assumptions, phases, acceptance criteria, open questions, and verification commands explicitly.