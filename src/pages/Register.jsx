import { useState } from 'react'

const Register = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    passwordMatch: ''
  })

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleRegister = (event) => {
    event.preventDefault()
    console.log(formState)
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
