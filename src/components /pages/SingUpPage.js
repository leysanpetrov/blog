import React from "react"
import classes from './Page.module.scss'
import SingUp from '../SingUp/SingUp'

const SingUpPage = () => {
  return (
    <div className={classes.container}>
    <SingUp/>
    </div>
  )
}

export default SingUpPage