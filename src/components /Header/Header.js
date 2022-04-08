import React from "react"
import { NavLink } from 'react-router-dom'
import classes from "./Header.module.scss"
import compose from '../../utils/compose'
import withBlogServices from '../hoc/withBlogServices'
import { connect } from 'react-redux'
import {onLogOut} from "../../actions/actions"
import { changePage, fetchArticles } from '../../actions/actions'
import { BlogList } from '../BlogList/BlogList'


const Header = ({ userName, userAvatar, onLogOut }) => {

  const setActive = ({isActive}) => isActive ? classes.activeLink : null

  const authenticatedUser =
    <div className={classes.authentication}>
    <div className={ classes.item }>
      <NavLink to="/new-article" className={ setActive }>Create article</NavLink>
    </div>
      <NavLink to="/profile" className={classes.containerForUser}>
        <div className={classes.userName}>{userName}</div>
        <img alt="Avatar"
             className={classes.avatar}
             src={userAvatar}/>
      </NavLink>
    <div className={ classes.item }>
      <NavLink to="/" className={ setActive } onClick={onLogOut} >Log Out</NavLink>
    </div>
  </div>

  const authentication =
    <div className={classes.authentication}>
      <div className={ classes.item }>
        <NavLink to="/sing-in" className={ setActive }>Sing In</NavLink>
      </div>
      <div className={ classes.item }>
        <NavLink to="/sing-up" className={ setActive }>Sing Up</NavLink>
      </div>
    </div>

  return (
    <div className={classes.container}>
        <div className={ classes.item }>
          <NavLink to="/" className={ setActive }>Realworld Blog</NavLink>
        </div>
      { userName ? authenticatedUser : authentication }
    </div>
  )
}


const mapStateToProps = (state) => {
  return ({
      userAvatar: state.userAvatar,
      userName: state.userName
    }
  )
}

export default compose(
  withBlogServices(),
  connect(mapStateToProps, {onLogOut})
)(Header)