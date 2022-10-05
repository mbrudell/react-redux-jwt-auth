import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
// import * as dotenv from 'dotenv'

import { history } from './helpers/history'
import { Nav } from './components/Nav'
import { PrivateRoute } from './components/PrivateRoute'
import { Home } from './Home.js'
import { Login } from './Login'

export { App }

function App() {

  // dotenv.config()

  history.navigate = useNavigate()
  history.location = useLocation()

  return(
    <div className="app-container bg-light">
      <Nav />
      <div className="container pt-4 pb-4">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  )
}