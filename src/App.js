import {Routes, Route, Navigate} from 'react-router-dom' // 🔄 CHANGED

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Routes> {/* 🔄 CHANGED */}
    <Route path="/login" element={<LoginForm />} /> {/* 🔄 CHANGED */}
    <Route element={<ProtectedRoute />}> {/* 🔄 CHANGED */}
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobItemDetails />} />
    </Route>
    <Route path="/not-found" element={<NotFound />} /> {/* 🔄 CHANGED */}
    <Route path="*" element={<Navigate to="/not-found" />} /> {/* 🔄 CHANGED */}
  </Routes>
)

export default App
