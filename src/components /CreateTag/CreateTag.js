import React from 'react'
import classes from './CreateTag.module.scss'

const CreateTag = ({ id, register }) => {

  return (
    <input className={ classes.tag}
           {...register(`Tag.Tag[${id}]`, {
             required: true,
           })}
           placeholder={'Tag'}
    />
  )
}

export default CreateTag