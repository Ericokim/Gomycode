export enum ReservationStatus {
  Active = "Active",
  Fulfilled = "Fulfilled",
  Cancelled = "Cancelled",
}

export class Reservation {
  id: string;
  bookId: string;
  memberId: string;
  reservedOn: Date;
  status: ReservationStatus = ReservationStatus.Active;

  constructor(id: string, bookId: string, memberId: string) {
    this.id = id;
    this.bookId = bookId;
    this.memberId = memberId;
    this.reservedOn = new Date();
  }

  fulfill(): void {
    this.status = ReservationStatus.Fulfilled;
  }

  cancel(): void {
    this.status = ReservationStatus.Cancelled;
  }
}
