# Student Task Tracker: Git, CI, and QA Practice

## Assignment Objective

This project introduces high school students to version control, continuous integration, and quality assurance through a small React web application.

## Project Overview

Student Task Tracker helps students manage study tasks while practicing real software team workflows. The project demonstrates Git branching, pull requests, automated CI checks, unit testing, linting, and peer review.

## Features

- Add study tasks.
- Mark tasks as completed or active.
- Delete tasks.
- Filter tasks by All, Active, and Completed.
- View total, active, and completed task counts.
- Save tasks in `localStorage`.
- Show an empty state when no tasks match the current filter.

## Tech Stack

- Vite
- React
- JavaScript
- CSS
- Vitest
- React Testing Library
- ESLint
- GitHub Actions

## Run Locally

```bash
npm install
npm run dev
```

## Run Quality Checks

```bash
npm run lint
npm test
npm run build
```

## Continuous Integration

GitHub Actions runs on every push and pull request. The pipeline:

1. Checks out the repository.
2. Sets up Node.js.
3. Installs dependencies with `npm ci`.
4. Runs `npm run lint`.
5. Runs `npm test`.
6. Runs `npm run build`.

Workflow file: [.github/workflows/ci.yml](./.github/workflows/ci.yml)

## Git Workflow

Suggested branches:

- `feature/add-task`
- `feature/task-filters`
- `qa/add-tests`
- `docs/update-readme`

Recommended workflow:

```bash
git checkout -b feature/add-task
git add .
git commit -m "Add task creation"
git push -u origin feature/add-task
```

Open a pull request, wait for CI, request review, then merge.

Full guide: [docs/version-control-guide.md](./docs/version-control-guide.md)

## QA Practices

- Unit tests cover rendering, adding, completing, deleting, filtering, and summary counts.
- ESLint checks code style and common JavaScript/React issues.
- Pull requests use a review checklist.
- Peer review feedback is documented in the code review guide.

QA report: [docs/qa-report.md](./docs/qa-report.md)

## Folder Structure

```text
student-task-tracker-ci-qa/
  .github/
    pull_request_template.md
    workflows/ci.yml
  docs/
    code-review-guide.md
    qa-report.md
    reflection-report.md
    submission-checklist.md
    version-control-guide.md
  src/
    App.jsx
    App.test.jsx
    main.jsx
    setupTests.js
    styles.css
  projectplan.md
```

## Submission Checklist

- Version control guide completed.
- CI pipeline configured.
- QA report completed.
- Reflection report completed.
- Tests passing.
- Linting passing.
- Build passing.

Full checklist: [docs/submission-checklist.md](./docs/submission-checklist.md)

## Reflection Report

Reflection report: [docs/reflection-report.md](./docs/reflection-report.md)

## GitHub Link

Submit repository link here:

```text
https://github.com/YOUR-USERNAME/student-task-tracker-ci-qa
```
