import { configureStore } from '@reduxjs/toolkit'
import recipeListReducer from '../features/RecipeList/RecipeListSlice'

export default configureStore({
  reducer: {
    recipeList: recipeListReducer
  }
})
