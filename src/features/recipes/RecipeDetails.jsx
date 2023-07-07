import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'

import { useSelector, useDispatch } from 'react-redux'
import { setForm, selectForm } from './recipeFormSlice'

const RecipeDetails = ({ recipeId }) => {
  const dispatch = useDispatch()

  const recipeDetails = useSelector(selectForm)

  let navigate = useNavigate()

  const setRecipe = async () => {
    const response = await Client.get(`${BASE_URL}/recipes/${recipeId}`)
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
      await Client.delete(`${BASE_URL}/recipes/${recipeId}`)
        .then(() => {
          navigate(`/recipes`)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const showUpdateForm = (id) => {
    navigate(`/recipes/form/${id}`)
  }

  let notes
  if (recipeDetails.notes != '') {
    notes = (
      <div className="recipe-notes">
        <h3>Notes</h3>
        <p>{recipeDetails.notes}</p>
      </div>
    )
  } else {
    notes = undefined
  }

  useEffect(() => {
    if (recipeId) {
      setRecipe()
    }
  }, [recipeId])

  return (
    <div className="recipe-details">
      <div>
        <h2>{recipeDetails.name}</h2>
        <div className="recipe-nav">
          <button className="button" onClick={() => showUpdateForm(recipeId)}>
            Edit Recipe
          </button>
          <button className="button" onClick={() => deleteRecipe()}>
            Delete Recipe
          </button>
          <button
            className="button"
            onClick={() => window.open(recipeDetails.url)}
          >
            Source
          </button>
        </div>
      </div>
      <div className="details">
        <img
          className="recipe-image"
          src={recipeDetails.image}
          alt="Recipe Image"
        />
        <ul className="recipe-ingredients">
          <h3>Ingredients</h3>
          {recipeDetails.ingredients.split('\n').map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <ol className="recipe-instructions">
          <h3>Instructions</h3>
          {recipeDetails.instructions.split('\n').map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        {notes}
      </div>
    </div>
  )
}

export default RecipeDetails
