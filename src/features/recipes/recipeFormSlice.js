import { createSlice } from '@reduxjs/toolkit'

export const formSlice = createSlice({
  name: 'recipeForm',
  initialState: {
    recipe: {
      id: '',
      name: '',
      description: '',
      yield: '',
      totalTime: '',
      ingredients: '',
      instructions: '',
      image: '',
      url: '',
      notes: ''
    },
    edit: false,
    new: false
  },
  reducers: {
    setForm: (state, action) => {
      state.recipe = action.payload
    },
    setId: (state, action) => {
      state.recipe.id = action.payload
    },
    setEdit: (state, action) => {
      state.edit = action.payload
    },
    setNew: (state, action) => {
      state.new = action.payload
    },
    clearForm: (state) => {
      state.recipe = {
        id: '',
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
    }
  }
})

export const { setForm, setId, setEdit, setNew, clearForm } = formSlice.actions
export const selectForm = (state) => state.recipeForm.recipe
export const selectEdit = (state) => state.recipeForm.edit
export const selectNew = (state) => state.recipeForm.new
export default formSlice.reducer
