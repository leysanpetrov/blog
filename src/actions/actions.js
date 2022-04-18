const articleRequested = () => ({
  type: 'FETCH_ARTICLES_REQUEST',
});

const articleLoaded = (newArticles) => ({
  type: 'FETCH_ARTICLES_SUCCESS',
  loadedArticle: newArticles.articles,
  articlesCount: newArticles.articlesCount,
});

const articleError = (error) => ({
  type: 'FETCH_ARTICLES_FAILURE',
  loadedError: error,
});

const disableLoader = () => ({
  type: 'LOADING_IS_COMPLETE',
});

const pageIsChange = (page) => ({
  type: 'PAGE_IS_CHANGE',
  page: page - 1,
});

const singUp = (data) => ({
  type: 'SING_UP',
  token: data.user.token,
  userName: data.user.username,
  userAvatar: data.user.image,
  email: data.user.email,
  bio: data.user.bio,
});

const singIn = (data) => ({
  type: 'SING_IN',
  token: data.user.token,
  userName: data.user.username,
  userAvatar: data.user.image,
  email: data.user.email,
  bio: data.user.bio,
});

const logOut = () => ({
  type: 'LOG_OUT',
  token: null,
  userName: null,
  userAvatar: null,
  bio: null,
});

const editProfile = (data) => ({
  type: 'EDIT_PROFILE',
  token: data.user.token,
  userName: data.user.username,
  userAvatar: data.user.image,
  email: data.user.email,
  bio: data.user.bio,
});

const createArticle = (data) => ({
  type: 'CREATE_ARTICLE',
  title: data.article.title,
  description: data.article.description,
  body: data.article.body,
  tagList: data.article.tagList,
});

const fetchArticles = (BlogServices, pageSize, page) => async (dispatch) => {
  dispatch(articleRequested());
  try {
    const response = await BlogServices.getArticles(pageSize, page);
    dispatch(disableLoader());
    dispatch(articleLoaded(response));
  } catch (error) {
    dispatch(disableLoader());
    dispatch(articleError(error));
  }
};

const saveToLocalStorage = (data) => {
  localStorage.setItem('email', JSON.stringify(data.user.email));
  localStorage.setItem('token', JSON.stringify(data.user.token));
  localStorage.setItem('userAvatar', JSON.stringify(data.user.image));
  localStorage.setItem('userName', JSON.stringify(data.user.username));
};

const onSubmitSingUp = (BlogServices, data, navigateToHomePage) => (dispatch) => {
  BlogServices.postResource('/users', {
    user: {
      username: data.UserName,
      email: data.Email,
      password: data.Password,
    },
  }).then((user) => {
    dispatch(singUp(user));
    navigateToHomePage();
    saveToLocalStorage(data);
  });
};

const onSubmitEditProfile = (BlogServices, data, token, bio, navigateToHomePage) => (dispatch) => {
  BlogServices.putResource('/user', {
    user: {
      email: data.Email,
      token,
      username: data.UserName,
      bio,
      password: data.Password,
      image: data.image,
    },
  }).then((res) => {
    dispatch(editProfile(res));
    navigateToHomePage();
    saveToLocalStorage(res);
  });
};

const onSubmitSingIn = (BlogServices, data, navigateToHomePage) => (dispatch) => {
  BlogServices.postResource('/users/login', {
    user: {
      email: data.Email,
      password: data.Password,
    },
  }).then((res) => {
    dispatch(singIn(res));
    navigateToHomePage();
    saveToLocalStorage(res);
  });
};

const onLogOut = () => (dispatch) => {
  dispatch(logOut());
  localStorage.removeItem('token');
  localStorage.removeItem('userAvatar');
  localStorage.removeItem('userName');
  localStorage.removeItem('email');
};

const changePage = (page) => (dispatch) => {
  dispatch(pageIsChange(page));
};

const onSubmitCreateArticle = (BlogServices, data, token) => (dispatch) => {
  BlogServices.postResourceArticle('/articles', {
    article: {
      title: data.Title,
      description: data.ShortDescription,
      body: data.Text,
      tagList: Object.values(data.Tag.Tag),
    },
  }, token).then((res) => {
    dispatch(createArticle(res));
  });
};

export {
  fetchArticles,
  pageIsChange,
  changePage,
  onSubmitSingUp,
  onSubmitSingIn,
  onLogOut,
  onSubmitEditProfile,
  onSubmitCreateArticle,
};
