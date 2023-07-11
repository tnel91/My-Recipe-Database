import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { CheckSession } from '../services/auth'
import Header from '../features/header/Header'
import Landing from '../features/landing/Landing'
import About from '../features/about/About'
import RecipeList from '../features/recipes/RecipeList'
import Pantry from '../features/pantry/Pantry'
import Login from '../features/login/Login'
import Register from '../features/register/Register'
import Profile from '../features/profile/Profile'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, clearUser, selectUser } from '../services/userSlice'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const handleLogout = () => {
    dispatch(clearUser())
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    if (user) {
      dispatch(setUser(user))
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <Header handleLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Landing user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipes/:urlId" element={<RecipeList user={user} />} />
          <Route path="/pantry" element={<Pantry user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
