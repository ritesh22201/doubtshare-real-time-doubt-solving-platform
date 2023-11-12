import logo from './logo.svg';
import './App.css';
import AllRoutes from './Routes/AllRoutes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const data = JSON.parse(localStorage.getItem('login-token')) || {};
  const navigate = useNavigate();
  const email = localStorage.getItem('login-email') || '';
  const confirmEmail = localStorage.getItem('confirmEmail') || '';

  useEffect(() => {
    if (data.token && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/doubt');
    }
  }, [])

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
      navigate('/doubt');
    }
  }, [location.pathname, data.token])

  return (
    <div className="App">
      <AllRoutes/>
    </div>
  );
}

export default App;
