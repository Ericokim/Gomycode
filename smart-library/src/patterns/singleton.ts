import { User } from "../models/user";
import { Book } from "../models/book";
import { BorrowTransaction } from "../models/transaction";
import { NotificationService } from "./observer";
import type { Observer } from "./observer";

export class LibrarySystem {
  private static instance: LibrarySystem;

  private users: User[] = [];
  private books: Book[] = [];
  private transactions: BorrowTransaction[] = [];
  public notifications = new NotificationService();

  private constructor() {}

  static getInstance(): LibrarySystem {
    if (!LibrarySystem.instance) {
      LibrarySystem.instance = new LibrarySystem();
    }
    return LibrarySystem.instance;
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  addBook(book: Book): void {
    this.books.push(book);
  }

  borrowBook(userId: number, bookId: number): string {
    const user = this.users.find(u => u.id === userId);
    const book = this.books.find(b => b.id === bookId);

    if (!user) return "User not found.";
    if (!book) return "Book not found.";
    if (!book.isAvailable) return `"${book.title}" is already borrowed.`;

    const activeBorrows = this.transactions.filter(
      t => t.userId === userId && !t.returned
    ).length;
    if (activeBorrows >= user.borrowLimit) {
      return `${user.name} has reached their borrow limit (${user.borrowLimit}).`;
    }

    book.isAvailable = false;
    this.transactions.push(new BorrowTransaction(userId, bookId));
    return `${user.name} borrowed "${book.title}".`;
  }

  returnBook(transactionId: number): string {
    const tx = this.transactions.find(t => t.id === transactionId);
    if (!tx) return "Transaction not found.";
    if (tx.returned) return "Book already returned.";

    const book = this.books.find(b => b.id === tx.bookId);
    if (book) book.isAvailable = true;
    tx.returned = true;
    return `Book returned successfully.`;
  }

  checkOverdue(): void {
    const overdue = this.transactions.filter(t => t.isOverdue());
    if (overdue.length === 0) {
      this.notifications.notify("No overdue books.");
      return;
    }
    overdue.forEach(tx => {
      const user = this.users.find(u => u.id === tx.userId);
      const book = this.books.find(b => b.id === tx.bookId);
      this.notifications.notify(
        `OVERDUE: ${user?.name} has not returned "${book?.title}" (due ${tx.dueDate.toLocaleDateString()}).`
      );
    });
  }

  registerObserver(observer: Observer): void {
    this.notifications.register(observer);
  }

  getUsers(): User[] { return this.users; }
  getBooks(): Book[] { return this.books; }
  getActiveTransactions(): BorrowTransaction[] {
    return this.transactions.filter(t => !t.returned);
  }
  getAllTransactions(): BorrowTransaction[] { return this.transactions; }
}
