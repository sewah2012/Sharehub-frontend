import './styles/ProfileSection.css'
import React, { useContext, useState } from 'react'
import { Avatar, Button, IconButton, Tooltip } from '@mui/material'
import { AppContext } from '../states/AppContext'
import { Link } from 'react-router-dom'
import { Edit, LockReset, ResetTv } from '@mui/icons-material'
import EditProfile from '../pages/EditProfile/EditProfile'
import ResetPassword from './ResetPassword'


const ProfileSection = ({openEditProfileModal, setOpenEditProfileModal, resetPopup, openResetPopup}) => {
  const [{currentUserDetails}, dispatch] = useContext(AppContext);
  return (
    <div className='profileSection'>
      <Avatar alt={currentUserDetails.firstName} src={currentUserDetails?.imageUrl?.attachmentUrl} sx={{ height: '70px', width: '70px' }}/>
      <div className="profileSection__content">
        <h4>@{currentUserDetails.username}</h4>
        <p>{currentUserDetails.email}</p>
        <p>{currentUserDetails.address}</p>
      </div>

      <div className="profileSection__actions">
        <IconButton onClick={()=>setOpenEditProfileModal(!openEditProfileModal)}>
          <Tooltip title="Edit Profile">
            <Edit />
          </Tooltip>
          
        </IconButton>

        <IconButton onClick={openResetPopup}>
          <Tooltip title="Reset Password">
          <LockReset />
          </Tooltip>
        </IconButton>

      </div>

    <EditProfile openEditProfileModal={openEditProfileModal} setOpenEditProfileModal={setOpenEditProfileModal} currentUserDetails={currentUserDetails}/>
    <ResetPassword openResetPopup={resetPopup} handleClose={openResetPopup} />
    </div>
  )
}

export default ProfileSection