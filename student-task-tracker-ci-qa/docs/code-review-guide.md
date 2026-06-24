# Code Review Guide

Code review helps students improve code quality and learn from each other. The goal is to be helpful, specific, and respectful.

## How to Review a Pull Request

1. Read the pull request summary.
2. Check the changed files.
3. Run the app if the change affects behavior.
4. Look for clear names, simple logic, and useful tests.
5. Leave comments that explain the reason for your suggestion.
6. Approve only when the change is clear and CI passes.

## Good Feedback Examples

- "This function works, but the name could be clearer. What do you think about `filterTasks`?"
- "Can we add a test for deleting a completed task?"
- "The UI looks good. I noticed the empty state disappears correctly after adding a task."
- "This branch is missing the latest changes from `main`. Please pull and resolve the conflict first."

## Feedback to Avoid

- "This is bad."
- "Wrong."
- "I do not like it."

Better feedback explains what can improve and why.

## Review Checklist

- [ ] The change solves the stated problem.
- [ ] The code is simple enough for another student to read.
- [ ] Tests cover the main behavior.
- [ ] Linting and tests pass.
- [ ] The pull request includes screenshots if the UI changed.
