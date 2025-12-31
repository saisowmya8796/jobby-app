import {Component} from 'react'
import {ThreeDots} from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

import JobCard from '../JobCard'
import JobsFilterGroup from '../JobsFilterGroup'

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

const locationsList = [
  {label: 'Hyderabad', locationId: 'HYDERABAD'},
  {label: 'Bangalore', locationId: 'BANGALORE'},
  {label: 'Chennai', locationId: 'CHENNAI'},
  {label: 'Delhi', locationId: 'DELHI'},
  {label: 'Mumbai', locationId: 'MUMBAI'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobProfileSection extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    employmentType: [],
    salaryRange: '',
    location: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const {salaryRange, employmentType, searchInput} = this.state

    const employmentTypeParam = employmentType.join(',') || ''

    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeParam}&minimum_package=${salaryRange}&search=${encodeURIComponent(
      searchInput,
    )}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = Array.isArray(data.jobs)
        ? data.jobs.map(eachJob => ({
            companyLogoUrl: eachJob.company_logo_url,
            employmentType: eachJob.employment_type,
            id: eachJob.id,
            jobDescription: eachJob.job_description,
            location: eachJob.location,
            packagePerAnnum: eachJob.package_per_annum,
            rating: eachJob.rating,
            title: eachJob.title,
          }))
        : []

      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value.trim()})
  }

  onEnterKeyDown = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  changeEmploymentType = event => {
    const {value, checked} = event.target
    this.setState(
      prevState => {
        const updatedTypes = checked
          ? [...prevState.employmentType, value]
          : prevState.employmentType.filter(each => each !== value)
        return {employmentType: updatedTypes}
      },
      this.getJobDetails,
    )
  }

  changeSalaryRange = event => {
    this.setState({salaryRange: event.target.value}, this.getJobDetails)
  }

  changeLocation = event => {
    const {value, checked} = event.target
    this.setState(prevState => {
      const updateLocations = checked
        ? [...prevState.location, value]
        : prevState.location.filter(each => each !== value)
      return {location: updateLocations}
    })
  }

  renderJobDetails = () => {
    const {jobsList, searchInput, location} = this.state

    const filteredJobs =
      location.length === 0
        ? jobsList
        : jobsList.filter(each =>
            location.includes(each.location.toUpperCase()),
          )

    const hasJobs = filteredJobs.length > 0

    return (
      <>
        <div className="search-input-lg">
          <input
            type="search"
            role="searchbox"
            className="search-lg"
            placeholder="Search"
            aria-label="Search"
            value={searchInput}
            onChange={this.changeSearchInput}
            onKeyDown={this.onEnterKeyDown}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button-lg"
            onClick={this.getJobDetails}
          >
            <BsSearch className="search-icon-lg" />
          </button>
        </div>
        {hasJobs ? (
          <ul className="job-details-item-container">
            {filteredJobs.map(eachData => (
              <JobCard key={eachData.id} jobDetails={eachData} />
            ))}
          </ul>
        ) : (
          <div className="no-jobs-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-desc">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        )}
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-picture"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        data-testid="button"
        className="jobs-failure-button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobProfileDetailsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="job-section-profile-details-container">
        <div className="render-group-items">
          <div className="search-input-sm">
            <input
              type="search"
              role="searchbox"
              className="search-sm"
              placeholder="Search"
              aria-label="Search"
              value={searchInput}
              onChange={this.changeSearchInput}
              onKeyDown={this.onEnterKeyDown}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-button-sm"
              onClick={this.getJobDetails}
            >
              <BsSearch className="search-icon-sm" />
            </button>
          </div>
          <JobsFilterGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            locationsList={locationsList}
            changeEmploymentType={this.changeEmploymentType}
            changeSalaryRange={this.changeSalaryRange}
            changeLocation={this.changeLocation}
          />
        </div>
        <div className="responsive-items">
          {this.renderJobProfileDetailsList()}
        </div>
      </div>
    )
  }
}

export default JobProfileSection
