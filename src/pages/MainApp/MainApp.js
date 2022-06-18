import './styles/MainApp.css'
import React, { useContext } from 'react'
import { AppContext } from '../../states/AppContext'
import MainAppBar from '../../components/MainAppBar'
import AddExperience from '../../components/AddExperience'

const MainApp = () => {
  // const [{currentUser}] = useContext(AppContext)
  // console.log(currentUser)
  return (
    <div className='mainApp'>
      <MainAppBar />
    <section className='mainApp__midSection'>
      <AddExperience />
    </section>
    // footer
    </div>
  )
}

export default MainApp