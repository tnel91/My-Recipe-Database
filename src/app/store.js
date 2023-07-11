import { configureStore } from '@reduxjs/toolkit'
import recipeReducer from '../features/recipes/recipeListSlice'
import formReducer from '../features/recipes/recipeFormSlice'
import userReducer from '../services/userSlice'

export default configureStore({
  reducer: {
    recipeList: recipeReducer,
    recipeForm: formReducer,
    userState: userReducer
  }
})
