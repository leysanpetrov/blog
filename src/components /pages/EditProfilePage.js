import React from "react"
import classes from './Page.module.scss'
import EditProfile from '../EditProfile/EditProfile'

const EditProfilePage = () => {
  return (
    <div className={classes.container}>
      <EditProfile/>
    </div>
  )
}

export default EditProfilePage