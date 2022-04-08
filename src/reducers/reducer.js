
const rememberUser = (key) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null
};

const initialState = {
  articles: [],
  loading: true,
  articlesCount: null,
  pageSize: 1,
  page: 0,
  error: null,
  description: null,
  email: rememberUser("email"),
  userName: rememberUser("userName"),
  token: rememberUser("token"),
  userAvatar: rememberUser("userAvatar"),
  bio: null,

  titleCreateArticle: null,
  descriptionCreateArticle: null,
  bodyCreateArticle: null,
  tagListCreateArticle: null,
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_ARTICLES_REQUEST':
      return {
        ...state,
        error: null
      }
    case "FETCH_ARTICLES_SUCCESS":
      return {
        ...state,
        articles: action.loadedArticle,
        articlesCount: action.articlesCount,
        error: null
      }
    case 'FETCH_ARTICLES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.loadedError
      }
    case 'LOADING_IS_COMPLETE':
      return {
        ...state,
        loading: false
      }
    case 'PAGE_IS_CHANGE':
      return {
        ...state,
        page: action.page,
    }
    case 'SING_IN':
      return {
        ...state,
        userName: action.userName,
        token: action.token,
        userAvatar: action.userAvatar,
        bio: action.bio
      }
    case 'SING_UP':
      return {
        ...state,
        userName: action.userName,
        token: action.token,
        userAvatar: action.userAvatar,
        bio: action.bio
      }
    case 'LOG_OUT':
      return {
        ...state,
        userName: null,
        token: null,
        userAvatar: null,
        bio: null
      }
    case 'EDIT_PROFILE':
      return {
        ...state,
        token: action.token,
        userName: action.userName,
        userAvatar: action.userAvatar,
        email: action.email,
        bio: action.bio
      }
    case 'CREATE_ARTICLE':
      return {
        ...state,
        titleCreateArticle: action.title,
        descriptionCreateArticle: action.description,
        bodyCreateArticle: action.body,
        tagListCreateArticle: action. tagList,
      }
    default:
      return state
  }
}

export default reducer