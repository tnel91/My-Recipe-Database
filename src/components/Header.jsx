import { Link } from 'react-router-dom'

const Header = ({ handleLogout }) => {
  const logOut = () => {
    handleLogout()
    console.log('logged out')
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link id="push-left" to="/about">
        About
      </Link>
      <Link to="/recipes/empty">Recipes</Link>
      <Link to="/pantry">Pantry</Link>
      <Link to="/" onClick={logOut}>
        Log Out
      </Link>
    </nav>
  )
}

export default Header
