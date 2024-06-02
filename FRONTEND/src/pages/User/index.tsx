import React, { useEffect, useState } from 'react'
import { IUser } from '../../interfaces/User'
import { fetchUser } from '../../services/UserService'
const User: React.FC = () => {
  const [user, setUser] = useState<IUser>({ id: '', name: '', email: '' })

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUser()
        setUser(userData)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    loadUser()
  }, [])

  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  )
}

export default User
