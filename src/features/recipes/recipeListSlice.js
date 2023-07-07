import { createSlice } from '@reduxjs/toolkit'

export const recipeSlice = createSlice({
  name: 'recipe',
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
export const selectList = (state) => state.recipe.list
export default recipeSlice.reducer
