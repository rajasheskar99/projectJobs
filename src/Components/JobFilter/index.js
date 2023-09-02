import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class JobFilter extends Component {
  state = {
    profile: {},
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const profileInfo = await response.json()

      const updatedProfile = {
        name: profileInfo.profile_details.name,
        profileImageUrl: profileInfo.profile_details.profile_image_url,
        shortBio: profileInfo.profile_details.short_bio,
      }
      this.setState({profile: updatedProfile})
    }
  }

  render() {
    const {profile} = this.state
    const {employmentTypes, salaryRanges} = this.props

    return (
      <div className="jobs-left-sec">
        <div className="profile-card">
          <img
            src={profile.profileImageUrl}
            className="profile"
            alt=" profile"
          />
          <h1 className="name">{profile.name}</h1>
          <p className="bio">{profile.shortBio}</p>
        </div>
        <hr className="line" />
        <h2 className="filter-title">Type of Employment</h2>
        <ul className="emp-list">
          {employmentTypes.map(empType => {
            const {empInputId} = this.props
            const getEmpId = () => {
              empInputId(empType.employmentTypeId)
            }

            return (
              <li className="list-item" key={empType.employmentTypeId}>
                <input
                  type="checkbox"
                  className="check-box"
                  id={empType.employmentTypeId}
                  onChange={getEmpId}
                />
                <label className="label" htmlFor={empType.employmentTypeId}>
                  {empType.label}
                </label>
              </li>
            )
          })}
        </ul>
        <hr className="line" />
        <h2 className="filter-title">Salary Range</h2>
        <ul className="emp-list">
          {salaryRanges.map(salType => {
            const {salInputId} = this.props
            const getSalId = () => {
              salInputId(salType.salaryRangeId)
            }

            return (
              <li className="list-item" key={salType.salaryRangeId}>
                <input
                  type="radio"
                  className="check-box"
                  id={salType.salaryRangeId}
                  onChange={getSalId}
                />
                <label className="label" htmlFor={salType.salaryRangeId}>
                  {salType.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default JobFilter
