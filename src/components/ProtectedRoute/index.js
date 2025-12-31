import {Navigate, Outlet} from 'react-router-dom' // 🔄 CHANGED
import Cookie from 'js-cookie'

const ProtectedRoute = () => {
  const token = Cookie.get('jwt_token')
  if (token === undefined) {
    return <Navigate to="/login" replace /> // 🔄 CHANGED
  }
  return <Outlet /> // 🔄 CHANGED
}

export default ProtectedRoute
