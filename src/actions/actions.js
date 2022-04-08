const articleRequested = () => ({
  type: 'FETCH_ARTICLES_REQUEST'
})

const articleLoaded = (newArticles) => ({
  type: 'FETCH_ARTICLES_SUCCESS',
  loadedArticle: newArticles.articles,
  articlesCount: newArticles.articlesCount
})

const articleError = (error) => ({
  type: 'FETCH_ARTICLES_FAILURE',
  loadedError: error
})

const disableLoader = () => ({
  type: 'LOADING_IS_COMPLETE'
})

const pageIsChange = (page) => {
  return ({
    type: 'PAGE_IS_CHANGE',
    page: page - 1,
  })
}

const singUp = (data) => {
  return ({
    type: 'SING_UP',
    token: data.user.token,
    userName: data.user.username,
    userAvatar: data.user.image,
    email: data.user.email,
    bio: data.user.bio
  })
}

const singIn = (data) => {
  return ({
    type: 'SING_IN',
    token: data.user.token,
    userName: data.user.username,
    userAvatar: data.user.image,
    email: data.user.email,
    bio: data.user.bio
  })
}

const logOut = () => {
  return ({
    type: 'LOG_OUT',
    token: null,
    userName: null,
    userAvatar: null,
    bio: null
  })
}

const editProfile = (data) => {
  return ({
    type: 'EDIT_PROFILE',
    token: data.user.token,
    userName: data.user.username,
    userAvatar: data.user.image,
    email: data.user.email,
    bio: data.user.bio
  })
}

const createArticle = (data) => {
  return ({
    type: 'CREATE_ARTICLE',
    title: data.article.title,
    description: data.article.description,
    body: data.article.body,
    tagList: data.article.tagList
  })
}

const fetchArticles = (BlogServices, pageSize, page) => async (dispatch) => {
  dispatch(articleRequested())
  try {
    const response = await BlogServices.getArticles(pageSize, page)
    dispatch(disableLoader())
    dispatch(articleLoaded(response))
  } catch (error) {
    dispatch(disableLoader())
    dispatch(articleError(error))
  }
}

const onSubmitSingUp = (BlogServices, data) => (dispatch) => {
  BlogServices.postResource('/users', {
    user: {
      username: data.UserName,
      email: data.Email,
      password: data.Password
    }
  }).then((user) => {
    dispatch(singUp(user))
  })
}


const onSubmitEditProfile = (BlogServices, data, token, bio) => (dispatch) => {
  BlogServices.putResource('/user', {
    user: {
      email: data.Email,
      token: token,
      username: data.UserName,
      bio: bio,
      password: data.Password,
      image: data.image,
    }
  }).then((data) => {

    dispatch(editProfile(data))
    makeLogIn(data)
  })
}

const makeLogIn = (data) => {
  localStorage.setItem("email", JSON.stringify(data.user.email));
  localStorage.setItem("token", JSON.stringify(data.user.token));
  localStorage.setItem("userAvatar", JSON.stringify(data.user.image));
  localStorage.setItem("userName", JSON.stringify(data.user.username));
};

const onSubmitSingIn = (BlogServices, data) => (dispatch) => {
  BlogServices.postResource('/users/login', {
    user: {
      email: data.Email,
      password: data.Password
    }
  }).then((data) => {
      dispatch(singIn(data))
      makeLogIn(data)
    }
  )
}

const onLogOut = () => (dispatch) => {
  dispatch(logOut())
  localStorage.removeItem("token");
  localStorage.removeItem("userAvatar");
  localStorage.removeItem("userName");
  localStorage.removeItem("email");
}

const changePage = (page) => (dispatch) => {
  dispatch(pageIsChange(page))
}

const onSubmitCreateArticle = (BlogServices, data, token) => (dispatch) => {
  BlogServices.postResourceArticle('/articles', {
    article: {
      title: data.Title,
      description: data.ShortDescription,
      body: data.Text,
      tagList: Object.values(data.Tag.Tag)
    }
  }, token).then((data) => {
    dispatch(createArticle(data))
  })
}

export {
  fetchArticles,
  pageIsChange,
  changePage,
  onSubmitSingUp,
  onSubmitSingIn,
  onLogOut,
  onSubmitEditProfile,
  onSubmitCreateArticle
}