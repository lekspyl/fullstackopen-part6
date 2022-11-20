import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createAnecdoteNotification(state, action) {
      const content = action.payload
      return `Added '${content}'`
    },
    voteNotification(state, action) {
      const content = action.payload
      return `Voted for '${content}`
    },
    clearAnecdoteNotification(state, action) {
      return ''
    }
  }
})

export const { createAnecdoteNotification, voteNotification, clearAnecdoteNotification } = notificationSlice.actions
export default notificationSlice.reducer
