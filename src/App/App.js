import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogListPage from '../components /pages/BlogListPage'
import FullArticlePage from '../components /pages/FullArticlePage'
import Layout from '../components /Layout/Layout'
import SingUpPage from '../components /pages/SingUpPage'
import SingInPage from '../components /pages/SingInPage'
import EditProfilePage from '../components /pages/EditProfilePage'
import CreateArticlePage from '../components /pages/CreateArticlePage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<BlogListPage/>}/>
          <Route path=":slug" element={<FullArticlePage/>}/>
          <Route path="sing-up" element={<SingUpPage/>}/>
          <Route path="sing-in" element={<SingInPage/>}/>
          <Route path="profile" element={<EditProfilePage/>}/>
          <Route path="new-article" element={<CreateArticlePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
