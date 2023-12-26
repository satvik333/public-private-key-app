import './App.css';
import UserForm from './components/userForm';
import LoginPage from './components/loginForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/public-private-keys" element={<UserForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
