import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Client from '../services/api'

const Profile = () => {
  const { id } = useParams()
  useEffect(() => {
    console.log(id)
  }, [])

  return (
    <div>
      <p>Profile</p>
    </div>
  )
}

export default Profile
