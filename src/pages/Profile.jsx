import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import Client from '../services/api'

const Profile = () => {
  // const { id } = useParams()

  const getUser = async () => {
    try {
      let res = await Client.get('/user')
      console.log(res.data)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div>
      <p>Profile</p>
    </div>
  )
}

export default Profile
