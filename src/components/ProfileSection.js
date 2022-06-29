import './styles/ProfileSection.css'
import React, { useContext } from 'react'
import { Avatar, Button } from '@mui/material'
import { AppContext } from '../states/AppContext'


const ProfileSection = () => {
  const [{currentUserDetails}, dispatch] = useContext(AppContext);
  return (
    <div className='profileSection'>
      <Avatar alt={currentUserDetails.firstName} src={currentUserDetails?.imageUrl?.attachmentUrl} sx={{ height: '70px', width: '70px' }}/>
      <div className="profileSection__content">
        <h4>@Admin</h4>
        <p>sewah2012@gmail.com</p>
        <p>Morocco</p>
      </div>

      <div className="profileSection__actions">
        <Button variant = "outlined">Edit Profile</Button>
        <Button variant = "outlined">Reset Password</Button>

      </div>

    </div>
  )
}

export default ProfileSection