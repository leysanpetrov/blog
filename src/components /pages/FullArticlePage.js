import React from "react"
import { useParams } from 'react-router-dom';
import FullArticle from '../FullArticle/FullArticle'


const FullArticlePage = () => {
  const params = useParams();
  return (
    <FullArticle
      slug={ params.slug }
    />
  )
}

export default FullArticlePage