import { createApp, nextTick, ref } from "vue";
import "../../../shared/styles.css";
import {
  createTask,
  createTasks,
  mutateFirstTasks,
  priorities,
  readMemoryMB,
  removeFirstTasks
} from "../../../shared/tasks.js";

createApp({
  setup() {
    const tasks = ref([]);
    const name = ref("");
    const priority = ref("Medium");
    const metrics = ref({
      render: "-",
      update: "-",
      deletion: "-",
      memory: readMemoryMB()
    });

    async function afterVuePaint() {
      await nextTick();
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }

    async function measure(label, operation) {
      const start = performance.now();
      operation();
      await afterVuePaint();
      metrics.value = {
        ...metrics.value,
        [label]: Number((performance.now() - start).toFixed(2)),
        memory: readMemoryMB()
      };
    }

    function addTask() {
      const trimmedName = name.value.trim();

      if (!trimmedName) {
        return;
      }

      tasks.value = [...tasks.value, { id: Date.now(), name: trimmedName, priority: priority.value }];
      name.value = "";
    }

    function removeTask(id) {
      tasks.value = tasks.value.filter((task) => task.id !== id);
    }

    return {
      addTask,
      createTask,
      deleteFifty: () => measure("deletion", () => { tasks.value = removeFirstTasks(tasks.value, 50); }),
      metrics,
      name,
      priorities,
      priority,
      removeTask,
      renderTasks: (count) => measure("render", () => { tasks.value = createTasks(count); }),
      tasks,
      updateFifty: () => measure("update", () => { tasks.value = mutateFirstTasks(tasks.value, 50); })
    };
  },
  template: `
    <main class="app-shell">
      <section class="workspace">
        <header class="header">
          <div>
            <h1>Vue DOM Benchmark</h1>
            <p>Todo list using Vue reactivity, v-for, v-if, and v-model bindings.</p>
          </div>
          <button class="secondary" @click="tasks = []">Clear</button>
        </header>

        <form class="panel controls" @submit.prevent="addTask">
          <label>
            Task name
            <input v-model="name" placeholder="Add a task" />
          </label>
          <label>
            Priority
            <select v-model="priority">
              <option v-for="item in priorities" :key="item">{{ item }}</option>
            </select>
          </label>
          <button>Add task</button>
        </form>

        <section class="panel bench-controls">
          <button v-for="count in [100, 500, 1000]" :key="count" class="secondary" @click="renderTasks(count)">
            Render {{ count }}
          </button>
          <button class="secondary" @click="updateFifty" :disabled="tasks.length < 50">Update 50</button>
          <button class="danger" @click="deleteFifty" :disabled="tasks.length < 50">Delete 50</button>
        </section>

        <section class="panel metrics">
          <div class="metric"><span>Tasks</span><strong>{{ tasks.length }}</strong></div>
          <div class="metric"><span>Render ms</span><strong>{{ metrics.render }}</strong></div>
          <div class="metric"><span>Update ms</span><strong>{{ metrics.update }}</strong></div>
          <div class="metric"><span>Delete ms</span><strong>{{ metrics.deletion }}</strong></div>
        </section>

        <section class="panel">
          <div class="task-list">
            <p v-if="tasks.length === 0" class="empty">No tasks yet.</p>
            <article v-for="task in tasks" :key="task.id" class="task-row">
              <input v-model="task.name" />
              <select v-model="task.priority">
                <option v-for="item in priorities" :key="item">{{ item }}</option>
              </select>
              <button class="danger" @click="removeTask(task.id)">Remove</button>
            </article>
          </div>
        </section>
      </section>
    </main>
  `
}).mount("#app");
