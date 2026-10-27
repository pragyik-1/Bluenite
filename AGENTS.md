# agents.md

## Purpose & Scope

This document is the canonical contract for every AI coding agent and human contributor. All changes made to this repository must strictly comply with every rule defined below.

## Core Principles

### 1. ROBUSTNESS
- **First-run:** Code must work on the first run in the target environment.
- **No silent failures:** All errors must be handled explicitly, surfaced, or propagated with actionable context. No errors may be swallowed.
- **Input validation:** All external inputs (user input, network, filesystem, env vars, APIs) must be validated at the boundary.
- **Clean merges:** No dead code, no commented-out blocks, and no TODO placeholders may be committed to merged code.

### 2. FUTURE-PROOFING
- **Non-blocking:** Any feature or architectural decision must not harm, block, or complicate anything that could come after it.
- **Additive over destructive:** Prefer additive change over destructive change. New behavior must extend existing behavior without rewriting it unless specified otherwise.
- **No shortcuts or premature abstraction:** No hard-coded shortcuts that will need to be torn out later. No premature abstraction.
- **Contract stability:** Public interfaces (APIs, function signatures, schemas, events) are contracts. Changes to them must be backward-compatible or explicitly versioned and migrated.

### 3. SCALABILITY & MODULARITY
- **Separation of concerns:** Concerns must be separated into modules with clear, minimal interfaces.
- **Testability:** Each module must be independently testable.
- **Explicit dependencies:** No hidden global state. Dependencies must be passed in explicitly.
- **Composition over inheritance:** Prefer composition over inheritance.
- **Scale by design:** Code must scale in three directions: more data, more users, more contributors. If a design only works at small scale, it is rejected.

### 4. SIMPLICITY FIRST
- **Minimal solution:** Always choose the simplest, most minimal solution that fully solves the problem AND complies with principles 1-3.
- **No speculation:** Reject speculative generality. Do not build for hypothetical requirements.
- **Justify every line:** Every line of code must justify its existence. Delete anything that does not.
- **Dependency discipline:** Prefer the standard library and existing project utilities over new dependencies. Adding a dependency requires written justification.

### 5. AGENT BEHAVIOR RULES
- **Read first:** Agents must read this file before making any change.
- **No invented requirements:** Agents must not invent requirements. If the task is ambiguous, stop and ask.
- **Verify before completion:** Agents must run the project's tests and linters before declaring a task complete.
- **Strict scope:** Agents must not modify files outside the scope of the task.
- **Edit over create:** Agents must prefer editing existing code over creating new files.
- **Resumable state:** Agents must leave the codebase in a state that the next agent can pick up without context loss.
- **Question over assumption:** Agents must always ask questions when needing to make a decision or upon confusion rather than assuming.

## Code Standards

- **Naming:** Use explicit, unambiguous names that follow the existing project conventions exactly.
- **Structure:** Keep files and functions focused to a single responsibility. Follow the existing structure of the codebase.
- **Error Handling:** Handle errors at the correct level. Never swallow exceptions. Propagate errors with explicit, actionable context.
- **Logging:** Only log necessary, non-sensitive information. Use the project's designated logging utility if one exists.
- **Testing:** Add or update tests for any changed behavior. All tests must be deterministic and runnable in isolation.

## Architecture Rules

- **Module Boundaries:** Respect all existing module boundaries. Do not create circular dependencies.
- **Dependency Direction:** Enforce unidirectional dependencies in alignment with the existing architecture. All dependencies must be passed in explicitly.
- **Interface Stability:** Treat all public interfaces as immutable contracts. Any breaking change must be backward-compatible or explicitly versioned and migrated with no ambiguity.

## Definition of Done

Before declaring any task complete, you must satisfy the following checklist:

- [ ] **Read:** This file was read prior to making changes.
- [ ] **Scope:** Only files explicitly in scope were modified.
- [ ] **Validation:** All external inputs have been validated at their boundaries.
- [ ] **Clean Code:** No dead code, commented-out blocks, or TODO placeholders were added.
- [ ] **Dependencies:** No unjustified dependencies were added. If added, written justification is present.
- [ ] **Verification:** The project's tests and linters have been run and are passing.
- [ ] **Compliance:** The solution is minimal, additive where possible, and fully complies with all principles within this document.
- [ ] **Resumable:** The codebase has been left in a clean state with no context loss for the next agent.

## Prohibited Practices

You must never do any of the following:

- **Failures:** Swallow exceptions, allow silent failures, or omit error context.
- **State:** Use hidden global state or rely on implicit, ambient dependencies.
- **Clutter:** Commit dead code, commented-out code, or TODO, FIXME, or XXX placeholders.
- **Scope:** Invent requirements, commit scope creep, or modify files outside of task scope.
- **Dependencies:** Add dependencies without written justification.
- **Contracts:** Make unversioned, breaking changes to public interfaces.
- **Speculation:** Build for hypothetical requirements or introduce premature abstractions.
- **Destruction:** Rework large sections of code when an additive change is possible to achieve the required result.
- **Context Loss:** Leave unfinished work, unclear states, or unexplained changes that prevent the next agent from resuming without external context.
