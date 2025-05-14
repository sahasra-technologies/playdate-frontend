import React,{useContext} from 'react'
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/Footer'
import LoginForm from './components/Login/Login'
import ProtectedRoute from './components/ProtectedRoute'
import ResetPassword from './components/ResetPassword/ResetPassword'
import Register from './components/Registration/Resgistration'
import TournamentPage from './pages/Tournaments/TournamentsPage';
import { ThemeContext } from './context/ThemeContext';
import GameDetailsPage from './components/Tournaments/GameDetails';
import VenueDetails from './components/Tournaments/VenueDetails';





import './App.css'
import Cookies from 'js-cookie';

function LayoutWrapper({children}){
  const location = useLocation()
  const token = Cookies.get('access')
  const isAuthenticated = !!token;
  const authPages = ['/', '/reset-password', '/register'];
  const showLayout = isAuthenticated && !authPages.includes(location.pathname);

  const { theme } = useContext(ThemeContext);

  return(
    <div className={`app-container ${theme}`}>
      {showLayout && <Navbar />}
      {children}
      {showLayout && <Footer/>}
    </div>
  )
}


function App() {
  
  

  return (
    <BrowserRouter>
     <LayoutWrapper>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/tournaments' element={
          <ProtectedRoute>
            <TournamentPage/>
          </ProtectedRoute>
        }/>
        <Route path="/tournaments/:id" element={<GameDetailsPage />} />
        <Route path="/venue/:id" element={<VenueDetails />} />
        
        <Route path='/register' element={<Register/>}/>
        
      </Routes>
      
      </LayoutWrapper>

    </BrowserRouter>
  )
}

export default App
