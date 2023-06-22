import { configureStore } from '@reduxjs/toolkit'
import recipeReducer from '../features/recipe/recipeListSlice'
import formReducer from '../features/recipe/recipeFormSlice'

export default configureStore({
  reducer: {
    recipe: recipeReducer,
    recipeForm: formReducer
  }
})
