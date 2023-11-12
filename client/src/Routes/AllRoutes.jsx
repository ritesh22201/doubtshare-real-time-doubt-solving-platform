import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import Verify from '../Pages/Verify';
import Doubt from '../Pages/Doubt';
import PrivateRoute from './PrivateRoute';
import ConfirmEmail from '../Pages/ConfirmEmail';
import ChangePassword from '../Pages/ChangePassword';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/confirmEmail' element={<ConfirmEmail/>}/>
        <Route path='/changePassword' element={<ChangePassword/>}/>
        <Route path='/doubt' element={<PrivateRoute>
            <Doubt/>
        </PrivateRoute>}/>
    </Routes>
  )
}

export default AllRoutes;