import React from 'react'
import classes from '../Tag/Tag.module.scss'

const Tag = ({ tag }) => {
  return (
    <div className={classes.tag} >{tag}</div>
  )
}

export default Tag