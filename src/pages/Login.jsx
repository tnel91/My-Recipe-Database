import { useState } from 'react'
import axios from 'axios'

const Base_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api'

const Login = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(formState)
    await axios
      .post(`${Base_URL}/login`, formState)
      .then((response) => {
        console.log(response.data)
        console.log('logged in')
      })
      .catch((error) => {
        alert(error.response.data)
      })
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
