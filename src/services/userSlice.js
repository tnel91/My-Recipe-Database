import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'userState',
  initialState: {
    user: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions
export const selectUser = (state) => state.userState.user
export default userSlice.reducer
