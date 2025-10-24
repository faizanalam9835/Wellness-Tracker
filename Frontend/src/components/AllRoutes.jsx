import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUpPage from '../Pages/SignUpPage'
import LoginPage from '../Pages/LoginPage'
// import LandingPage from '../Pages/LandingPage'
// import Dashboard from '../Pages/Dashboard'
// import Profile from '../Pages/Profile'
// import MyTask from '../Pages/MyTask'
// import Teams from '../Pages/Teams'
// import Notifications from '../Pages/Notifications'
// import Analytics from '../Pages/Analytics'
// import Projects from '../Pages/Projects'

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignUpPage/>} />
        <Route path='/login' element={<LoginPage />} />

        <Route path='/' element={<LandingPage/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/tasks" element={<MyTask/>} />
        <Route path="/teams" element={<Teams/>} />
        <Route path='/notifications' element={<Notifications/>} />
        <Route path='/analytics' element={<Analytics/>} />
        <Route path='/projects' element={<Projects/>} />
        {/*<Route path='' element={} /> */}
        {/*<Route path='' element={} /> */}
      </Routes>
    </>
  )
}