import { createSlice } from '@reduxjs/toolkit'

export const detailsSlice = createSlice({
  name: 'recipeDetails',
  initialState: {
    recipe: {
      name: '',
      description: '',
      yield: '',
      totalTime: '',
      ingredients: [],
      instructions: [],
      image: '',
      url: '',
      notes: ''
    }
  },
  reducers: {
    setDetails: (state, action) => {
      state.recipe = action.payload
    }
  }
})

export const { setDetails } = detailsSlice.actions
export const selectDetails = (state) => state.recipeDetails.recipe
export default detailsSlice.reducer
