# Todo State Manager App

This project is a simple React to-do list application built for the state management checkpoint.

## Features

- Add tasks with a name and description
- Validate both fields before saving
- Edit an existing task with a pre-filled form
- Mark tasks as completed
- Delete tasks with a confirmation prompt
- Persist tasks in `localStorage`
- Use small reusable components for the form, list, and task item

## Main Components

- `TaskForm`
- `TaskList`
- `TaskItem`

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Run the test suite:

```bash
npm test
```

## Notes

- The styling follows the warm neutral Tailwind direction from the `react-hooks-checkpoint` reference project.
- Task data is saved in browser storage and will still be available after refreshing the page.
