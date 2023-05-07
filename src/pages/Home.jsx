import { useNavigate } from 'react-router-dom'

const Home = ({ user }) => {
  let navigate = useNavigate()

  const handleNavigate = () => {
    if (user) {
      navigate('recipes')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="home">
      <div className="home-div">
        <h1>My Recipe Database</h1>
        <h3>Welcome!</h3>
        <button className="button" onClick={handleNavigate}>
          Login/Enter
        </button>
        <button
          className="button"
          onClick={() => {
            navigate('/register')
          }}
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default Home
