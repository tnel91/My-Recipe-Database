import { createSlice } from '@reduxjs/toolkit'

const recipeListSlice = createSlice({
  name: 'recipeList',
  initialState: {
    list: []
  },
  reducers: {
    loadList: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { loadList } = recipeListSlice.actions
export const selectList = (state) => state.recipeList.list
export default recipeListSlice.reducer
