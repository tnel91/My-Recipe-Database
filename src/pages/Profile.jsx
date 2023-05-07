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
        email: res.data.email,
        username: res.data.username
      })
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return user ? (
    <div className="row">
      <section className="col-6">
        <h3>Account Settings</h3>
        <div className="flex">
          <button>Settings</button>
          <button>Change Email</button>
          <button>Change Password</button>
        </div>
      </section>
      <section className="col-6">
        <div id="changeSettings">Settings</div>
        <div id="changeEmail">email</div>
        <div id="changePassword">password</div>
      </section>
    </div>
  ) : (
    <div>
      <AuthError />
    </div>
  )
}

export default Profile
