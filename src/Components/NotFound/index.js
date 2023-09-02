import './index.css'

const NotFound = () => (
  <div className="found-sec">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="no-found"
    />
    <h1 className="found-head">Page Not Found</h1>
    <p className="try">
      We are sorry,The page you requested could not be found
    </p>
  </div>
)

export default NotFound
