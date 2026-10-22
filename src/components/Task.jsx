import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editTask, toggleTask } from '../tasksSlice.js'

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(task.description)
  const dispatch = useDispatch()

  function saveEdit(event) {
    event.preventDefault()
    const trimmedDescription = description.trim()
    if (!trimmedDescription) return

    dispatch(editTask({ id: task.id, description: trimmedDescription }))
    setIsEditing(false)
  }

  function cancelEdit() {
    setDescription(task.description)
    setIsEditing(false)
  }

  return (
    <li className={task.isDone ? 'task-item is-done' : 'task-item'}>
      <label className="task-check">
        <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => dispatch(toggleTask(task.id))}
          aria-label={`Mark "${task.description}" ${task.isDone ? 'not done' : 'done'}`}
        />
        <span className="checkmark" aria-hidden="true" />
      </label>

      {isEditing ? (
        <form className="edit-form" onSubmit={saveEdit}>
          <label className="visually-hidden" htmlFor={`edit-${task.id}`}>
            Edit task description
          </label>
          <input
            id={`edit-${task.id}`}
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            maxLength={160}
            autoFocus
          />
          <button type="submit" className="text-action" disabled={!description.trim()}>
            Save
          </button>
          <button type="button" className="text-action muted" onClick={cancelEdit}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span className="task-description">{task.description}</span>
          <button
            type="button"
            className="edit-button"
            aria-label={`Edit "${task.description}"`}
            onClick={() => {
              setDescription(task.description)
              setIsEditing(true)
            }}
          >
            Edit
          </button>
        </>
      )}
    </li>
  )
}

export default Task
