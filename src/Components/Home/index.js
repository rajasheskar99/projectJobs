import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="home-section">
      <Header />
      <div className="home-content">
        <h1 className="home-head">Find The Job That Fits Your Life</h1>
        <p className="home-desc">
          Millions of people are searching for jobs, salary information,company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="find-link">
          <button type="button" className="find-jobs">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home
