# Express Routing Checkpoint

This project is a small Express web application for the routing checkpoint. It includes three pages:

- Home
- Our Services
- Contact us

Each page uses the same navigation bar and is protected by a custom middleware that only allows access during working hours: Monday to Friday, from 9:00 to 17:00.

## Project Files

| File | Purpose |
| --- | --- |
| `server.js` | Creates the Express server, middleware, and routes. |
| `public/styles.css` | Adds pure CSS styling for the pages and navbar. |
| `package.json` | Defines the project scripts and Express dependency. |
| `.gitignore` | Keeps installed dependencies out of the project submission. |
| `projectplan.md` | Tracks the checkpoint implementation plan. |

## Install

```bash
npm install
```

## Run

```bash
npm start
```

Open this URL in your browser:

```text
http://localhost:3000
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/services` | Our Services |
| `/contact` | Contact us |

Outside working hours, the app returns a closed message instead of the page content.
