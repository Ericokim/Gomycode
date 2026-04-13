import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";

export function createAppStore() {
  return configureStore({
    reducer: {
      tasks: tasksReducer,
    },
  });
}

export const store = createAppStore();
