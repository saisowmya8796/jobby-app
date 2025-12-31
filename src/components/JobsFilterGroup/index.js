import ProfileDetails from '../ProfileDetails'

import './index.css'

const JobsFilterGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    locationsList,
    changeEmploymentType,
    changeSalaryRange,
    changeLocation,
  } = props

  const renderEmploymentTypes = () => (
    <div className="filter-section">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-list">
        {employmentTypesList.map(eachType => (
          <li key={eachType.employmentTypeId} className="filter-item">
            <input
              type="checkbox"
              id={eachType.employmentTypeId}
              value={eachType.employmentTypeId}
              className="filter-input"
              name="employmentType"
              onChange={changeEmploymentType}
            />
            <label htmlFor={eachType.employmentTypeId} className="filter-label">
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRanges = () => (
    <div className="filter-section">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-list">
        {salaryRangesList.map(eachRange => (
          <li key={eachRange.salaryRangeId} className="filter-item">
            <input
              type="radio"
              id={eachRange.salaryRangeId}
              value={eachRange.salaryRangeId}
              className="filter-input"
              name="salary"
              onChange={changeSalaryRange}
            />
            <label htmlFor={eachRange.salaryRangeId} className="filter-label">
              {eachRange.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderLocations = () => (
    <div className="filter-section">
      <h1 className="filter-heading">Locations</h1>
      <ul className="filter-list">
        {locationsList.map(eachLocation => (
          <li key={eachLocation.locationId} className="filter-item">
            <input
              type="checkbox"
              id={eachLocation.locationId}
              value={eachLocation.locationId}
              className="filter-input"
              name="location"
              onChange={changeLocation}
            />
            <label htmlFor={eachLocation.locationId} className="filter-label">
              {eachLocation.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="filter-container">
      <ProfileDetails />
      <hr className="separator-line" />
      {renderEmploymentTypes()}
      <hr className="separator-line" />
      {renderSalaryRanges()}
      <hr className="separator-line" />
      {renderLocations()}
    </div>
  )
}

export default JobsFilterGroup
