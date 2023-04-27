import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import RecipeList from './pages/RecipeList'
import RecipeForm from './pages/RecipeForm'
import RecipeDetails from './pages/RecipeDetails'
import Pantry from './pages/Pantry'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'

const App = () => {
  useEffect(() => {})

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route
            path="/recipes/form"
            element={
              <RecipeForm heading="Create New Recipe" submit="Create Recipe" />
            }
          />
          <Route
            path="/recipes/form/:recipeId"
            element={
              <RecipeForm
                updateForm="true"
                heading="Update Recipe"
                submit="Update Recipe"
              />
            }
          />
          <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
