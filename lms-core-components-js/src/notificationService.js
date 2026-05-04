export class NotificationService {
  constructor() {
    this.observers = new Set();
  }

  subscribe(observer) {
    this.observers.add(observer);
  }

  notify(event) {
    for (const observer of this.observers) {
      observer(event);
    }
  }
}
