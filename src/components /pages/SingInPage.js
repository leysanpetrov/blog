import React from "react"
import classes from './Page.module.scss'
import SingIn from '../SingIn/SingIn'

const SingInPage = () => {
  return (
    <div className={classes.container}>
      <SingIn/>
    </div>
  )
}

export default SingInPage