import type { Book } from "./book";
import type { BorrowTransaction } from "./library";
import type { Member } from "./member";
import type { Reservation } from "./reservation";

export type Report = {
  title: string;
  total: number;
  generatedAt: Date;
};

export class ReportService {
  generateInventoryReport(books: Book[]): Report {
    return {
      title: "Inventory Report",
      total: books.length,
      generatedAt: new Date(),
    };
  }

  generateLoanReport(transactions: BorrowTransaction[]): Report {
    return {
      title: "Loan Report",
      total: transactions.length,
      generatedAt: new Date(),
    };
  }

  generateMemberReport(members: Member[]): Report {
    return {
      title: "Member Report",
      total: members.length,
      generatedAt: new Date(),
    };
  }

  generateReservationReport(reservations: Reservation[]): Report {
    return {
      title: "Reservation Report",
      total: reservations.length,
      generatedAt: new Date(),
    };
  }
}
