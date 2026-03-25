# Project-Specific Rules

Document Class: navigational

## Purpose

Use this file to bootstrap work inside this repository before choosing planning, refactoring, testing, or direct implementation guidance.

## Use This When

1. Use this file when the task is inside this Astro repository and needs project-specific routing.
2. Start here for every non-trivial task.
3. Use this file to choose the next project-specific document or the next generic rule set.

## Available Options

| Document | Information You Can Obtain |
| --- | --- |
| [TASK_BOOTSTRAP.md](TASK_BOOTSTRAP.md) | the required bootstrap checklist for classifying non-trivial tasks, naming owning seams, and selecting the next rule set |
| [IMPLEMENTATION.md](IMPLEMENTATION.md) | the repository-specific implementation, placement, sequencing, and verification rules once the task path is clear |
| [TESTING.md](TESTING.md) | the repository-specific verification strategy for Astro pages, content workflows, builds, and Playwright coverage |
| [../planning/PLANNING.md](../planning/PLANNING.md) | the planning path when the bootstrap shows the work needs an approved big-picture plan first |
| [../refactoring/REFACTORING.md](../refactoring/REFACTORING.md) | the refactoring path when ownership or structure changes substantially |
| [../tests/TESTS.md](../tests/TESTS.md) | the test strategy path when the main task is defining or tightening verification |

## Navigation Rule

1. For non-trivial tasks, read [TASK_BOOTSTRAP.md](TASK_BOOTSTRAP.md) first.
2. Move to [IMPLEMENTATION.md](IMPLEMENTATION.md) only after the bootstrap makes ownership and execution shape clear.
3. Move to [TESTING.md](TESTING.md) when the bootstrap says the main unresolved question is repository-specific verification.
4. Move to [../planning/PLANNING.md](../planning/PLANNING.md) when the bootstrap says the change is phased, cross-seam, or approval-sensitive.
5. Move to [../refactoring/REFACTORING.md](../refactoring/REFACTORING.md) when the bootstrap says ownership or structure needs reshaping.
6. Move to [../tests/TESTS.md](../tests/TESTS.md) when the main unresolved question is generic public-seam testing strategy rather than repo-specific verification.

## Local Context

This repository is a content-driven Astro site.
Its stable seams are pages, layouts, components, content repositories, i18n utilities, and integration helpers.
The goal of this project-specific branch is deterministic task handling, not forcing a backend-style layered architecture onto `src`.

## Exit Condition

1. The task has been bootstrapped or routed deliberately.
2. The next read is exactly one linked document from this file.