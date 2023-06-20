import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../globals'
import AuthError from '../errors/AuthError'
import RecipeSearch from './RecipeSearch'
import RecipeCard from './RecipeCard'
import RecipeDetails from '../recipeDetails/RecipeDetails'
import { Provider } from 'react-redux'

const RecipeList = ({ user }) => {
  let { urlId } = useParams()
  let navigate = useNavigate()

  const [recipes, setRecipes] = useState([])

  const [searchQuery, setSearchQuery] = useState({
    searchType: 'Name',
    query: ''
  })

  const [recipeId, setRecipeId] = useState('')

  const initialState = []

  const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'recipes/setRecipes': {
        return [action.payload]
      }
      default: {
        return state
      }
    }
  }

  const getRecipes = async () => {
    await axios
      .get(`${BASE_URL}/recipes`)
      .then((response) => {
        setRecipes(response.data)
        const recipeSet = {
          type: 'recipes/setRecipes',
          payload: response.data
        }
        recipesReducer(recipeSet)
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
      await axios
        .get(`${BASE_URL}/recipe_search_by_name/${searchQuery.query}`)
        .then((response) => {
          setRecipes(response.data)
          setSearchQuery({ ...searchQuery, query: '' })
        })
        .catch((error) => {
          console.log(error)
        })
    }
    if (searchQuery.searchType === 'Ingredients') {
      await axios
        .get(`${BASE_URL}/recipe_search_by_ingr/${searchQuery.query}`)
        .then((response) => {
          setRecipes(response.data)
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

  let resultList
  if (recipes.length > 0) {
    resultList = (
      <section className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe._id}>
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
    )
  } else {
    resultList = <h3>No Results!</h3>
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
    <div className="container-fluid row">
      <h2 className="col-12">Recipe Database</h2>
      <section className="col-3 col-xs-4">
        <RecipeSearch
          handleChange={handleChange}
          query={searchQuery.query}
          handleSubmit={handleSubmit}
          showCreateForm={showCreateForm}
        />
        {resultList}
      </section>
      <section className="">
        {recipeId ? <RecipeDetails recipeId={recipeId} /> : null}
      </section>
    </div>
  ) : (
    <div>
      <AuthError />
    </div>
  )
}

export default RecipeList
