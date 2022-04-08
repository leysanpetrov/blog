import React from "react"
import classes from './Page.module.scss'
import CreateArticle from '../CreateArticle/CreateArticle'

const CreateArticlePage = () => {
  return (
    <div className={classes.containerArticle}>
      <CreateArticle/>
    </div>
  )
}

export default CreateArticlePage