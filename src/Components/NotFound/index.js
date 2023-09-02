import './index.css'

const NotFound = () => (
  <div className="found-sec">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      className="no-found"
      alt="notfound"
    />
    <h1 className="found-head"> Page Not Found</h1>
    <p className="try">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
