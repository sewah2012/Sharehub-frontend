import './styles/MidSection.css'
import React from 'react'
import Experience from './Experience'

const MidSection = () => {
  return (
    <div className='midSection'>
        <div className='midSection__filter'>
            <h1>Latest Shared experience</h1>
        </div>
        <div className='mid_ection__experienceList'>
            <Experience />
        </div>
    </div>
  )
}

export default MidSection