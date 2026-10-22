import Task from './Task.jsx'

function ListTask({ tasks, filter }) {
  if (tasks.length === 0) {
    const message = filter === 'done'
      ? 'Completed tasks will show up here.'
      : filter === 'pending'
        ? 'You’re all caught up. Nothing left to do!'
        : 'Your list is clear. Add a task to get started.'

    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">✳</span>
        <p>{message}</p>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => <Task key={task.id} task={task} />)}
    </ul>
  )
}

export default ListTask
