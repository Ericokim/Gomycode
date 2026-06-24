import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

type Task = {
  id: number;
  name: string;
  priority: string;
};

type MetricValue = number | string;

const priorities = ["Low", "Medium", "High", "Critical"];

function createTasks(count: number): Task[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Task ${index + 1}`,
    priority: priorities[(index + 1) % priorities.length]
  }));
}

function mutateFirstTasks(tasks: Task[], count = 50): Task[] {
  return tasks.map((task, index) => {
    if (index >= count) {
      return task;
    }

    return {
      ...task,
      name: `${task.name} - updated`,
      priority: priorities[(priorities.indexOf(task.priority) + 1) % priorities.length]
    };
  });
}

function removeFirstTasks(tasks: Task[], count = 50): Task[] {
  return tasks.slice(count);
}

function readMemoryMB(): number | string {
  const memory = (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory;
  return memory?.usedJSHeapSize ? Number((memory.usedJSHeapSize / 1024 / 1024).toFixed(2)) : "N/A";
}

function afterPaint(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./app.component.html"
})
export class AppComponent {
  tasks: Task[] = [];
  name = "";
  priority = "Medium";
  priorities = priorities;
  metrics = {
    render: "-" as MetricValue,
    update: "-" as MetricValue,
    deletion: "-" as MetricValue,
    memory: readMemoryMB()
  };

  async measure(label: "render" | "update" | "deletion", operation: () => void): Promise<void> {
    const start = performance.now();
    operation();
    await afterPaint();
    this.metrics = {
      ...this.metrics,
      [label]: Number((performance.now() - start).toFixed(2)),
      memory: readMemoryMB()
    };
  }

  addTask(): void {
    const trimmedName = this.name.trim();

    if (!trimmedName) {
      return;
    }

    this.tasks = [
      ...this.tasks,
      {
        id: Date.now(),
        name: trimmedName,
        priority: this.priority
      }
    ];
    this.name = "";
  }

  renderTasks(count: number): Promise<void> {
    return this.measure("render", () => {
      this.tasks = createTasks(count);
    });
  }

  updateFifty(): Promise<void> {
    return this.measure("update", () => {
      this.tasks = mutateFirstTasks(this.tasks, 50);
    });
  }

  deleteFifty(): Promise<void> {
    return this.measure("deletion", () => {
      this.tasks = removeFirstTasks(this.tasks, 50);
    });
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  trackTask(_index: number, task: Task): number {
    return task.id;
  }
}
