import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: 1,
      description: "Create the Redux task state and task actions.",
      isDone: false,
    },
    {
      id: 2,
      description: "Build the required components with the reference styling.",
      isDone: true,
    },
    {
      id: 3,
      description: "Test add, filter, and edit before submitting the checkpoint.",
      isDone: false,
    },
  ],
  filter: "all",
  editingTaskId: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.items.unshift({
        id: Date.now(),
        description: action.payload.description,
        isDone: false,
      });
      // Show the newly created task immediately in the list view.
      state.filter = "all";
      state.editingTaskId = null;
    },
    toggleTaskStatus: (state, action) => {
      const task = state.items.find((item) => item.id === action.payload);

      if (task) {
        task.isDone = !task.isDone;
      }
    },
    startEditingTask: (state, action) => {
      state.editingTaskId = action.payload;
    },
    cancelEditingTask: (state) => {
      state.editingTaskId = null;
    },
    updateTask: (state, action) => {
      const task = state.items.find((item) => item.id === action.payload.id);

      if (task) {
        task.description = action.payload.description;
        state.editingTaskId = null;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addTask,
  toggleTaskStatus,
  startEditingTask,
  cancelEditingTask,
  updateTask,
  setFilter,
} = tasksSlice.actions;

export default tasksSlice.reducer;
