export class Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  borrowedBooks: string[] = [];
  readonly borrowLimit: number = 3;

  constructor(id: string, name: string, email: string, phone: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  canBorrow(): boolean {
    return this.borrowedBooks.length < this.borrowLimit;
  }

  getActiveLoans(): string[] {
    return [...this.borrowedBooks];
  }
}

export class Librarian extends Member {
  staffId: string;
  readonly role = "librarian";
  override readonly borrowLimit: number = 5;

  constructor(id: string, name: string, email: string, phone: string, staffId: string) {
    super(id, name, email, phone);
    this.staffId = staffId;
  }

  registerMember(id: string, name: string, email: string, phone: string): Member {
    return new Member(id, name, email, phone);
  }
}
