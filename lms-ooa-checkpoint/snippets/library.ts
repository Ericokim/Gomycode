import { Book, Catalog } from "./book";
import { Member } from "./member";

export enum TransactionStatus {
  Active = "Active",
  Completed = "Completed",
  Overdue = "Overdue",
}

export class BorrowTransaction {
  id: string;
  bookId: string;
  memberId: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate: Date | null = null;
  status: TransactionStatus = TransactionStatus.Active;

  constructor(id: string, bookId: string, memberId: string) {
    this.id = id;
    this.bookId = bookId;
    this.memberId = memberId;
    this.borrowDate = new Date();
    this.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
  }

  isOverdue(): boolean {
    return this.status === TransactionStatus.Active && new Date() > this.dueDate;
  }

  complete(returnDate: Date = new Date()): void {
    this.returnDate = returnDate;
    this.status = TransactionStatus.Completed;
  }
}

export class Library {
  private static instance: Library;
  private catalog: Catalog = new Catalog();
  private members: Member[] = [];
  private transactions: BorrowTransaction[] = [];

  private constructor() {}

  static getInstance(): Library {
    if (!Library.instance) Library.instance = new Library();
    return Library.instance;
  }

  addMember(member: Member): void {
    this.members.push(member);
  }

  addBook(book: Book): void {
    this.catalog.addBook(book);
  }

  issueBook(bookId: string, memberId: string): BorrowTransaction {
    const book = this.catalog.findById(bookId);
    if (!book) throw new Error("Book not found");
    if (!book.isAvailable()) throw new Error("Book is not available");

    const member = this.members.find((m) => m.id === memberId);
    if (!member) throw new Error("Member not found");
    if (!member.canBorrow()) throw new Error("Member has reached borrow limit");

    const txn = new BorrowTransaction(
      `txn-${Date.now()}`,
      bookId,
      memberId
    );
    book.markIssued();
    member.borrowedBooks.push(bookId);
    this.transactions.push(txn);
    return txn;
  }

  processReturn(transactionId: string): void {
    const txn = this.transactions.find((t) => t.id === transactionId);
    if (!txn) throw new Error("Transaction not found");

    const book = this.catalog.findById(txn.bookId);
    book?.markReturned();

    const member = this.members.find((m) => m.id === txn.memberId);
    if (member) {
      member.borrowedBooks = member.borrowedBooks.filter((id) => id !== txn.bookId);
    }

    txn.complete();
  }

  getActiveTransactions(): BorrowTransaction[] {
    return this.transactions.filter((t) => t.status === TransactionStatus.Active);
  }

  checkOverdue(): BorrowTransaction[] {
    return this.transactions.filter((t) => t.isOverdue());
  }
}
