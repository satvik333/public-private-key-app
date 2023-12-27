import React, { useEffect, useState } from 'react';
import './UserForm.css';
import { getPrivateKey, getAllKeys } from '../services/applicationServices';

const UserForm = () => {
  const [publicKey, setPublicKeyValue] = useState('');
  const [privateKey, setPrivateKeyValue] = useState(null);
  const [keys, setKeys] = useState([]);

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

  return (
    <div>
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
