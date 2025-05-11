import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer/Footer'
import LoginForm from './components/Login/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/Dashboard/Dashboard'
import ResetPassword from './components/ResetPassword/ResetPassword'
import Register from './components/Registration/Resgistration'
import './App.css'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      

    </BrowserRouter>
  )
}

export default App
