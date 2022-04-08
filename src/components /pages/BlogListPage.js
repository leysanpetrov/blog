import React from "react"
import BlogList from '../BlogList/BlogList'
import { useParams } from 'react-router-dom';


const BlogListPage = ( ) => {
  // let params = useParams();
  return (
    <BlogList
      // slug={ params.slug }
    />
  )
}

export default BlogListPage