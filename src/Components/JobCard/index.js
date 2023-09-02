import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobItem} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItem

  return (
    <Link to={`/jobs/${id}`} className="home-links">
      <li className="job-card">
        <div className="logo-sec">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-sec">
            <h1 className="title">{title}</h1>
            <div className="rating">
              <AiFillStar className="star" />
              <p className="rate-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="middle-sec">
          <div className="middle">
            <div className="middle-min">
              <MdLocationOn className="middle-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="middle-min">
              <BsFillBriefcaseFill className="middle-icon" />
              <p className="location">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h2 className="desc">Description</h2>
        <p className="job-dec">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
