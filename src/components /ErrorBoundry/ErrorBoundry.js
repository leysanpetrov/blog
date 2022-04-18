import React, { Component } from 'react'
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator'


export default class extends Component {

  state = {
    hasError: false
  }

  componentDidCatch () {
    this.setState({
      hasError: true
    })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }
    return this.props.children
  }
}