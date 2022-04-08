const articleFactory = (article) => ({
  slug: article.slug,
  userName: article.author.username,
  avatar: article.author.image,
  createdAt: article.createdAt,
  tagList: article.tagList,
  title: article.title,
  body: article.body,
  description: article.description
})

export default articleFactory