export abstract class User {
  private static nextId = 1;

  readonly id: number;
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.id = User.nextId++;
    this.name = name;
    this.email = email;
  }

  abstract getRole(): string;
  abstract borrowLimit: number;

  toString(): string {
    return `[${this.getRole()}] ${this.name} (${this.email})`;
  }
}

export class Student extends User {
  borrowLimit = 3;
  getRole() { return "Student"; }
}

export class Teacher extends User {
  borrowLimit = 5;
  getRole() { return "Teacher"; }
}
