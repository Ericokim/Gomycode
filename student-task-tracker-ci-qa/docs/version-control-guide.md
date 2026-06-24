# Version Control Guide

This guide shows how students can use Git and GitHub with the Student Task Tracker project.

## Initialize a Repository

```bash
git init
git add .
git commit -m "Initial Student Task Tracker project"
```

## Connect to GitHub and Push

Create a new GitHub repository, then connect it:

```bash
git remote add origin https://github.com/YOUR-USERNAME/student-task-tracker-ci-qa.git
git branch -M main
git push -u origin main
```

## Stage and Commit Changes

```bash
git status
git add src/App.jsx
git commit -m "Add task filtering"
```

## Create a Feature Branch

Branches let students work on features without changing `main` directly.

```bash
git checkout -b feature/task-filters
```

Suggested branches:

- `feature/add-task`
- `feature/task-filters`
- `qa/add-tests`
- `docs/update-readme`

## Push a Branch

```bash
git push -u origin feature/task-filters
```

Open a pull request on GitHub after pushing the branch.

## Pull Changes from a Shared Repository

```bash
git checkout main
git pull origin main
```

## Merge a Branch Locally

```bash
git checkout main
git pull origin main
git merge feature/task-filters
git push origin main
```

## Resolve a Simple Merge Conflict

If two students edit the same line, Git may show a conflict:

```text
<<<<<<< HEAD
Student Task Tracker
=======
Study Task Tracker
>>>>>>> feature/update-title
```

Choose the final version, remove the conflict markers, then commit:

```bash
git add src/App.jsx
git commit -m "Resolve title conflict"
```

## Collaboration Flow

1. Pull the latest `main`.
2. Create a feature branch.
3. Make a small change.
4. Run `npm run lint`, `npm test`, and `npm run build`.
5. Commit and push.
6. Open a pull request.
7. Ask a peer to review.
8. Merge after CI passes.
