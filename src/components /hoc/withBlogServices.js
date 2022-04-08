import React from 'react'
import { BlogServicesConsumer } from '../blogServicesContext/blogServicesContext'

const withBlogServices = () => (Wrapped) => {
  return (props) => {
    return (
      <BlogServicesConsumer>
        {
          (BlogServices) => {
            return (<Wrapped {...props}
                     BlogServices={BlogServices}
            />)
          }
        }
      </BlogServicesConsumer>
    )
  }
}

export default withBlogServices