import articleFactory from '../Factory/Factory'

export default class BlogServices {

  // _apiBase = 'https://kata.academy:8021/api'
  _apiBase = 'https://api.realworld.io/api'

  getResource = async (path) => {
    const fullWay = `${this._apiBase}${path}`

    const res = await fetch(fullWay)

    if (!res.ok) {
      throw new Error(`Could not fetch ${fullWay}, received ${res.status}`)
    }

    return res.json()
  }

  getArticles = async (pageSize, page) => {
    const res = await this.getResource(`/articles?limit=${page}&offset=${pageSize}`)
    return {
      articles: res.articles.map(articleFactory),
      articlesCount: res.articlesCount
    }
  }

  getArticle = async (id) => {
    const res = await this.getResource(`/articles/${id}`)
    return {
      slug: res.article.slug,
      userName: res.article.author.username,
      avatar: res.article.author.image,
      createdAt: res.article.createdAt,
      tagList: res.article.tagList,
      title: res.article.title,
      body: res.article.body,
      description: res.article.description
    }
  }

  postResource = async (path, data) => {
    const fullWay = `${this._apiBase}${path}`

    const res = await fetch(fullWay, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${fullWay}, received ${res.status}`)
    }

    return res.json()
  }

  putResource = async (path, data) => {
    const fullWay = `${this._apiBase}${path}`

    const res = await fetch(fullWay, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${data.user.token}`
      },
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${fullWay}, received ${res.status}`)
    }
    return res.json()
  }

  // headers: {
  //   'Content-Type': 'application/json;charset=utf-8',
  //   'Authorization': `Token ${token}`
  // },

  postResourceArticle = async (path, data, token) => {
    const fullWay = `${this._apiBase}${path}`

    const res = await fetch(fullWay, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      throw new Error(`Could not fetch ${fullWay}, received ${res.status}`)
    }
    return res.json()
  }

}

// const blogServices = new BlogServices()
//
// blogServices.postResource('/users', {
//   user: {
//     username: data.userName,
//     email: 'leyd13qs@madqil.com',
//     password: '1q2w3ehu'
//   }
// }).then((res) => console.log(res))




