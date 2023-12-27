import React, { useEffect, useState } from 'react';
import './UserForm.css';
import { getPrivateKey, getAllKeys } from '../services/applicationServices';
import AppBar from './kaptureAppBar';
import { logOutUser } from '../services/applicationServices';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ loggedInUser }) => {
  const [publicKey, setPublicKeyValue] = useState('');
  const [privateKey, setPrivateKeyValue] = useState(null);
  const [keys, setKeys] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allKeys = await getAllKeys();
        setKeys(allKeys);
        console.log(keys,'kkkkkkkkkkkkkkkkkkkk')
      } catch (error) {
        console.error('Error fetching keys:', error);
      }
    };
    fetchData(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await getPrivateKey(publicKey);
    if (result.private_key) setPrivateKeyValue(result.private_key);
    else setPrivateKeyValue(null);
  };

  async function logout() {
    console.log('logoutttttt')
    navigate('/login')
    await logOutUser(loggedInUser?.id);
  }

  return (
    <div>
      <AppBar loggedInUser={loggedInUser}/>
      <button onClick={logout} className="log-out">
        Logout
      </button>
      <div>Hiii{loggedInUser}</div>
      <form onSubmit={handleSubmit} className="user-form">
        <label>
          Enter the Public key:
          <input
            type="text"
            value={publicKey}
            onChange={(e) => setPublicKeyValue(e.target.value)}
            className="input-field"
          />
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <div className='private-key'>
        { privateKey && <h2>Private Key is: {privateKey}</h2> }
        { !privateKey && <h2>No Private key found for this Public Key</h2> }
      </div>
    </div>
  );
};

export default UserForm;
