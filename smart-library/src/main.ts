import "./style.css";
import { UserFactory } from "./patterns/factory";
import type { UserType } from "./patterns/factory";
import { LibrarySystem } from "./patterns/singleton";
import { Book } from "./models/book";
import type { Observer } from "./patterns/observer";

const library = LibrarySystem.getInstance();

// Register a UI observer that appends to the notification log
class UIObserver implements Observer {
  update(message: string): void {
    const log = document.getElementById("notification-log")!;
    const li = document.createElement("li");
    li.textContent = message;
    li.className = message.startsWith("OVERDUE") ? "overdue" : "info";
    log.prepend(li);
  }
}
library.registerObserver(new UIObserver());

// Seed some sample data so the UI isn't empty on load
function seedData() {
  const alice = UserFactory.create("student", "Alice Kamau", "alice@uni.ac.ke");
  const bob = UserFactory.create("teacher", "Dr. Bob Otieno", "bob@uni.ac.ke");
  library.addUser(alice);
  library.addUser(bob);

  library.addBook(new Book("Clean Code", "Robert C. Martin"));
  library.addBook(new Book("The Pragmatic Programmer", "Hunt & Thomas"));
  library.addBook(new Book("Design Patterns", "Gang of Four"));
}
seedData();

// --- Helpers ---
function msg(id: string, text: string, isError = false) {
  const el = document.getElementById(id)!;
  el.textContent = text;
  el.className = `msg ${isError ? "error" : "success"}`;
}

function refreshSelects() {
  const users = library.getUsers();
  const books = library.getBooks();
  const activeTx = library.getActiveTransactions();

  const borrowUserEl = document.getElementById("borrow-user") as HTMLSelectElement;
  const borrowBookEl = document.getElementById("borrow-book") as HTMLSelectElement;
  const returnTxEl = document.getElementById("return-transaction") as HTMLSelectElement;

  borrowUserEl.innerHTML = users.length
    ? users.map(u => `<option value="${u.id}">${u.name} (${u.getRole()})</option>`).join("")
    : '<option value="">No users yet</option>';

  borrowBookEl.innerHTML = books.filter(b => b.isAvailable).length
    ? books.filter(b => b.isAvailable).map(b => `<option value="${b.id}">${b.title}</option>`).join("")
    : '<option value="">No available books</option>';

  returnTxEl.innerHTML = activeTx.length
    ? activeTx.map(tx => {
        const user = users.find(u => u.id === tx.userId);
        const book = books.find(b => b.id === tx.bookId);
        return `<option value="${tx.id}">#${tx.id} — ${user?.name}: "${book?.title}"</option>`;
      }).join("")
    : '<option value="">No active loans</option>';
}

function refreshLoansTable() {
  const users = library.getUsers();
  const books = library.getBooks();
  const tbody = document.getElementById("loans-body")!;
  const activeTx = library.getActiveTransactions();

  tbody.innerHTML = activeTx.length === 0
    ? '<tr><td colspan="6" class="empty">No active loans</td></tr>'
    : activeTx.map(tx => {
        const user = users.find(u => u.id === tx.userId);
        const book = books.find(b => b.id === tx.bookId);
        const overdue = tx.isOverdue();
        return `<tr class="${overdue ? "overdue-row" : ""}">
          <td>${tx.id}</td>
          <td>${user?.name ?? "?"}</td>
          <td>${book?.title ?? "?"}</td>
          <td>${tx.borrowDate.toLocaleDateString()}</td>
          <td>${tx.dueDate.toLocaleDateString()}</td>
          <td>${overdue ? "OVERDUE" : "Active"}</td>
        </tr>`;
      }).join("");
}

// --- Add User ---
document.getElementById("add-user-form")!.addEventListener("submit", e => {
  e.preventDefault();
  const name = (document.getElementById("user-name") as HTMLInputElement).value.trim();
  const email = (document.getElementById("user-email") as HTMLInputElement).value.trim();
  const type = (document.getElementById("user-type") as HTMLSelectElement).value as UserType;

  const user = UserFactory.create(type, name, email);
  library.addUser(user);
  msg("user-msg", `Added ${user.getRole()} "${user.name}" (ID: ${user.id})`);
  (e.target as HTMLFormElement).reset();
  refreshSelects();
});

// --- Add Book ---
document.getElementById("add-book-form")!.addEventListener("submit", e => {
  e.preventDefault();
  const title = (document.getElementById("book-title") as HTMLInputElement).value.trim();
  const author = (document.getElementById("book-author") as HTMLInputElement).value.trim();

  const book = new Book(title, author);
  library.addBook(book);
  msg("book-msg", `Added "${book.title}" by ${book.author} (ID: ${book.id})`);
  (e.target as HTMLFormElement).reset();
  refreshSelects();
});

// --- Borrow Book ---
document.getElementById("borrow-form")!.addEventListener("submit", e => {
  e.preventDefault();
  const userId = parseInt((document.getElementById("borrow-user") as HTMLSelectElement).value);
  const bookId = parseInt((document.getElementById("borrow-book") as HTMLSelectElement).value);

  const result = library.borrowBook(userId, bookId);
  const isErr = result.includes("already") || result.includes("limit") || result.includes("not found");
  msg("borrow-msg", result, isErr);
  refreshSelects();
  refreshLoansTable();
});

// --- Return Book ---
document.getElementById("return-form")!.addEventListener("submit", e => {
  e.preventDefault();
  const txId = parseInt((document.getElementById("return-transaction") as HTMLSelectElement).value);

  const result = library.returnBook(txId);
  msg("return-msg", result, result.includes("not found") || result.includes("already"));
  refreshSelects();
  refreshLoansTable();
});

// --- Refresh loans ---
document.getElementById("refresh-loans")!.addEventListener("click", refreshLoansTable);

// --- Check Overdue ---
document.getElementById("check-overdue")!.addEventListener("click", () => {
  document.getElementById("notification-log")!.innerHTML = "";
  library.checkOverdue();
});

// Initial render
refreshSelects();
refreshLoansTable();
