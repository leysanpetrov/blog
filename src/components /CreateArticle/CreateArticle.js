import classes from './CreateArticle.module.scss'
import React from 'react'
import CreateArticleForm from '../CreateArticleForm/CreateArticleForm'

const CreateArticle = () => {
  return (
    <div className={classes.container} >
      <h1 className={classes.header}>Create new article</h1>
      <CreateArticleForm className={classes.containerForm} />
    </div>
  )
}

export default CreateArticle