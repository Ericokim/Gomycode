export class BorrowTransaction {
  private static nextId = 1;

  readonly id: number;
  readonly userId: number;
  readonly bookId: number;
  readonly borrowDate: Date;
  readonly dueDate: Date;
  returned: boolean = false;

  constructor(userId: number, bookId: number, dueDays: number = 14) {
    this.id = BorrowTransaction.nextId++;
    this.userId = userId;
    this.bookId = bookId;
    this.borrowDate = new Date();
    this.dueDate = new Date(Date.now() + dueDays * 24 * 60 * 60 * 1000);
  }

  isOverdue(): boolean {
    return !this.returned && new Date() > this.dueDate;
  }
}
