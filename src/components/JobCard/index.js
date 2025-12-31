import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-list-item">
        <div className="company-container">
          <div>
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo-card"
            />
          </div>

          <div>
            <h1 className="company-title">{title}</h1>
            <div className="icon-text-container">
              <AiFillStar className="star-icon" />
              <p className="rating-count">{rating}</p>
            </div>
          </div>
        </div>

        <div className="location-container-flex-content">
          <div className="location-jobtype-container">
            <div className="icon-text-container">
              <HiLocationMarker size={30} color="#ffffff" />
              <p className="location-text">{location}</p>
            </div>
            <div className="icon-text-container">
              <BsFillBriefcaseFill size={30} color="#ffffff" />
              <p className="location-text">{employmentType}</p>
            </div>
          </div>
          <div className="icon-text-container">
            <p className="package-text">{packagePerAnnum}</p>
          </div>
        </div>

        <hr className="line" />
        <h1 className="description-text-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
