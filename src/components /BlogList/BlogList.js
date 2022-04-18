import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'antd'
import classes from './BlogList.module.scss'
import { fetchArticles, changePage } from '../../actions/actions'
import compose from '../../utils/compose'
import withBlogServices from '../hoc/withBlogServices'
import Article from '../Article/Article'
import Spinner from '../Spinner/Spinner'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'

const BlogList = ({
  loading, error, BlogServices, articles, page, articlesCount,
  pageSize, fetchArticles, changePage
}) => {

  useEffect(() => {
    fetchArticles(BlogServices, page, pageSize)
  }, [page, pageSize])

  const articlesList = articles
    .map((article) => {
      return (
        <li
          className={classes.article}
          key={article.slug}
        >
          <div className={classes.containerArticle}>
            <Article
              slug={article.slug}
              title={article.title}
              tagList={article.tagList}
              description={article.description}
              body={article.body}
              avatar={article.avatar}
              createdAt={article.createdAt}
              userName={article.userName}
            />
          </div>
        </li>
      )
    })
  return (
    <div>
      <ul className={classes.articleList}>
        {loading ? <Spinner/> : null}
        {error ? <ErrorIndicator/> : null}
        {articlesList}
      </ul>
      {loading || error ? null : <Pagination className={classes.pagination}
                                             defaultCurrent={1}
                                             total={articlesCount}
                                             size="small"
                                             pageSize={pageSize}
                                             page={page}
                                             onChange={changePage}/>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return ({
      articles: state.articles,
      articlesCount: state.articlesCount,
      page: state.page,
      pageSize: state.pageSize,
      loading: state.loading,
      error: state.error,
    }
  )
}

export default compose(
  withBlogServices(),
  connect(mapStateToProps, { fetchArticles, changePage })
)(BlogList)


