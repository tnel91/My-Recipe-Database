import { configureStore } from '@reduxjs/toolkit'
import recipeReducer from '../features/recipes/recipeListSlice'
import formReducer from '../features/recipes/recipeFormSlice'
import detailsReducer from '../features/recipes/recipeDetailsSlice'

export default configureStore({
  reducer: {
    recipe: recipeReducer,
    recipeForm: formReducer,
    recipeDetails: detailsReducer
  }
})
