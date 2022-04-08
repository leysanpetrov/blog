import classes from './SingIn.module.scss'
import { NavLink } from 'react-router-dom'
import React from 'react'
import SingInForm from '../SingInForm/SingInForm'

const SingIn = () => {
  return (
    <div className={classes.container} >
      <h1 className={classes.header}>Create new account</h1>
      <SingInForm className={classes.containerForm} />
      <div className={classes.footer}>Don’t have an account?<NavLink to="/Sign-up"> Sign Up.</NavLink></div>
    </div>
  )
}

export default SingIn