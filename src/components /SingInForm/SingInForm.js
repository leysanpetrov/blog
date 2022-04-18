import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import classes from './SingInForm.module.scss'
import { onSubmitSingIn } from '../../actions/actions'
import compose from '../../utils/compose'
import withBlogServices from '../hoc/withBlogServices'

const SingInForm = ({ BlogServices, onSubmitSingIn }) => {

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
    onSubmitSingIn(BlogServices, data, navigateToHomePage)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.formItem}>
        <label>
          Email address
          <input className={errors?.Email ? classes.inputError : null}
                 {...register('Email', {
                   required: true,
                   pattern: {
                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                     message: "invalid email address"
                   }
                 })}
                 placeholder={'Email address'}
          />
        </label>
        <div>
          {errors?.Email && <p>{errors?.Email?.message || 'Поле обязательно к заполнению'}</p>}
        </div>
      </div>
      <div className={classes.formItem}>
        <label>
          Password
          <input className={errors?.Password ? classes.inputError : null}
                 {...register('Password', {
                   required: true,
                 })}
                 placeholder={'Password'}
          />
        </label>
        <div>
          {errors?.Password && <p>{errors?.Password?.message || 'Поле обязательно к заполнению'}</p>}
        </div>
      </div>
      <div className={classes.formItem}>
        <input className={classes.submit} type="submit" value="Login"/>
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
  connect(mapStateToProps, { onSubmitSingIn })
)(SingInForm)



