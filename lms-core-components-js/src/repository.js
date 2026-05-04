export class InMemoryRepository {
  constructor() {
    this.items = new Map();
  }

  add(item) {
    this.items.set(item.id, item);
    return item;
  }

  findById(id) {
    return this.items.get(id) || null;
  }

  findAll() {
    return [...this.items.values()];
  }
}
