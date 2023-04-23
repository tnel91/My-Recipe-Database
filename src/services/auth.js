import axios from 'axios'

const Base_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api'

export const registerUser = async (formState) => {
  try {
    const response = await axios.post(`${Base_URL}/register`, formState)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const loginUser = async (formState) => {
  try {
    const response = await axios.post(`${Base_URL}/login`, formState)
    localStorage.setItem('token', response.data.token)
    return response.data.user
  } catch (error) {
    throw error.response.data
  }
}
