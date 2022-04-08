import React from 'react'
import classes from './CreateTagList.module.scss'
import CreateTag from '../CreateTag/CreateTag'
import { v4 as uuidv4 } from 'uuid';

const CreateTagList = ({ tags, register, onDelete }) => {

  const AllTags = tags.map((tag) => {
      return (
        <li className={classes.tag}
            key={tag.id}
        >
          <CreateTag id={tag.id}
                     register={register}
          />
          <button type='button' className={classes.tagDelete}
                  onClick={() => onDelete(tag.id)}
          >
            Delete
          </button>
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

export default CreateTagList