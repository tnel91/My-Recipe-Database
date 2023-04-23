import axios from 'axios'
import { BASE_URL } from '../globals'

export const registerUser = async (formState) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, formState)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const loginUser = async (formState) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, formState)
    localStorage.setItem('token', response.data.token)
    return response.data.user
  } catch (error) {
    throw error.response.data
  }
}
