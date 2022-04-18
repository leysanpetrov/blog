import React from 'react'
import { Remarkable } from 'remarkable';
import { Link } from "react-router-dom"
import classes from './Article.module.scss'
import TagList from '../TagList/TagList'

const Article = ({title, tagList, description, avatar, createdAt, userName, slug }) => {

  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
  }

  // const cutText = (text, limit) => {
  //   if (text.length <= limit) return text
  //
  //   const shortcutText = text.slice(0, limit)
  //   const lastSpace = shortcutText.lastIndexOf(' ')
  //
  //   return `${shortcutText.substring(0, lastSpace)}...`
  // }

  const md = new Remarkable();

  const getRawMarkup = (text) => {
    return { __html: md.render(text) };
  }

  const date = `${months[new Date(createdAt).getMonth()]} ${new Date(createdAt).getDate()}, ${new Date(createdAt).getFullYear()}` ;

  return (
    // <div className={classes.container}>
    <React.Fragment>
      <div className={classes.containerForArticle}>
        <div className={classes.title}>
          <Link to={`/${slug}`} > {title} </Link>
        </div>
        <TagList tagList={ tagList } />
        {/* <div className={classes.body}> { cutText(body, 600)} </div> */}
        <div className={classes.body}
            dangerouslySetInnerHTML={getRawMarkup(description)}
         />

      </div>
      <div className={classes.containerForUser}>
        <div className={classes.userCreateAt}>
          <div className={classes.userName}>{userName}</div>
          <div className={classes.createdAt}>{date}</div>
        </div>
        <img alt="Avatar"
             className={classes.avatar}
             src={avatar}/>
      </div>
    {/* // </div> */}
</React.Fragment>
  )
}

export default Article