import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import {AiOutlineStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {
    isLoad: false,
    jobInfo: {},
    jobSkill: [],
    similarJobs: [],
    lifeAtCompany: {},
  }

  componentDidMount() {
    this.getJobItem()
  }

  getJobItem = async () => {
    this.setState(prevSate=>({isLoad: !prevSate.isLoad}))
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jobDetails = await response.json()
      const updateJobDetails = {
        id: jobDetails.job_details.id,
        companyLogoUrl: jobDetails.job_details.company_logo_url,
        companyWebsiteUrl: jobDetails.job_details.company_website_url,
        employmentType: jobDetails.job_details.employment_type,
        jobDescription: jobDetails.job_details.job_description,
        location: jobDetails.job_details.location,
        packagePerAnnum: jobDetails.job_details.package_per_annum,
        rating: jobDetails.job_details.rating,
        title: jobDetails.job_details.title,
      }

      const updatedSkill = jobDetails.job_details.skills.map(eachI => ({
        imageUrl: eachI.image_url,
        name: eachI.name,
      }))
      const similarData = jobDetails.similar_jobs.map(items => ({
        id: items.id,
        companyLogoUrl: items.company_logo_url,
        employmentType: items.employment_type,
        jobDescription: items.job_description,
        location: items.location,
        rating: items.rating,
        title: items.title,
      }))

      const lifeCompany = {
        description: jobDetails.job_details.life_at_company.description,
        imageUrl: jobDetails.job_details.life_at_company.image_url,
      }
      this.setState({
        jobInfo: updateJobDetails,
        similarJobs: similarData,
        jobSkill: updatedSkill,
        lifeAtCompany: lifeCompany,
        
      })
      this.setState(prevSate=>({isLoad: !prevSate.isLoad}))
    }
  }


  getSuccessrender=()=>{
       const {jobInfo, jobSkill, similarJobs, lifeAtCompany} = this.state
    const {description, imageUrl} = lifeAtCompany

    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      packagePerAnnum,
      rating,
      jobDescription,
      location,
    } = jobInfo
    
    return (
    <>
        <Header />
        <div className="job-item">
          <div className="job-card">
            <div className="logo-sec">
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="company-logo"
              />
              <div className="title-sec">
                <h1 className="title">{title}</h1>
                <div className="rating">
                  <AiOutlineStar className="star" />
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
            <div className="desc-sec">
              <h2 className="desc">Description</h2>
              <a href={companyWebsiteUrl} className="anchor">
                Visit <BiLinkExternal />
              </a>
            </div>
            <p className="job-dec">{jobDescription}</p>
            <h1 className="desc">Skills</h1>
            <ul className="skills-sec">
              {jobSkill.map(jobItem => (
                <li className="job-list-item" key={id}>
                  <img
                    src={jobItem.imageUrl}
                    className="skill-logo"
                    alt="job details company logo"
                  />
                  <p className="skill-title">{jobItem.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="desc">Life at Company</h1>
            <div className="life-company-sec">
              <p className="life-dec">{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="life-company"
              />
            </div>
          </div>
          <div className="semi-sec">
            <ul className="semi-list">
              {similarJobs.map(eachSemi => (
                <li className="similar-job-card" key={eachSemi.id}>
                  <div className="logo-sec">
                    <img
                      src={eachSemi.companyLogoUrl}
                      alt="company logo"
                      className="company-logo"
                    />
                    <div className="title-sec">
                      <h1 className="title">{eachSemi.title}</h1>
                      <div className="rating">
                        <AiOutlineStar className="star" />
                        <p className="rate-text">{eachSemi.rating}</p>
                      </div>
                    </div>
                  </div>
                  <h2 className="desc">Description</h2>
                  <p className="job-dec">{eachSemi.jobDescription}</p>
                  <div className="middle-sec">
                    <div className="middle">
                      <div className="middle-min">
                        <MdLocationOn className="middle-icon" />
                        <p className="location">{eachSemi.location}</p>
                      </div>
                      <div className="middle-min">
                        <BsFillBriefcaseFill className="middle-icon" />
                        <p className="location">{eachSemi.employmentType}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )

  }

  getLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoad}=this.state
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }

    return (
    {isLoad ? (this.getSuccessrender()):(this.getLoader())}
    )
  }
}

export default JobItemDetails
