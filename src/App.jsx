import './App.css'
import { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { Dashboard } from './pages/dashboard/Dashboard'

function App() {

  return (
   <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </Suspense>
  )
}

export default App
