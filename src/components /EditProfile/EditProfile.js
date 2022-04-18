import React from 'react'
import classes from './EditProfile.module.scss'
import EditProfileForm from '../EditProfileForm/EditProfileForm'

const EditProfile = () => {
  return (
    <div className={classes.container} >
      <h1 className={classes.header}>Edit Profile</h1>
      <EditProfileForm className={classes.containerForm} />
    </div>
  )
}

export default EditProfile