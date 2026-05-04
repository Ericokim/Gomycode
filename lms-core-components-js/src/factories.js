import { Book, Member } from "./models.js";
import { generateId, required, validEmail } from "./utils.js";

export function createBook({ title, author, isbn }) {
  return new Book({
    id: generateId("book"),
    title: required(title, "title"),
    author: required(author, "author"),
    isbn: required(isbn, "isbn"),
  });
}

export function createMember({ name, email, borrowLimit = 3 }) {
  return new Member({
    id: generateId("member"),
    name: required(name, "name"),
    email: validEmail(email),
    borrowLimit,
  });
}
