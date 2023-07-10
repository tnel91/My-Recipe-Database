import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../globals'
import Client from '../../services/api'
import { useSelector, useDispatch } from 'react-redux'
import {
  setForm,
  selectForm,
  setEdit,
  setNew,
  selectNew,
  setId
} from './recipeFormSlice'

const RecipeForm = ({ deleteRecipe }) => {
  let navigate = useNavigate()
  const dispatch = useDispatch()

  const formState = useSelector(selectForm)
  const isNewRecipe = useSelector(selectNew)

  const handleChange = (event) => {
    dispatch(setForm({ ...formState, [event.target.name]: event.target.value }))
  }

  const saveChanges = async (event) => {
    event.preventDefault()
    if (isNewRecipe) {
      await Client.post(`${BASE_URL}/recipes`, formState)
        .then((response) => {
          dispatch(setEdit(false))
          dispatch(setNew(false))
          dispatch(setId(response.data.recipe._id))
          navigate(`/recipes/${response.data.recipe._id}`)
        })
        .catch((error) => {
          alert(error.response.data)
        })
    } else {
      await Client.put(`${BASE_URL}/recipes/${formState.id}`, formState)
        .then(() => {
          navigate(`/recipes/${formState.id}`)
          dispatch(setEdit(false))
        })
        .catch((error) => {
          alert(error.response.data)
        })
    }
  }

  return (
    <div className="recipe-form">
      <button onClick={() => dispatch(setEdit(false))}>View Mode</button>
      <button onClick={saveChanges}>Save Changes</button>
      <button onClick={deleteRecipe}>Delete Recipe</button>
      <p id="form-note">
        <span className="bold">Note:</span> When filling out Ingredients and
        Instructions in this form, please ensure each ingredient/step is
        separated by a line break to ensure proper formatting.
      </p>
      <form id="recipe-form-grid">
        <label htmlFor="name">Recipe Name:</label>
        <input
          id="name"
          name="name"
          onChange={handleChange}
          value={formState.name}
          placeholder="required"
          required
        />
        <label htmlFor="description">Description: </label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          value={formState.description}
        ></textarea>
        <label htmlFor="yield">Yield:</label>
        <input
          id="yield"
          name="yield"
          onChange={handleChange}
          value={formState.yield}
        />
        <label htmlFor="totalTime">Total Time:</label>
        <input
          id="totalTime"
          name="totalTime"
          onChange={handleChange}
          value={formState.totalTime}
        />
        <label htmlFor="ingredients">Ingredients:</label>
        <textarea
          id="ingredients"
          name="ingredients"
          onChange={handleChange}
          value={formState.ingredients}
          placeholder="required"
          required
        />
        <label htmlFor="instructions">Instructions:</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
          value={formState.instructions}
          placeholder="required"
          required
        />
        <label htmlFor="image">Image:</label>
        <input
          id="image"
          name="image"
          onChange={handleChange}
          value={formState.image}
        />
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          name="url"
          onChange={handleChange}
          value={formState.url}
        />
        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          onChange={handleChange}
          value={formState.notes}
        />
      </form>
    </div>
  )
}

export default RecipeForm
