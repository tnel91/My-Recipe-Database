import { useEffect, useState } from 'react'
import Client from '../../services/api'
import AuthError from '../errors/AuthError'

const Profile = ({ user }) => {
  const [userProfile, setUserProfile] = useState({
    email: '',
    username: ''
  })

  const getUser = async () => {
    try {
      let res = await Client.get('/user')
      // console.log(res.data)
      setUserProfile({
        email: res.data.email,
        username: res.data.username
      })
    } catch (error) {
      throw error
    }
  }
  const toggles = document.getElementsByClassName('settings__toggle')

  const handleClick = (event) => {
    let target = event.currentTarget.getAttribute('name')
    for (let i = 0; i < toggles.length; i++) {
      if (toggles[i].getAttribute('name') === target) {
        toggles[i].classList.add('clicked')
      } else {
        toggles[i].classList.remove('clicked')
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return user ? (
    <div className="row">
      <section className="col-3">
        <h3>Account Settings</h3>
        <div className="row">
          <div
            className="settings__toggle clicked"
            onClick={handleClick}
            name="A"
          >
            <h5>Change Settings</h5>
          </div>
          <div className="settings__toggle" onClick={handleClick} name="B">
            <h5>Change Email</h5>
          </div>
          <div className="settings__toggle" onClick={handleClick} name="C">
            <h5>Change Password</h5>
          </div>
        </div>
      </section>
      <section className="col-9">
        <div id="changeSettings" style={{ display: '' }}>
          Settings
        </div>
        <div id="changeEmail" style={{ display: 'none' }}>
          Email
        </div>
        <div id="changePassword" style={{ display: 'none' }}>
          Password
        </div>
      </section>
    </div>
  ) : (
    <div>
      <AuthError />
    </div>
  )
}

export default Profile
