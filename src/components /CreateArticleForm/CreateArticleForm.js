import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import classes from './CreateArticleForm.module.scss'
import BlogServices from '../../Services/BlogServices'
import { onSubmitCreateArticle } from '../../actions/actions'
import { connect } from 'react-redux'
import compose from '../../utils/compose'
import withBlogServices from '../hoc/withBlogServices'
import { BlogList } from '../BlogList/BlogList'
import CreateTagList from '../CreateTagList/CreateTagList'
import { v4 as uuidv4 } from 'uuid'

const blogServices = new BlogServices()

const CreateArticleForm = ({ token, BlogServices, onSubmitCreateArticle }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm()

  const [tags, setTags] = useState([{ tag: '', id: uuidv4() }, { tag: '', id: uuidv4() }])

  const onDeleteHandler = (id) => {
    const idx = tags.findIndex((el) => el.id === id)
    const newTagList = [...tags.slice(0, idx), ...tags.slice(idx + 1)]
    setTags(newTagList)
  }

  const addTag = () => {
    const newTag = {
      tag: '',
      id: uuidv4()
    }
    const newTagList = [...tags, newTag]
    setTags(newTagList)
  }

  const password = useRef({})
  password.current = watch('Password', '')

  const onSubmit = (data) => {

    reset()

    onSubmitCreateArticle(BlogServices, data, token)

    blogServices.postResourceArticle('/articles', {
      article: {
        title: data.Title,
        description: data.ShortDescription,
        body: data.Text,
        tagList: Object.values(data.Tag.Tag)
      }
    }, token).then((data) => console.log(data))

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.formItem}>
        <label>
          Title
          <input className={errors?.Title ? classes.inputError : null}
                 {...register('Title', {
                   required: true,
                 })}
                 placeholder={'Title'}
          />
        </label>
        <div>
          {errors?.Title && <p>Поле обязательно к заполнению</p>}
        </div>
      </div>
      <div className={classes.formItem}>
        <label>
          Short description
          <input className={errors?.ShortDescription ? classes.inputError : null}
                 {...register('ShortDescription', {
                   required: true,
                 })}
                 placeholder={'Short description'}
          />
        </label>
        <div>
          {errors?.ShortDescription && <p>Поле обязательно к заполнению</p>}
        </div>
      </div>
      <div className={classes.formItem}>
        <label>
          Text
          <textarea className={errors?.Text ? classes.inputError + ' ' + classes.text : classes.text}
                    {...register('Text', {
                      required: true,
                    })}
                    placeholder={'Text'}
          />
        </label>
        <div>
          {errors?.Text && <p>Поле обязательно к заполнению</p>}
        </div>
      </div>
      <div className={classes.formItem}>
        <label>
          Tag
          <div className={classes.formItemTag}>
            <CreateTagList
              tags={tags}
              register={register}
              onDelete={onDeleteHandler}
            />
            <button type="button"
                    className={classes.tagAdd}
                    onClick={addTag}
            >
              Add tag
            </button>
          </div>
        </label>
        <div>
          {errors?.Tag && <p>'Поле обязательно к заполнению</p>}
        </div>
      </div>
      <div className={classes.formItem}>
        <input className={classes.submit} type="submit" value="Send"/>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => {
  return ({
      userName: state.userName,
      token: state.token,
      userAvatar: state.userAvatar
    }
  )
}

export default compose(
  withBlogServices(),
  connect(mapStateToProps, {onSubmitCreateArticle})
)(CreateArticleForm)



