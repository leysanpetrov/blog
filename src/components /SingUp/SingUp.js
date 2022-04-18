import { NavLink } from 'react-router-dom'
import React from 'react'
import classes from './SingUp.module.scss'
import SingUpForm from '../SingUpForm/SingUpForm'

const SingUp = () => {
  return (
    <div className={classes.container} >
      <h1 className={classes.header}>Create new account</h1>
      <SingUpForm className={classes.containerForm} />
      <div className={classes.footer}>Already have an account? <NavLink to="/Sign-up">Sign In.</NavLink></div>
    </div>
  )
}

export default SingUp