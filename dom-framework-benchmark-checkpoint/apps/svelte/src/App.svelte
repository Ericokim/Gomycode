<script>
  import "../../../shared/styles.css";
  import {
    afterPaint,
    createTasks,
    mutateFirstTasks,
    priorities,
    readMemoryMB,
    removeFirstTasks
  } from "../../../shared/tasks.js";

  let tasks = [];
  let name = "";
  let priority = "Medium";
  let metrics = {
    render: "-",
    update: "-",
    deletion: "-",
    memory: readMemoryMB()
  };

  async function measure(label, operation) {
    const start = performance.now();
    operation();
    await afterPaint();
    metrics = {
      ...metrics,
      [label]: Number((performance.now() - start).toFixed(2)),
      memory: readMemoryMB()
    };
  }

  function addTask() {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    tasks = [
      ...tasks,
      {
        id: Date.now(),
        name: trimmedName,
        priority
      }
    ];
    name = "";
  }

  function editTask(id, patch) {
    tasks = tasks.map((task) => (task.id === id ? { ...task, ...patch } : task));
  }

  function removeTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
  }

  function renderTasks(count) {
    return measure("render", () => {
      tasks = createTasks(count);
    });
  }

  function updateFifty() {
    return measure("update", () => {
      tasks = mutateFirstTasks(tasks, 50);
    });
  }

  function deleteFifty() {
    return measure("deletion", () => {
      tasks = removeFirstTasks(tasks, 50);
    });
  }
</script>

<main class="app-shell">
  <section class="workspace">
    <header class="header">
      <div>
        <h1>Svelte DOM Benchmark</h1>
        <p>Todo list using Svelte keyed each blocks and compile-time DOM updates.</p>
      </div>
      <button class="secondary" on:click={() => (tasks = [])}>Clear</button>
    </header>

    <form class="panel controls" on:submit|preventDefault={addTask}>
      <label>
        Task name
        <input bind:value={name} placeholder="Add a task" />
      </label>
      <label>
        Priority
        <select bind:value={priority}>
          {#each priorities as item}
            <option>{item}</option>
          {/each}
        </select>
      </label>
      <button>Add task</button>
    </form>

    <section class="panel bench-controls">
      {#each [100, 500, 1000] as count}
        <button class="secondary" on:click={() => renderTasks(count)}>Render {count}</button>
      {/each}
      <button class="secondary" on:click={updateFifty} disabled={tasks.length < 50}>Update 50</button>
      <button class="danger" on:click={deleteFifty} disabled={tasks.length < 50}>Delete 50</button>
    </section>

    <section class="panel metrics">
      <div class="metric"><span>Tasks</span><strong>{tasks.length}</strong></div>
      <div class="metric"><span>Render ms</span><strong>{metrics.render}</strong></div>
      <div class="metric"><span>Update ms</span><strong>{metrics.update}</strong></div>
      <div class="metric"><span>Delete ms</span><strong>{metrics.deletion}</strong></div>
    </section>

    <section class="panel">
      <div class="task-list">
        {#if tasks.length === 0}
          <p class="empty">No tasks yet.</p>
        {/if}
        {#each tasks as task (task.id)}
          <article class="task-row">
            <input value={task.name} on:input={(event) => editTask(task.id, { name: event.currentTarget.value })} />
            <select value={task.priority} on:change={(event) => editTask(task.id, { priority: event.currentTarget.value })}>
              {#each priorities as item}
                <option>{item}</option>
              {/each}
            </select>
            <button class="danger" on:click={() => removeTask(task.id)}>Remove</button>
          </article>
        {/each}
      </div>
    </section>
  </section>
</main>
