import React from 'react'
import Tag from '../Tag/Tag'
import classes from './TagList.module.scss'


const TagList = ({tagList}) => {
  const AllTags = tagList.map((tag, index) => {
  return (
    <li className={classes.tag}
        key={index}
    >
      <Tag tag={tag}/>
    </li>
  )
  }
)

return (
    <ul className={classes.tags}>
      {AllTags}
    </ul>
  )
}

export default TagList