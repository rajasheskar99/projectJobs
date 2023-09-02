import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const getLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <nav className="nav-section">
        <Link className="home-links" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="home-logo"
            alt="website logo"
          />
        </Link>
        <ul className="home-list">
          <li>
            <Link className="home-links" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="home-links">
              Jobs
            </Link>
          </li>
          <li>
            <button type="button" className="logout-btn" onClick={getLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}
export default withRouter(Header)
