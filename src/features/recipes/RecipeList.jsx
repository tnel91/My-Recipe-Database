import Client from '../../services/api'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../globals'
import AuthError from '../errors/AuthError'
import RecipeSearch from './RecipeSearch'
import RecipeCard from './RecipeCard'
import RecipeDetails from './RecipeDetails'

import { useSelector, useDispatch } from 'react-redux'
import { setList, selectList } from './recipeListSlice'

const RecipeList = ({ user }) => {
  const dispatch = useDispatch()

  const recipes = useSelector(selectList)

  let { urlId } = useParams()

  let navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState({
    searchType: 'Name',
    query: ''
  })

  const [recipeId, setRecipeId] = useState('')

  const getRecipes = async () => {
    await Client.get(`${BASE_URL}/recipes`)
      .then((response) => {
        dispatch(setList(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleChange = (event) => {
    setSearchQuery({ ...searchQuery, [event.target.id]: event.target.value })
  }

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

  const showRecipeDetails = (id) => {
    setRecipeId(id)
    navigate(`/recipes/${id}`)
  }

  const showCreateForm = () => {
    navigate('/recipes/form')
  }

  useEffect(() => {
    if (urlId !== 'empty') {
      setRecipeId(urlId)
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
          showCreateForm={showCreateForm}
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
        {recipeId ? (
          // Renders if recipeId is set
          <RecipeDetails recipeId={recipeId} />
        ) : null}
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
