import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import classes from './EditProfileForm.module.scss'
import { onSubmitEditProfile } from '../../actions/actions'
import { connect } from 'react-redux'
import compose from '../../utils/compose'
import withBlogServices from '../hoc/withBlogServices'
import { useNavigate } from 'react-router-dom'


const EditProfileForm = ({ BlogServices, onSubmitEditProfile, userName, email, token, bio }) => {

  const navigate = useNavigate()
  const navigateToHomePage = () => navigate(-1)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm()

  const password = useRef({});
  password.current = watch("Password", "");

  const onSubmit = (data) => {
    reset()
    onSubmitEditProfile(BlogServices, data, token, bio, navigateToHomePage)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.formItem}>
        <label>
          UserName
          <input className={errors?.UserName ? classes.inputError : null}
                 {...register('UserName')}
                 value={ userName }
          />
        </label>
        <div>
          {errors?.UserName && <p>{errors?.UserName?.message || 'Поле обязательно к заполнению'}</p>}
        </div>
      </div>
      <div className={classes.formItem}>
        <label>
          Email address
          <input className={errors?.Email ? classes.inputError : null}
                 {...register('Email')}
                 value={ email }
          />
        </label>
        <div>
          {errors?.Email && <p>{errors?.Email?.message || 'Поле обязательно к заполнению'}</p>}
        </div>
      </div>
      <div className={classes.formItem}>
        <label>
          New password
          <input className={errors?.Password ? classes.inputError : null}
                 {...register('Password', {
                   required: true,
                   maxLength: {
                     value: 40,
                     message: 'Не больше 40 символов'
                   },
                   minLength: {
                     value: 6,
                     message: 'Не менее 6 символов'
                   }
                 })}
                 placeholder={'New password'}
          />
        </label>
        <div>
          {errors?.Password && <p>{errors?.Password?.message || 'Поле обязательно к заполнению'}</p>}
        </div>
      </div>
      <div className={classes.formItem}>
        <label>
          Avatar image (url)
          <input className={errors?.image ? classes.inputError : null}
                 {...register('image', {
                   required: true
                 })}
                 placeholder={'Avatar image (url)'}
          />
        </label>
        <div>
          {errors?.image && <p>{errors?.image?.message || 'Поле обязательно к заполнению'}</p>}
        </div>
      </div>
      <div className={classes.formItem + " " + classes.submitEditProfile}>
        <input className={classes.submit} type="submit" value="Create"/>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => {
  return ({
      userName: state.userName,
      email: state.email,
      bio: state.bio,
      token: state.token,
      userAvatar: state.userAvatar,
    }
  )
}

export default compose(
  withBlogServices(),
  connect(mapStateToProps, {onSubmitEditProfile})
)(EditProfileForm)



