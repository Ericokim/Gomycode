import { addDays } from "./utils.js";

export const BookStatus = Object.freeze({
  AVAILABLE: "AVAILABLE",
  BORROWED: "BORROWED",
});

export class Book {
  constructor({ id, title, author, isbn }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.status = BookStatus.AVAILABLE;
  }

  isAvailable() {
    return this.status === BookStatus.AVAILABLE;
  }

  borrow() {
    if (!this.isAvailable()) throw new Error(`Book "${this.title}" is not available`);
    this.status = BookStatus.BORROWED;
  }

  returnBook() {
    this.status = BookStatus.AVAILABLE;
  }
}

export class Member {
  constructor({ id, name, email, borrowLimit = 3 }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.borrowLimit = borrowLimit;
    this.borrowedBookIds = [];
  }

  canBorrow() {
    return this.borrowedBookIds.length < this.borrowLimit;
  }

  borrowBook(bookId) {
    if (!this.canBorrow()) throw new Error(`${this.name} reached the borrow limit`);
    this.borrowedBookIds.push(bookId);
  }

  returnBook(bookId) {
    this.borrowedBookIds = this.borrowedBookIds.filter((id) => id !== bookId);
  }
}

export class Loan {
  constructor({ id, bookId, memberId, loanDays = 14 }) {
    this.id = id;
    this.bookId = bookId;
    this.memberId = memberId;
    this.issuedAt = new Date();
    this.dueAt = addDays(this.issuedAt, loanDays);
    this.returnedAt = null;
  }

  isActive() {
    return this.returnedAt === null;
  }

  isOverdue(today = new Date()) {
    return this.isActive() && today > this.dueAt;
  }

  close(today = new Date()) {
    this.returnedAt = today;
  }
}
