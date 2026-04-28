export class Book {
  private static nextId = 1;

  readonly id: number;
  title: string;
  author: string;
  isAvailable: boolean = true;

  constructor(title: string, author: string) {
    this.id = Book.nextId++;
    this.title = title;
    this.author = author;
  }

  toString(): string {
    return `"${this.title}" by ${this.author}`;
  }
}
