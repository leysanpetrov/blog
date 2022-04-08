import React, { useEffect, useState } from 'react'
import classes from './FullArticle.module.scss'
import Article from '../Article/Article'
import BlogServices from '../../Services/BlogServices'
import Spinner from '../Spinner/Spinner'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'


const blogServices = new BlogServices();

const FullArticle = ({ slug }) => {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    blogServices.getArticle(slug)
      .then((article) => {
        setArticle(article)
        setLoading(false)
      })
      .catch(() => setError(true))
  },[slug])

  return (

    <div className={classes.containerArticle}>
      {loading ? <Spinner /> :  <Article
        slug={article.slug}
        title={article.title}
        tagList={article.tagList}
        description={article.description}
        body={article.body}
        avatar={article.avatar}
        createdAt={article.createdAt}
        userName={article.userName}
      />}
      {loading ? <Spinner /> : <div className={classes.fullBody}>{article.body}</div>}
      {error ? <ErrorIndicator /> : null}
    </div>
  )
}

export default FullArticle