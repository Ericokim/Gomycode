# QA Report

## What Was Tested

The Student Task Tracker was tested with Vitest and React Testing Library. The tests focus on user behavior instead of implementation details.

## Unit Tests Written

- App renders with the main heading and empty state.
- A user can add a new study task.
- A user can mark a task as completed.
- A user can delete a task.
- Filter buttons show All, Active, and Completed tasks correctly.
- Summary counts update for total, active, and completed tasks.

## Linter Checks

ESLint checks:

- Common JavaScript mistakes.
- React JSX usage.
- React Hooks rules.
- Unused variables.
- Consistent code structure.

Run linting with:

```bash
npm run lint
```

## Common Issues Students May Face

- Forgetting to run `npm install`.
- Forgetting to save files before testing.
- Writing tests that search for the wrong text.
- Not pulling the latest `main` before starting work.
- Merge conflicts when two students edit the same file.

## Code Review Summary

Peer reviews should confirm that:

- The app still works in the browser.
- New code is readable.
- Tests were added or updated.
- CI passes before merging.
- The pull request explains the change clearly.

## Pull Request Review Checklist

- [ ] The change is small and focused.
- [ ] The code is easy to understand.
- [ ] `npm run lint` passes.
- [ ] `npm test` passes.
- [ ] `npm run build` passes.
- [ ] The UI was checked manually.
- [ ] Feedback was polite and specific.
