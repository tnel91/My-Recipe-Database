import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/auth'

const Register = () => {
  let navigate = useNavigate()

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    passwordMatch: ''
  })

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    if (formState.password === formState.passwordMatch) {
      let res = await registerUser(formState)
      console.log(res)
      navigate('/login')
    } else {
      console.log('passwords do not match!')
    }
  }

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handleRegister}>
        <div>
          <input
            id="registerUsername"
            placeholder="username"
            name="username"
            type="username"
            onChange={handleChange}
            required
          ></input>
          <label htmlFor="registerUsername">username</label>
        </div>
        <div>
          <input
            id="registerEmail"
            placeholder="email"
            name="email"
            type="email"
            onChange={handleChange}
            required
          ></input>
          <label htmlFor="registerEmail">email</label>
        </div>
        <div>
          <input
            id="registerPassword"
            placeholder="password"
            name="password"
            type="password"
            onChange={handleChange}
            autoComplete="new-password"
            required
          ></input>
          <label htmlFor="registerPassword">password</label>
        </div>
        <div>
          <input
            id="registerPasswordMatch"
            placeholder="confirm password"
            name="passwordMatch"
            type="password"
            onChange={handleChange}
            autoComplete="new-password"
            required
          ></input>
          <label htmlFor="registerPasswordMatch">confirm password</label>
        </div>
        <br />
        <br />
        <button type="submit">register</button>
      </form>
    </div>
  )
}

export default Register
