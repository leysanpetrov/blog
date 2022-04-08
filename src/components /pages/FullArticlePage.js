import React from "react"
import FullArticle from '../FullArticle/FullArticle'
import { useParams } from 'react-router-dom';


const FullArticlePage = () => {
  let params = useParams();
  return (
    <FullArticle
      slug={ params.slug }
    />
  )
}

export default FullArticlePage