import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="found-sec">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          className="no-found-image"
          alt="not found"
        />
      </div>

      <h1 className="found-head"> Page Not Found</h1>
      <p className="not-found-desc">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
