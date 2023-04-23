import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link id="push-left" to="/about">
        About
      </Link>
      <Link to="/recipes">Recipes</Link>
      <Link to="/pantry">Pantry</Link>
    </nav>
  )
}

export default Header
