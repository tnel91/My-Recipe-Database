import { useSelector, useDispatch } from 'react-redux'
import { selectForm, setEdit } from './recipeFormSlice'

const RecipeDetails = () => {
  const dispatch = useDispatch()

  const recipeDetails = useSelector(selectForm)

  return (
    <div className="recipe-details">
      <div>
        <h2>{recipeDetails.name}</h2>
        <div className="recipe-nav">
          <button className="button" onClick={() => dispatch(setEdit(true))}>
            Edit Mode
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
        {recipeDetails.notes && (
          <div className="recipe-notes">
            <h3>Notes</h3>
            <p>{recipeDetails.notes}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeDetails
