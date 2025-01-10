import React from 'react'
import "./Task.css"
import classNames from 'classnames'
import { useStore } from '../store'
import { FaTrashAlt } from "react-icons/fa";


const Task = ({title, status}) => {
  const task = useStore((state) => state.tasks.find(task => task.title === title))
  const deleteTask = useStore((state) => state.deleteTask)
  const setDraggedTask = useStore((state) => state.setDraggedTask);

  return (
    <div className='Task' draggable onDragStart={() => setDraggedTask(task.id)}>
      <div>{title}</div>
      <div className="bottomWrapper">
        <button className="deleteTask" onClick={() => deleteTask(task.id)}><FaTrashAlt /></button>
        <div className={classNames('status', status)}>{status}</div>
      </div>
    </div>
  )
}

export default Task