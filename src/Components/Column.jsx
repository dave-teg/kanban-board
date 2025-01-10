import React from "react";
import "./Column.css";
import Task from "./Task";
import { useStore } from "../store";
import { useMemo, useState } from "react";
import classNames from "classnames";

const Column = ({ status }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore((state) => state.tasks);
  const filtered = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status]
  );
  const addTask = useStore((state) => state.addTask);
  const setDraggedTask = useStore((state) => state.setDraggedTask);
  const draggedTask = useStore((state) => state.draggedTask);
  const moveTask =  useStore((state) => state.moveTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!text) {
      setOpen(false);
      return;
    };
    addTask(text, status);
    setText("");
    setOpen(false);
  };

  return (
    <div className={classNames("column", {drop: drop})} 
    onDragOver={(e) => {
      e.preventDefault()
      setDrop(true)
    }}
    onDragLeave={(e) => {
      e.preventDefault();
      setDrop(false)
    }}
    onDrop={() => {
      setDrop(false)
      moveTask(draggedTask, status)
      setDraggedTask(null)
    }}
    
    >
      <div className="titleWrapper">
        <p>{status} </p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {filtered.map((task, index) => (
        <Task title={task.title} status={task.status} key={index} />
      ))}
      {open && (
        <div className="modal">
          <div className="modalContainer">
            <form className="inputForm">
              <input
                type="text"
                placeholder="Enter the task title"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button type="submit" onClick={handleSubmit}>
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Column;
