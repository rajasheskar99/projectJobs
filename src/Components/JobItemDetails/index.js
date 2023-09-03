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

const apiConstrains = {
  inProcess: 'IN-PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class JobItemDetails extends Component {
  state = {
    jobInfo: [],
    similarJobs: [],
    apiStatus: apiConstrains.initial,
  }

  componentDidMount() {
    this.getJobItem()
  }

  getJobItem = async () => {
    this.setState({apiStatus: apiConstrains.inProcess})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)
    if (response.ok) {
      const jobDetails = await response.json()
      const updateJobDetails = [jobDetails.job_details].map(eachJob => ({
        id: jobDetails.job_details.id,
        companyLogoUrl: eachJob.company_logo_url,
        companyWebsiteUrl: eachJob.company_website_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        lifeCompany: {
          description: eachJob.life_at_company.description,
          imageUrl: eachJob.life_at_company.image_url,
        },
        updatedSkill: eachJob.skills.map(eachI => ({
          imageUrl: eachI.image_url,
          name: eachI.name,
        })),
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
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
      this.setState({
        jobInfo: updateJobDetails,
        similarJobs: similarData,
        apiStatus: apiConstrains.success,
      })
    } else {
      this.setState({apiStatus: apiConstrains.failure})
    }
  }

  getSuccessRender = () => {
    const {jobInfo, similarJobs} = this.state

    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      packagePerAnnum,
      rating,
      jobDescription,
      location,
      updatedSkill,
      lifeCompany,
    } = jobInfo[0]

    return (
      <div className="job-item">
        <div className="job-card">
          <div className="logo-sec">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
            {updatedSkill.map(jobItem => (
              <li className="job-list-item" key={jobItem.name}>
                <img
                  src={jobItem.imageUrl}
                  className="skill-logo"
                  alt={jobItem.name}
                />
                <p className="skill-title">{jobItem.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="desc">Life at Company</h1>
          <div className="life-company-sec">
            <p className="life-dec">{lifeCompany.description}</p>
            <img
              src={lifeCompany.imageUrl}
              alt="life at company"
              className="life-company"
            />
          </div>
        </div>
        <div className="semi-sec">
          <h1 className="desc">Similar Jobs</h1>
          <ul className="semi-list">
            {similarJobs.map(eachSemi => (
              <li className="similar-job-card" key={eachSemi.id}>
                <div className="logo-sec">
                  <img
                    src={eachSemi.companyLogoUrl}
                    alt="similar job company logo"
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
    )
  }

  retryJob = () => {
    this.getJobItem()
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobFailure = () => (
    <div className="not-found-sec">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-found"
      />
      <h1 className="not-found-head">Oops! Something Went Wrong </h1>
      <p className="try">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry" onClick={this.retryJob}>
        Retry
      </button>
    </div>
  )

  RenderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstrains.success:
        return this.getSuccessRender()
      case apiConstrains.failure:
        return this.renderJobFailure()
      case apiConstrains.inProcess:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        {this.RenderResult()}
      </>
    )
  }
}

export default JobItemDetails
