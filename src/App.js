import './App.css';
import UserForm from './components/userForm';
import LoginPage from './components/loginForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';

function App() {

const [loggedInUser, setLoggedInUser] = useState(null);

const handleLogin = (user) => {
  if (user) setLoggedInUser(user);
};

  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<LoginPage onLogin={handleLogin}/>} />
        <Route exact path="/public-private-keys" element={<UserForm loggedInUser={loggedInUser}/>} />
      </Routes>
    </Router>
  );
}

export default App;
