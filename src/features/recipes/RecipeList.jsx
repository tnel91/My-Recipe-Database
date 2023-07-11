import { useState, useEffect } from 'react'
import Client from '../../services/api'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../globals'
import AuthError from '../errors/AuthError'
import RecipeSearch from './RecipeSearch'
import RecipeCard from './RecipeCard'
import RecipeFocus from './RecipeFocus'
import { useSelector, useDispatch } from 'react-redux'
import { setList, selectList } from './recipeListSlice'
import {
  setId,
  selectForm,
  setEdit,
  setNew,
  clearForm
} from './recipeFormSlice'

const RecipeList = ({ user }) => {
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const recipes = useSelector(selectList)
  const formState = useSelector(selectForm)

  let { urlId } = useParams()

  const [searchQuery, setSearchQuery] = useState({
    searchType: 'Name',
    query: ''
  })

  const getRecipes = async () => {
    await Client.get(`${BASE_URL}/recipes`)
      .then((response) => {
        console.log(response.data)
        dispatch(setList(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleChange = (event) => {
    setSearchQuery({ ...searchQuery, [event.target.id]: event.target.value })
  }

  // Handles Search Form Submission

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (searchQuery.searchType === 'Name') {
      await Client.get(`${BASE_URL}/recipe_search_by_name/${searchQuery.query}`)
        .then((response) => {
          dispatch(setList(response.data))
          setSearchQuery({ ...searchQuery, query: '' })
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
    if (searchQuery.searchType === 'Ingredients') {
      await Client.get(`${BASE_URL}/recipe_search_by_ingr/${searchQuery.query}`)
        .then((response) => {
          dispatch(setList(response.data))
          setSearchQuery({ ...searchQuery, query: '' })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const createNewRecipe = () => {
    dispatch(clearForm())
    dispatch(setId('new'))
    dispatch(setEdit(true))
    dispatch(setNew(true))
    navigate(`/recipes/new`)
  }

  const showRecipeDetails = (id) => {
    dispatch(setId(id))
    dispatch(setEdit(false))
    dispatch(setNew(false))
    navigate(`/recipes/${id}`)
  }

  useEffect(() => {
    if (urlId === 'empty') {
      return
    } else if (urlId === 'new') {
      createNewRecipe()
    } else {
      showRecipeDetails(urlId)
    }
  }, [])

  useEffect(() => {
    getRecipes()
  }, [])

  return user ? (
    // Renders if user is logged in
    <div className="container-fluid row">
      <div className="col-3">
        <RecipeSearch
          handleChange={handleChange}
          query={searchQuery.query}
          handleSubmit={handleSubmit}
          createNewRecipe={createNewRecipe}
        />
        {recipes.length > 0 ? (
          // Renders if recipes are found
          <section className="recipe-grid row">
            {recipes.map((recipe) => (
              <div key={recipe._id} className="col-12 container">
                <RecipeCard
                  id={recipe._id}
                  name={recipe.name}
                  yield={recipe.yield}
                  totalTime={recipe.totalTime}
                  image={recipe.image}
                  description={recipe.description}
                  onClick={showRecipeDetails}
                />
              </div>
            ))}
          </section>
        ) : (
          // Renders if no recipes are found
          <h3>No Results!</h3>
        )}
      </div>
      <div className="col-9">
        {formState.id ? (
          // Renders if recipeId is set
          <RecipeFocus />
        ) : (
          // Renders if recipeId is not set
          <h3>Click on a recipe to view details</h3>
        )}
      </div>
    </div>
  ) : (
    // Renders if user is not logged in
    <div>
      <AuthError />
    </div>
  )
}

export default RecipeList
