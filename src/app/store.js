import { configureStore } from '@reduxjs/toolkit'
import recipeReducer from '../features/recipes/recipeListSlice'
import formReducer from '../features/recipes/recipeFormSlice'

export default configureStore({
  reducer: {
    recipe: recipeReducer,
    recipeForm: formReducer
  }
})
