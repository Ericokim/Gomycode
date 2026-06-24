import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import App from "./App.jsx";

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal("crypto", {
    randomUUID: vi.fn(() => `task-${Date.now()}-${Math.random()}`)
  });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Student Task Tracker", () => {
  test("renders the app with an empty state", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /student task tracker/i })).toBeInTheDocument();
    expect(screen.getByText(/no tasks to show/i)).toBeInTheDocument();
  });

  test("adds a task", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText(/new study task/i), "Revise chemistry");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(screen.getByText("Revise chemistry")).toBeInTheDocument();
    expect(screen.getByText("Revise chemistry")).not.toHaveStyle({ textDecoration: "line-through" });
  });

  test("marks a task as completed", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "Practice algebra");
    await user.click(screen.getByRole("checkbox", { name: /practice algebra/i }));

    expect(screen.getByRole("checkbox", { name: /practice algebra/i })).toBeChecked();
  });

  test("deletes a task", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "Read history chapter");
    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(screen.queryByText("Read history chapter")).not.toBeInTheDocument();
    expect(screen.getByText(/no tasks to show/i)).toBeInTheDocument();
  });

  test("filters active and completed tasks", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "Finish math homework");
    await addTask(user, "Submit science notes");
    await user.click(screen.getByRole("checkbox", { name: /finish math homework/i }));

    await user.click(screen.getByRole("button", { name: "Active" }));
    expect(screen.queryByText("Finish math homework")).not.toBeInTheDocument();
    expect(screen.getByText("Submit science notes")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Completed" }));
    expect(screen.getByText("Finish math homework")).toBeInTheDocument();
    expect(screen.queryByText("Submit science notes")).not.toBeInTheDocument();
  });

  test("updates task summary counts", async () => {
    const user = userEvent.setup();
    render(<App />);

    await addTask(user, "Review English essay");
    await addTask(user, "Study geography map");
    await user.click(screen.getByRole("checkbox", { name: /review english essay/i }));

    const summary = screen.getByLabelText(/task summary/i);
    expect(within(summary).getByText("Total").closest("article")).toHaveTextContent("2");
    expect(within(summary).getByText("Active").closest("article")).toHaveTextContent("1");
    expect(within(summary).getByText("Completed").closest("article")).toHaveTextContent("1");
  });
});

async function addTask(user, title) {
  await user.type(screen.getByLabelText(/new study task/i), title);
  await user.click(screen.getByRole("button", { name: /add task/i }));
}
