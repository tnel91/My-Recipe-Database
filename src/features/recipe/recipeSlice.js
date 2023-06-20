import { createSlice } from '@reduxjs/toolkit'

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    list: []
  },
  reducers: {
    loadList: (state, action) => {
      state.list = action.payload
    }
  }
})

export const { loadList } = recipeSlice.actions
export const selectList = (state) => state.recipe.list
export default recipeSlice.reducer
