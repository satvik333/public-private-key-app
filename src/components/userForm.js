import React, { useState } from 'react';
import './UserForm.css';
import { getPrivateKey } from '../services/applicationServices';

const UserForm = () => {
  const [publicKey, setPublicKeyValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getPrivateKey(publicKey);
    console.log('Submitted value:', publicKey);
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
    </div>
  );
};

export default UserForm;
