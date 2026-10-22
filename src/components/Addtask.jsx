import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../tasksSlice.js'

function Addtask() {
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedDescription = description.trim()
    if (!trimmedDescription) return

    dispatch(addTask(trimmedDescription))
    setDescription('')
  }

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-task">
        New task description
      </label>
      <span className="add-icon" aria-hidden="true">+</span>
      <input
        id="new-task"
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="What needs to get done?"
        maxLength={160}
      />
      <button type="submit" disabled={!description.trim()}>
        Add task
      </button>
    </form>
  )
}

export default Addtask
