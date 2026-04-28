# Smart Library Management System — Project Plan

## Overview

A browser-based Library Management System built with Vite + TypeScript.
Demonstrates OOD principles: modular design, inheritance, encapsulation, and three design patterns.

## Tech Stack

- Vite + TypeScript (vanilla, no UI framework)
- HTML/CSS for the browser UI

## Project Structure

```
smart-library/
├── index.html
├── src/
│   ├── main.ts              ← UI wiring and DOM interactions
│   ├── style.css            ← Styling
│   ├── models/
│   │   ├── user.ts          ← Abstract User, Student, Teacher (inheritance)
│   │   ├── book.ts          ← Book class
│   │   └── transaction.ts   ← BorrowTransaction class
│   └── patterns/
│       ├── factory.ts       ← UserFactory (Factory Pattern)
│       ├── singleton.ts     ← LibrarySystem (Singleton Pattern)
│       └── observer.ts      ← Observer interface + NotificationService (Observer Pattern)
```

## Design Patterns Applied

| Pattern   | Where              | Purpose                                               |
|-----------|--------------------|-------------------------------------------------------|
| Factory   | `factory.ts`       | Creates Student or Teacher objects via UserFactory    |
| Singleton | `singleton.ts`     | Ensures one central LibrarySystem instance            |
| Observer  | `observer.ts`      | Notifies registered users when books are overdue      |

## Todo Items

- [x] Scaffold Vite + TypeScript project
- [x] Implement `models/user.ts` — abstract User, Student, Teacher
- [x] Implement `models/book.ts` — Book class
- [x] Implement `models/transaction.ts` — BorrowTransaction class
- [x] Implement `patterns/factory.ts` — UserFactory (Factory Pattern)
- [x] Implement `patterns/singleton.ts` — LibrarySystem Singleton
- [x] Implement `patterns/observer.ts` — Observer interface + NotificationService
- [x] Build `index.html` — UI structure (forms + tables)
- [x] Implement `src/main.ts` — wire all UI interactions to the library system
- [x] Style `src/style.css` — clean, readable UI
- [x] Verify all features work in browser

## Features

1. Add User (Student or Teacher) via UserFactory
2. Add Book to the library
3. Borrow a book (creates BorrowTransaction, marks book unavailable)
4. Return a book (marks transaction complete, book available again)
5. View all active loans
6. Check overdue books — triggers Observer notifications

---

## Review

### What Was Built

A fully functional Smart Library Management System running in the browser, built with Vite and TypeScript. The project is organized into two subsystems: `models/` for the core domain classes and `patterns/` for the three design pattern implementations.

### Design Patterns Implemented

- **Factory Pattern** (`patterns/factory.ts`): `UserFactory.create(type, name, email)` is the single entry point for creating users. It returns a `Student` or `Teacher` instance without the caller needing to know the concrete class.
- **Singleton Pattern** (`patterns/singleton.ts`): `LibrarySystem.getInstance()` ensures there is exactly one central library in the entire application. All borrow, return, and user/book management operations go through this single instance.
- **Observer Pattern** (`patterns/observer.ts`): `NotificationService` maintains a list of registered `Observer` objects. When `checkOverdue()` is called, the library notifies all observers with a message. The UI registers a `UIObserver` that appends each notification to the page.

### OOD Principles Applied

- **Abstraction**: `User` is an abstract class with an abstract `getRole()` method — it cannot be instantiated directly.
- **Inheritance**: `Student` and `Teacher` extend `User` and provide their own `getRole()` and `borrowLimit` values.
- **Encapsulation**: Internal IDs are auto-incremented via private static counters; `LibrarySystem`'s constructor is `private` to enforce the Singleton.
- **Modular design**: Each subsystem (users, books, transactions, patterns) lives in its own file with a clear single responsibility.

### Key Decisions

- Used Vite + TypeScript (vanilla, no React) to keep OOD classes front and center — no framework noise.
- Seeded sample data (Alice + Dr. Bob + 3 books) on load so evaluators can interact immediately without setup.
- Borrow limit enforced per role: Students can borrow 3 books, Teachers 5.
- Due date defaults to 14 days from borrow date; `isOverdue()` is a method on `BorrowTransaction`.
