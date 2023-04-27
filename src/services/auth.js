import { BASE_URL } from '../globals'
import Client from './api'

export const registerUser = async (formState) => {
  try {
    const response = await Client.post(`${BASE_URL}/register`, formState)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const loginUser = async (formState) => {
  try {
    const response = await Client.post(`${BASE_URL}/login`, formState)
    localStorage.setItem('token', response.data.token)
    return response.data.user
  } catch (error) {
    throw error.response.data
  }
}

export const CheckSession = async () => {
  try {
    const res = await Client.get('/session')
    return res.data
  } catch (error) {
    throw error
  }
}
