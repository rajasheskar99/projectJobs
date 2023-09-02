import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginFrom extends Component {
  state = {username: '', password: '', errorMsg: '', isError: false}

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  successfullyLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  getError = errorText => {
    this.setState({errorMsg: errorText, isError: true})
  }

  formSubmitted = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userInfo = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userInfo),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.successfullyLogin(data.jwt_token)
    } else {
      this.getError(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, isError} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-main">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="login-logo"
            alt="website logo"
          />
          <form className="form" onSubmit={this.formSubmitted}>
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              id="username"
              type="text"
              className="input"
              placeholder="Username"
              onChange={this.getUsername}
              value={username}
            />

            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="Password"
              onChange={this.getPassword}
              value={password}
            />
            <button type="submit" className="submit">
              Login
            </button>
            {isError && <p className="error">* {errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginFrom
