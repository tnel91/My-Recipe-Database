import RecipeDetails from './RecipeDetails'
import RecipeForm from './RecipeForm'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  setForm,
  selectForm,
  selectEdit,
  setEdit,
  clearForm
} from './recipeFormSlice'

const RecipeFocus = () => {
  const dispatch = useDispatch()
  const edits = useSelector(selectEdit)
  const formState = useSelector(selectForm)

  let navigate = useNavigate()

  const setRecipe = async () => {
    const response = await Client.get(`${BASE_URL}/recipes/${formState.id}`)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.log(error)
      })
    let RecipeDetails = {
      id: response._id,
      name: response.name.toUpperCase(),
      description: response.description,
      yield: response.yield,
      totalTime: response.totalTime,
      ingredients: response.ingredients,
      instructions: response.instructions,
      image: response.image,
      url: response.url,
      notes: response.notes
    }
    dispatch(setForm(RecipeDetails))
  }

  const deleteRecipe = async () => {
    let confirm = window.confirm('Delete recipe forever?')
    if (confirm === true) {
      await Client.delete(`${BASE_URL}/recipes/${formState.id}`)
        .then(() => {
          dispatch(clearForm())
          dispatch(setEdit(false))
          navigate(`/recipes/empty`)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    if (formState.id !== 'new') {
      setRecipe()
    }
  }, [formState.id])

  return edits ? <RecipeForm deleteRecipe={deleteRecipe} /> : <RecipeDetails />
}

export default RecipeFocus
