import { createSlice } from '@reduxjs/toolkit'

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    filter: 'all',
  },
  reducers: {
    addTask: (state, action) => {
      state.items.unshift({
        id: crypto.randomUUID(),
        description: action.payload,
        isDone: false,
      })
    },
    toggleTask: (state, action) => {
      const task = state.items.find((item) => item.id === action.payload)
      if (task) task.isDone = !task.isDone
    },
    editTask: (state, action) => {
      const task = state.items.find((item) => item.id === action.payload.id)
      if (task) task.description = action.payload.description
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
  },
})

export const { addTask, toggleTask, editTask, setFilter } = tasksSlice.actions
export default tasksSlice.reducer
