import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { clearAnecdoteNotification, createAnecdoteNotification } from '../reducers/notificationReducer'

function createAnecdoteAction(payload) {
  return dispatch => {
    dispatch(createAnecdote(payload))
    dispatch(createAnecdoteNotification(payload))
    setTimeout(() => {
      dispatch(clearAnecdoteNotification())
    }, 5000)
  }
}

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdoteAction(content))
  }
  return (
    <div>
      <h2>Add a new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
