import { Link } from 'react-router-dom'

const Header = ({ handleLogout }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/profile">Profile</Link>
      <Link id="push-left" to="/about">
        About
      </Link>
      <Link to="/recipes">Recipes</Link>
      <Link to="/pantry">Pantry</Link>
      <button onClick={handleLogout}>Log Out</button>
    </nav>
  )
}

export default Header
