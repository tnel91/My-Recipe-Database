import { useState } from 'react'
import { loginUser } from '../services/auth'
import { useNavigate } from 'react-router-dom'

const Login = ({ setUser }) => {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginUser(formState)
    setUser(user)
    navigate(`/profile`)
  }

  return (
    <div>
      <h3>Sign In</h3>
      <form onSubmit={handleLogin}>
        <div>
          <input
            id="loginEmail"
            placeholder="email"
            name="email"
            type="email"
            autoComplete="email"
            onChange={handleChange}
            required
          ></input>
          <label htmlFor="loginEmail">email address</label>
        </div>
        <div>
          <input
            id="loginPassword"
            placeholder="password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
            required
          ></input>
          <label htmlFor="loginPassword">password</label>
        </div>
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
