import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import classes from './SingUpForm.module.scss'
import { onSubmitSingUp } from '../../actions/actions'
import compose from '../../utils/compose'
import withBlogServices from '../hoc/withBlogServices'

const SingUpForm = ({ BlogServices, onSubmitSingUp }) => {

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
    onSubmitSingUp(BlogServices, data, navigateToHomePage)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.formItem}>
        <label>
          UserName
          <input className={errors?.UserName ? classes.inputError : null}
                 {...register('UserName', {
            required: true,
            maxLength: {
              value: 20,
              message: 'Не больше 20 символов'
            },
            minLength: {
              value: 3,
              message: 'Не менее 3 символов'
            },
          })}
                 placeholder={'UserName'}
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
            maxLength: {
              value: 40,
              message: 'Не больше 40 символов'
            },
            minLength: {
              value: 6,
              message: 'Не менее 6 символов'
            }
          })}
                 placeholder={'Password'}
          />
        </label>
        <div>
          {errors?.Password && <p>{errors?.Password?.message || 'Поле обязательно к заполнению'}</p>}
        </div>
      </div>
      <div className={classes.formItem}>
        <label>
          Repeat password
          <input className={errors?.RepeatPassword ? classes.inputError : null}
                 {...register('RepeatPassword', {
            required: true,
            validate: value => value === password.current || "Пароли не совпадают"
          })}
                 placeholder={'Repeat password'}
          />
        </label>
        <div>
          {errors?.RepeatPassword && <p>{errors?.RepeatPassword?.message || 'Поле обязательно к заполнению'}</p>}
        </div>
      </div>
      <div className={classes.line}/>
      <div className={classes.containerForm}>
        <input type={'checkbox'} className={classes.checkbox}{...register('checkbox', {
          required: true
        })}
        />
        <div className={classes.checkboxLabel}>I agree to the processing of my personal information</div>
      </div>
      <div>
        {errors.checkbox && <p>Необходимо согласие</p>}
      </div>
      <div className={classes.formItem}>
        <input className={classes.submit} type="submit" value="Create"/>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => {
  return ({
      userName: state.userName,
      token: state.token,
      userAvatar: state.userAvatar,
      email: state.email,
      bio: state.bio
    }
  )
}

export default compose(
  withBlogServices(),
  connect(mapStateToProps, { onSubmitSingUp })
)(SingUpForm)



