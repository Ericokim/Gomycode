export enum BookStatus {
  Available = "Available",
  Reserved = "Reserved",
  Issued = "Issued",
  Lost = "Lost",
  Removed = "Removed",
}

export class Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  status: BookStatus;

  constructor(id: string, title: string, author: string, isbn: string, genre: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.genre = genre;
    this.status = BookStatus.Available;
  }

  isAvailable(): boolean {
    return this.status === BookStatus.Available;
  }

  markIssued(): void {
    if (!this.isAvailable() && this.status !== BookStatus.Reserved) {
      throw new Error(`Book "${this.title}" is not available`);
    }
    this.status = BookStatus.Issued;
  }

  markReserved(): void {
    if (!this.isAvailable()) throw new Error(`Book "${this.title}" cannot be reserved`);
    this.status = BookStatus.Reserved;
  }

  markReturned(): void {
    this.status = BookStatus.Available;
  }

  markLost(): void {
    this.status = BookStatus.Lost;
  }

  markRemoved(): void {
    this.status = BookStatus.Removed;
  }
}

export class Catalog {
  private books: Book[] = [];

  addBook(book: Book): void {
    this.books.push(book);
  }

  removeBook(bookId: string): void {
    this.books = this.books.filter((b) => b.id !== bookId);
  }

  findById(bookId: string): Book | null {
    return this.books.find((b) => b.id === bookId) ?? null;
  }

  search(query: string): Book[] {
    const q = query.toLowerCase();
    return this.books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.isbn.includes(q)
    );
  }
}
