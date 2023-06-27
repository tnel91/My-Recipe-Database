import { createSlice } from '@reduxjs/toolkit'

export const formSlice = createSlice({
  name: 'recipeForm',
  initialState: {
    recipe: {
      name: '',
      description: '',
      yield: '',
      totalTime: '',
      ingredients: '',
      instructions: '',
      image: '',
      url: '',
      notes: ''
    }
  },
  reducers: {
    setForm: (state, action) => {
      state.recipe = action.payload
    }
  }
})

export const { setForm } = formSlice.actions
export const selectForm = (state) => state.recipeForm.recipe
export default formSlice.reducer
