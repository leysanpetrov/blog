import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import classes from './layout.module.scss'

const Layout = () => {

  return (
    <React.Fragment>
      <Header/>
      <div className={classes.container}>
        <Outlet/>
      </div>
    </React.Fragment>
  )
}

export default Layout