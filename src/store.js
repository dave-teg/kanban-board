import { create } from 'zustand'
import { v4 as uuidv4} from 'uuid'
import { devtools, persist } from 'zustand/middleware'

const store = (set) => ({
  tasks: [],
  draggedTask: null,
  addTask: (title, status) => set((state) => ({tasks: [...state.tasks, {id: uuidv4(), title, status}]}), false, 'addTask'),
  deleteTask: (id) => set((state) => ({tasks: state.tasks.filter(task => task.id !== id)}), false, "deleteTask"),
  setDraggedTask: (id) => set({draggedTask: id}, false, "setDragged"),
  moveTask: (id, status) => set((state) => ({tasks: state.tasks.map(task => task.id === id ? {...task, status: status} : task)}), false, "moveTask")
})

export const useStore = create(persist(devtools(store), {name: "taskStore"}))