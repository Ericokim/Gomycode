import { createBook, createMember } from "./factories.js";
import { LibraryService } from "./libraryService.js";
import { NotificationService } from "./notificationService.js";
import { InMemoryRepository } from "./repository.js";
import { searchStrategies } from "./searchStrategies.js";

const notificationService = new NotificationService();

notificationService.subscribe((event) => console.log(`[notification] ${event.type}`));

const library = new LibraryService({
  books: new InMemoryRepository(),
  members: new InMemoryRepository(),
  loans: new InMemoryRepository(),
  notifications: notificationService,
  strategies: searchStrategies,
});

const cleanCode = createBook({
  title: "Clean Code",
  author: "Robert C. Martin",
  isbn: "9780132350884",
});

const pragmaticProgrammer = createBook({
  title: "The Pragmatic Programmer",
  author: "Andrew Hunt",
  isbn: "9780201616224",
});

const member = createMember({
  name: "Amina Diallo",
  email: "amina@example.com",
});

library.addBook(cleanCode);
library.addBook(pragmaticProgrammer);
library.registerMember(member);

const searchResults = library.searchBooks("title", "clean");
console.log("Search results:", searchResults.map((book) => book.title));

const loan = library.borrowBook(cleanCode.id, member.id);
console.log("Borrowed book due date:", loan.dueAt.toDateString());

library.returnBook(loan.id);
console.log("Returned book status:", cleanCode.status);
