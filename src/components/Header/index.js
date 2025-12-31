import {Link, useNavigate} from 'react-router-dom' // 🔄 CHANGED: withRouter removed, useNavigate added

import Cookies from 'js-cookie'

import {IoMdHome} from 'react-icons/io'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const navigate = useNavigate() // 🔄 CHANGED: replacing history with navigate

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true}) // 🔄 CHANGED: history.replace -> navigate
  }

  return (
    <nav className="nav-header">
      <div className="nav-bar-logo-container">
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
            data-testid="websiteLogo"
          />
        </Link>
      </div>

      <ul className="nav-bar-menu-mobile-logo-container">
        <Link to="/" className="nav-link">
          <li className="nav-mobile-menu-item">
            <IoMdHome size={38} color="#f1f5f9" />
          </li>
        </Link>

        <Link to="/jobs" className="nav-link">
          <li className="nav-mobile-menu-item">
            <BsFillBriefcaseFill size={38} color="#f1f5f9" />
          </li>
        </Link>

        <li className="nav-mobile-menu-item">
          <button
            type="button"
            className="nav-mobile-logout-btn"
            onClick={onClickLogout}
          >
            <FiLogOut size={38} color="#f1f5f9" />
          </button>
        </li>
      </ul>

      <div className="home-jobs-container">
        <ul className="nav-menu-desktop">
          <li className="nav-menu-item">
            <Link to="/" className="nav-link" data-testid="homeLink">
              Home
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
      </div>

      <div className="logout-button-container">
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header // 🔄 CHANGED: removed withRouter
