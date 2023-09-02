import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobCard from '../JobCard'
import JobFilter from '../JobFilter'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstrains = {
  inProcess: 'IN-PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Jobs extends Component {
  state = {
    jobsInfo: [],
    searchInput: '',
    activeSalId: salaryRangesList[0].salaryRangeId,
    activeEmpId: employmentTypesList[0].employmentTypeId,
    apiStatus: apiConstrains.initial,
  }

  componentDidMount() {
    this.getJobInfo()
  }

  getJobInfo = async () => {
    this.setState({apiStatus: apiConstrains.inProcess})
    const token = Cookies.get('jwt_token')
    const {searchInput, activeSalId, activeEmpId} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmpId}&minimum_package=${activeSalId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const jobInfo = await response.json()
      const updatedData = jobInfo.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      console.log(updatedData)
      this.setState({jobsInfo: updatedData, apiStatus: apiConstrains.success})
    } else {
      this.setState({apiStatus: apiConstrains.failure})
    }
  }

  getFailure = () => (
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
      <button type="button" className="retry">
        Retry
      </button>
    </div>
  )

  renderEmptyJobs = () => (
    <div className="not-found-sec">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-found"
      />
      <h1 className="not-found-head">No Jobs Found</h1>
      <p className="try">We could not find any jobs,try other filters.</p>
    </div>
  )

  empInputId = id => {
    this.setState({activeEmpId: id}, this.getJobInfo)
  }

  salInputId = salId => {
    this.setState({activeSalId: salId}, this.getJobInfo)
  }

  getSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearch = () => {
    this.getJobInfo()
  }

  renderJobSection = () => {
    const {jobsInfo, searchInput} = this.state
    return (
      <div className="jobs-container">
        <div className="job-right-sec">
          <div>
            <input
              type="search"
              className="input-search"
              onChange={this.getSearchInput}
              value={searchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-btn"
              onClick={this.getSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <ul className="job-list">
            {jobsInfo.map(item => (
              <JobCard jobItem={item} key={item.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  getLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getRenderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstrains.success:
        return this.renderJobSection()
      case apiConstrains.failure:
        return this.getFailure()
      case apiConstrains.inProcess:
        return this.getLoader()
      default:
        return null
    }
  }

  render() {
    const {jobsInfo} = this.state
    const result = jobsInfo.length < 1
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="jobs-section">
        <Header />
        <div className="job-main">
          <JobFilter
            employmentTypes={employmentTypesList}
            salaryRanges={salaryRangesList}
            empInputId={this.empInputId}
            salInputId={this.salInputId}
          />
          {result ? this.renderEmptyJobs() : this.getRenderResult()}
        </div>
      </div>
    )
  }
}
export default Jobs
