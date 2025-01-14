import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
function Home() {
  const [state, setState] = useState("list");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(null);
  async function fetchTodos() {
    const response = await fetch("/todos");
    const data = await response.json();
    setTodos(data);
  }
  useEffect(() => {
    fetchTodos();
  }, []);
  function handleTabClick(button) {
    setState(button.id);
  }
  async function handleDeleteButton(id) {
    await fetch(`/todos/${id}`, { method: "DELETE" });
    await fetchTodos();
  }
  async function handleEditButton(id) {
    setEdit(todos.find((todo) => todo.id === id));
    setState("edit");
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const title = form.title.value;
    const is_completed = form.is_completed.checked;
    await fetch(`/todos${state === "edit" ? `/${edit.id}` : ""}`, {
      method: state === "edit" ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, is_completed })
    });
    await fetchTodos();
    setEdit(null);
    setState("list");
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Homepage" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center w-full h-full", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-6xl font-medium text-[#5a45ff] mb-12", children: "Todo-List App" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-5 gap-2 bg-[#5a45ff] w-full max-w-4xl rounded-xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              id: "list",
              onClick: (x) => handleTabClick(x.target),
              className: "p-2 bg-[#f9f9f9] rounded-md font-medium",
              children: "View Task"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              id: "create",
              onClick: (x) => handleTabClick(x.target),
              className: "p-2 bg-[#f9f9f9] rounded-md font-medium",
              children: "Create Task"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("hr", {}),
        state === "list" ? /* @__PURE__ */ jsx("div", { className: "flex flex-col bg-[#f9f9f9] rounded-md p-2 min-h-10", children: todos.length ? todos.map((todo, i) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex justify-between items-center p-2 border-[#5a45ff]",
            children: [
              /* @__PURE__ */ jsxs("p", { className: "font-medium", children: [
                ++i,
                ". ",
                todo.title,
                " (",
                todo.isCompleted ? "Completed" : "Not Completed",
                ")"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleEditButton(todo.id),
                    className: "p-2 bg-[#5a45ff] text-white rounded-md",
                    children: "Edit"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleDeleteButton(todo.id),
                    className: "p-2 bg-red-700 text-white rounded-md",
                    children: "Delete"
                  }
                )
              ] })
            ]
          },
          todo.id
        )) : /* @__PURE__ */ jsx("p", { className: "text-center font-medium", children: "Task Empty" }) }) : /* @__PURE__ */ jsxs(
          "form",
          {
            onSubmit: handleSubmit,
            className: "flex flex-col bg-[#f9f9f9] rounded-xl overflow-hidden p-5 gap-3",
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  name: "title",
                  type: "text",
                  placeholder: "Task Title",
                  value: edit == null ? void 0 : edit.title,
                  onChange: (x) => state === "edit" && setEdit({ ...edit, title: x.target.value }),
                  className: "p-2 rounded-md border-[1px]"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    name: "is_completed",
                    id: "is_completed",
                    type: "checkbox",
                    checked: edit == null ? void 0 : edit.isCompleted,
                    onChange: (x) => state === "edit" && setEdit({ ...edit, isCompleted: x.target.checked }),
                    className: "peer hidden"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "is_completed",
                    className: "select-none cursor-pointer rounded-lg border-2 py-2 px-4 font-medium transition-colors duration-200 ease-in-out peer-checked:bg-[#5a45ff] peer-checked:text-[#f9f9f9] peer-checked:border-gray-200",
                    children: "Completed"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("button", { type: "submit", className: "p-2 bg-[#5a45ff] text-white rounded-md", children: state === "edit" ? "Update" : "Submit" })
            ]
          }
        )
      ] })
    ] })
  ] });
}
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_2 as _
};
