import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { clearAnecdoteNotification, voteNotification } from '../reducers/notificationReducer'

function voteAction(payload) {
  return dispatch => {
    dispatch(vote(payload.id))
    dispatch(voteNotification(payload.content))
    setTimeout(() => {
      dispatch(clearAnecdoteNotification())
    }, 5000)
  }
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state =>
    state.anecdotes.filter(a =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())).sort((a, b) =>
      (b.votes - a.votes))
  )

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteAction(anecdote))}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
