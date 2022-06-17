import React, { useContext } from 'react'
import { AppContext } from '../../states/AppContext'

const MainApp = () => {
  const [{currentUser}] = useContext(AppContext)
  console.log(currentUser)
  return (
    <h1>Welcome {currentUser.sub}</h1>
  )
}

export default MainApp