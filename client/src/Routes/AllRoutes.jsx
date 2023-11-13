import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Signup from '../Pages/Signup';
import Login from '../Pages/Login';
import Verify from '../Pages/Verify';
import Dashboard from '../Pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import ConfirmEmail from '../Pages/ConfirmEmail';
import ChangePassword from '../Pages/ChangePassword';
import Classes from '../Pages/Classes';
import Doubts from '../Pages/Doubts';
import Chats from '../Pages/Chats';
import Profile from '../Pages/Profile';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/confirmEmail' element={<ConfirmEmail/>}/>
        <Route path='/changePassword' element={<ChangePassword/>}/>
        <Route path='/classes' element={<PrivateRoute>
            <Classes/>
        </PrivateRoute>}/>
        <Route path='/dashboard' element={<PrivateRoute>
            <Dashboard/>
        </PrivateRoute>}/>
        <Route path='/doubts' element={<PrivateRoute>
            <Doubts/>
        </PrivateRoute>}/>
        <Route path='/chats' element={<PrivateRoute>
            <Chats/>
        </PrivateRoute>}/>
        <Route path='/profile' element={<PrivateRoute>
            <Profile/>
        </PrivateRoute>}/>
    </Routes>
  )
}

export default AllRoutes;