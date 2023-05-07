import { useEffect, useState } from 'react'
import Client from '../services/api'
import AuthError from '../components/AuthError'

const Profile = ({ user }) => {
  const [userProfile, setUserProfile] = useState({
    email: ''
  })

  const getUser = async () => {
    try {
      let res = await Client.get('/user')
      console.log(res.data)
      setUserProfile({
        email: res.data.email
      })
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return user ? (
    <div>
      <h2>Profile</h2>
      <p>
        <b>Email: </b>
        {userProfile.email}
      </p>
    </div>
  ) : (
    <div>
      <AuthError />
    </div>
  )
}

export default Profile
