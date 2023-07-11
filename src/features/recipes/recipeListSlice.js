import { createSlice } from '@reduxjs/toolkit'

export const recipeSlice = createSlice({
  name: 'recipeList',
  initialState: {
    list: []
  },
  reducers: {
    setList: (state, action) => {
      state.list = action.payload
    }
  }
})

export const { setList } = recipeSlice.actions
export const selectList = (state) => state.recipeList.list
export default recipeSlice.reducer
