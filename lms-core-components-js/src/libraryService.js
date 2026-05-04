import { Loan } from "./models.js";
import { generateId } from "./utils.js";

export class LibraryService {
  constructor({ books, members, loans, notifications, strategies }) {
    this.books = books;
    this.members = members;
    this.loans = loans;
    this.notifications = notifications;
    this.strategies = strategies;
  }

  addBook(book) {
    return this.books.add(book);
  }

  registerMember(member) {
    return this.members.add(member);
  }

  searchBooks(type, query) {
    const strategy = this.strategies[type];
    if (!strategy) throw new Error(`Unknown search type: ${type}`);
    return strategy.search(this.books.findAll(), query);
  }

  borrowBook(bookId, memberId) {
    const book = this.getRequired(this.books, bookId, "Book");
    const member = this.getRequired(this.members, memberId, "Member");

    if (this.findActiveLoanByBook(bookId)) throw new Error("Book already borrowed");

    book.borrow();
    member.borrowBook(bookId);

    const loan = this.loans.add(new Loan({ id: generateId("loan"), bookId, memberId }));
    this.notifications.notify({ type: "BOOK_BORROWED", book, member, loan });
    return loan;
  }

  returnBook(loanId) {
    const loan = this.getRequired(this.loans, loanId, "Loan");
    const book = this.getRequired(this.books, loan.bookId, "Book");
    const member = this.getRequired(this.members, loan.memberId, "Member");

    book.returnBook();
    member.returnBook(book.id);
    loan.close();

    this.notifications.notify({ type: "BOOK_RETURNED", book, member, loan });
    return loan;
  }

  checkOverdueLoans(today = new Date()) {
    const overdue = this.loans.findAll().filter((loan) => loan.isOverdue(today));
    overdue.forEach((loan) => this.notifications.notify({ type: "LOAN_OVERDUE", loan }));
    return overdue;
  }

  findActiveLoanByBook(bookId) {
    return this.loans.findAll().find((loan) => loan.bookId === bookId && loan.isActive());
  }

  getRequired(repository, id, name) {
    const item = repository.findById(id);
    if (!item) throw new Error(`${name} not found`);
    return item;
  }
}
