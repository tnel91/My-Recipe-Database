import { configureStore } from '@reduxjs/toolkit'
import recipeReducer from '../features/recipes/recipeListSlice'
import formReducer from '../features/recipes/recipeFormSlice'
import userReducer from '../services/userSlice'

const store = configureStore({
  reducer: {
    recipeList: recipeReducer,
    recipeForm: formReducer,
    userState: userReducer
  }
})

export default store
