import './App.css';
import AllRoutes from './Routes/AllRoutes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const location = useLocation();
  const data = JSON.parse(localStorage.getItem('login-token')) || {};
  const navigate = useNavigate();
  const [response, setResponse] = useState({});
  const email = localStorage.getItem('login-email') || '';
  const confirmEmail = localStorage.getItem('confirmEmail') || '';

  useLayoutEffect(() => {
      axios.get(`https://doubts-cleared.onrender.com/api/auth/users/${data.email}`, {
          headers : {
              'Authorization' : `Bearer ${data.token}`,
              'Content-Type' : 'application/json'
          }
      })
      .then(res => {
          setResponse(res.data.user);
          if(res.data.user.grade && location.pathname === '/classes'){
            navigate('/dashboard');
          }
          else if(!res.data.user.grade){
            navigate('/classes')
          }
      })
      .catch(err => {
          console.log(err);
      })
  }, [])


  useEffect(() => {
    if (data.token && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/dashboard');
    }
  }, [])

  useEffect(() => {
    if(location.pathname === '/doubt'){
      navigate('/dashboard')
    }
  }, [])

  useEffect(() => {
    if(location.pathname === '/doubt'){
      navigate('/dashboard')
    }
  }, [location.pathname])

  useEffect(() => {
    if((!email && !confirmEmail) && (location.pathname === '/verify' || location.pathname === '/changePassword')){
      navigate('/login');
    }
  }, [])

  useEffect(() => {
    if((!email && !confirmEmail) && (location.pathname === '/verify' || location.pathname === '/changePassword')){
      navigate('/login');
    }
  }, [location.pathname])

  useEffect(() => {
    if (data.token && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/dashboard');
    }
  }, [location.pathname, data.token])

  return (
    <div className="App">
      <AllRoutes/>
    </div>
  );
}

export default App;
