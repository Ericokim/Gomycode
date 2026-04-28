export interface Observer {
  update(message: string): void;
}

export class NotificationService {
  private observers: Observer[] = [];
  public log: string[] = [];

  register(observer: Observer): void {
    this.observers.push(observer);
  }

  notify(message: string): void {
    this.log.push(message);
    this.observers.forEach(o => o.update(message));
  }
}
