# Library Management System - Core Components (JS)

## Project Overview

This project is a small Node.js implementation of the core components of a Library Management System. It focuses on clean low-level design rather than building a full application with a database or UI.

The system can:

- Add books
- Register members
- Search books by title, author, or ISBN
- Borrow books
- Return books
- Notify subscribers when key events happen
- Check overdue loans

The code uses ES modules and keeps the structure intentionally simple, KISS, and DRY.

## How to Run

From this project folder:

```bash
npm start
```

Expected output:

```text
Search results: [ 'Clean Code' ]
[notification] BOOK_BORROWED
Borrowed book due date: Mon May 18 2026
[notification] BOOK_RETURNED
Returned book status: AVAILABLE
```

The due date is calculated 14 days from the run date, so it may change if the demo is run on a different day.

## Project Structure

```text
src/
  app.js                  # demo that wires everything together
  models.js               # Book, Member, Loan
  factories.js            # creates valid Book and Member objects
  repository.js           # reusable in-memory repository
  searchStrategies.js     # title, author, and ISBN search strategies
  notificationService.js  # observer pattern implementation
  libraryService.js       # main LMS business logic
  utils.js                # shared ID, date, and validation helpers
```

## How It Works

### 1. Create reusable dependencies

`app.js` creates one reusable repository for each data type. These are injected into `LibraryService`.

```js
const library = new LibraryService({
  books: new InMemoryRepository(),
  members: new InMemoryRepository(),
  loans: new InMemoryRepository(),
  notifications: notificationService,
  strategies: searchStrategies,
});
```

This makes the service easy to test because storage, notifications, and search behavior are not hard-coded inside it.

### 2. Create books and members using factories

```js
const cleanCode = createBook({
  title: "Clean Code",
  author: "Robert C. Martin",
  isbn: "9780132350884",
});

const member = createMember({
  name: "Amina Diallo",
  email: "amina@example.com",
});
```

The factory functions validate input and generate IDs before creating objects.

Example result:

```js
{
  id: "book-1",
  title: "Clean Code",
  author: "Robert C. Martin",
  isbn: "9780132350884",
  status: "AVAILABLE"
}
```

## Example Flows

### Search Books

```js
const results = library.searchBooks("title", "clean");
console.log(results.map((book) => book.title));
```

Result:

```text
[ 'Clean Code' ]
```

The same method can search different fields because the search behavior is handled by strategies:

```js
library.searchBooks("title", "clean");
library.searchBooks("author", "martin");
library.searchBooks("isbn", "978013");
```

### Borrow a Book

```js
const loan = library.borrowBook(cleanCode.id, member.id);
console.log(loan.dueAt.toDateString());
```

What happens internally:

- The book is found.
- The member is found.
- The system checks that the book is not already borrowed.
- The book status changes to `BORROWED`.
- The member receives the book ID in `borrowedBookIds`.
- A loan is created.
- Observers receive a `BOOK_BORROWED` event.

Example output:

```text
[notification] BOOK_BORROWED
Borrowed book due date: Mon May 18 2026
```

### Return a Book

```js
library.returnBook(loan.id);
console.log(cleanCode.status);
```

What happens internally:

- The active loan is found.
- The related book and member are found.
- The book status changes back to `AVAILABLE`.
- The book ID is removed from the member's borrowed list.
- The loan is closed.
- Observers receive a `BOOK_RETURNED` event.

Result:

```text
[notification] BOOK_RETURNED
AVAILABLE
```

## Design Requirements Mapping

| Requirement | Implementation |
|-------------|----------------|
| ES modules | `package.json` has `"type": "module"` and files use `import/export`. |
| Factory pattern | `factories.js` has `createBook()` and `createMember()`. |
| Strategy pattern | `searchStrategies.js` provides reusable `search()` strategies. |
| Observer pattern | `notificationService.js` lets subscribers listen to LMS events. |
| Reusable utilities | `utils.js` contains ID generation, date helpers, and validators. |
| Interface-like abstractions | Repositories follow `add/findById/findAll`; strategies follow `search(items, query)`; observers are event callbacks. |
| Dependency injection | `LibraryService` receives repositories, strategies, and notification service through its constructor. |

## KISS / DRY Notes

- One `InMemoryRepository` is reused for books, members, and loans.
- One search strategy creator supports title, author, and ISBN searches.
- Models are grouped in one file because the project is small.
- Factories are simple functions instead of unnecessary classes.
- Observer subscribers are plain callbacks.
- No external dependencies are required.
