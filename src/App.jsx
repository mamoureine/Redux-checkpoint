import { useDispatch, useSelector } from 'react-redux'
import Addtask from './components/Addtask.jsx'
import ListTask from './components/ListTask.jsx'
import { setFilter } from './tasksSlice.js'

const filters = [
  { value: 'all', label: 'All tasks' },
  { value: 'pending', label: 'Not done' },
  { value: 'done', label: 'Done' },
]

function App() {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks.items)
  const activeFilter = useSelector((state) => state.tasks.filter)
  const completedCount = tasks.filter((task) => task.isDone).length
  const remainingCount = tasks.length - completedCount
  const visibleTasks = tasks.filter((task) => {
    if (activeFilter === 'done') return task.isDone
    if (activeFilter === 'pending') return !task.isDone
    return true
  })
  const completion = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0

  return (
    <main className="page">
      <div className="todo-app">
        <header className="page-header">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">✳</span>
            <span>daylight</span>
          </div>
          <span className="header-note">A little focus goes a long way</span>
        </header>

        <section className="welcome">
          <p className="eyebrow">YOUR PERSONAL SPACE</p>
          <h1>Make room for <span>what matters.</span></h1>
          <p className="welcome-copy">
            One thing at a time. Add a task, make a little progress, and keep
            your day moving.
          </p>
        </section>

        <section className="task-panel" aria-label="To-do list">
          <div className="overview">
            <div>
              <p className="section-label">TODAY&apos;S PROGRESS</p>
              <p className="progress-count">
                <strong>{remainingCount}</strong>
                <span>{remainingCount === 1 ? 'task' : 'tasks'} left to do</span>
              </p>
            </div>
            <div className="progress-ring" aria-label={`${completion}% complete`}>
              <span>{completion}%</span>
            </div>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Tasks completed"
            aria-valuenow={completion}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span style={{ width: `${completion}%` }} />
          </div>

          <Addtask />

          <div className="list-heading">
            <h2>Your tasks <span>{tasks.length}</span></h2>
            <div className="filters" aria-label="Filter tasks">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  className={activeFilter === filter.value ? 'filter active' : 'filter'}
                  aria-pressed={activeFilter === filter.value}
                  onClick={() => dispatch(setFilter(filter.value))}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <ListTask tasks={visibleTasks} filter={activeFilter} />

          <footer className="panel-footer">
            <span>{completedCount} completed</span>
            <span>Small steps count.</span>
          </footer>
        </section>

        <p className="page-footer">Made for calmer, more focused days <span>✦</span></p>
      </div>
    </main>
  )
}

export default App
