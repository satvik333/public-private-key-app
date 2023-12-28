import React, { useEffect, useState } from 'react';
import './UserForm.css';
import { getPrivateKey, getAllKeys } from '../services/applicationServices';
import AppBar from './kaptureAppBar';
import { logOutUser } from '../services/applicationServices';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const UserForm = ({ loggedInUser }) => {
  const [publicKey, setPublicKeyValue] = useState('');
  const [privateKey, setPrivateKeyValue] = useState(null);
  const [keys, setKeys] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await getPrivateKey(publicKey);
    if (result.private_key) setPrivateKeyValue(result.private_key);
    else setPrivateKeyValue(null);
  };

  async function logout() {
    navigate('/login')
    await logOutUser(loggedInUser?.id);
  }

  async function clickedOnGetAllKeys() {
    try {
      let allKeys = await getAllKeys();
      setKeys(allKeys);
    } catch (error) {
      console.error('Error fetching keys:', error);
    }
  }

  return (
    <div>
      <AppBar loggedInUser={loggedInUser}/>
      <button onClick={clickedOnGetAllKeys} className='get-all-keys'>
        Get All Keys
      </button>
      <button onClick={logout} className="log-out">
        Logout
      </button>
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
      <div className="card">
      { keys &&
        <DataTable value={keys} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
          <Column field="id" header="Id" style={{ width: '25%' }}></Column>
          <Column field="public_key" header="Public Key" style={{ width: '25%' }}></Column>
          <Column field="private_key" header="Private Key" style={{ width: '25%' }}></Column>
        </DataTable>
      }
      </div>
    </div>
  );
};

export default UserForm;
