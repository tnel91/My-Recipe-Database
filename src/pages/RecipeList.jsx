import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../globals'
import AuthError from '../components/AuthError'
import RecipeSearch from '../components/RecipeSearch'
import RecipeCard from '../components/RecipeCard'
import RecipeDetails from './RecipeDetails'

const RecipeList = ({ user }) => {
  let navigate = useNavigate()

  const [recipes, setRecipes] = useState([])

  const [searchQuery, setSearchQuery] = useState({
    searchType: 'Name',
    query: ''
  })

  const [selectedRecipe, setSelectedRecipe] = useState('')

  const getRecipes = async () => {
    await axios
      .get(`${BASE_URL}/recipes`)
      .then((response) => {
        setRecipes(response.data)
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
    setSelectedRecipe(id)
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
    getRecipes()
  }, [])

  return user ? (
    <div className="row">
      <h2>Recipe Database</h2>
      <section className="col-4">
        <RecipeSearch
          handleChange={handleChange}
          query={searchQuery.query}
          handleSubmit={handleSubmit}
          showCreateForm={showCreateForm}
        />
        {resultList}
      </section>
      <section className="col-8">
        <RecipeDetails selectedRecipe={selectedRecipe} />
      </section>
    </div>
  ) : (
    <div>
      <AuthError />
    </div>
  )
}

export default RecipeList
