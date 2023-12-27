import axios from 'axios';
import configParams from '../frontendConfig';

// Defined the base API URL
const baseUrl = `${configParams.appEnv}:3000`;
let authToken;

let headers = () => ({
  'authorization': `Bearer ${authToken}`,
});

async function verifyEmailAndSendOtp(email) {
  try {
    const response = await axios.post(`${baseUrl}/verify-email`, { email: email });
    return response.data;
  } catch (error) {
    console.error(`Error while verifying email`, error);
    throw error;
  }
}

async function getPrivateKey(publicKey) {
  try {
    console.log(headers(),'hhhh1111111111111hhh')
    const response = await axios.get(`${baseUrl}/get-private-key`, {
      params: {
        publicKey: publicKey,
      },
      headers: headers(), //when we require jwt auth we need to pass headers to verify the user auth
    });
    return response.data;
  } catch (error) {
    console.error(`Error while retrieving private key`, error);
    throw error;
  }
}

async function getAllKeys() {
  try {
    console.log(headers(),'hh2222222222222222hhh')
    const response = await axios.get(`${baseUrl}/get-keys`, { headers: headers() });
    return response.data;
  } catch (error) {
    console.error(`Error while retrieving keys`, error);
    throw error;
  }
}

async function userLogin(otpObj) {
  try {
    const response = await axios.post(`${baseUrl}/login`, { otp: otpObj.otp, user: otpObj.user });
    authToken = response.data.token;
    console.log(authToken,'authhhhhhhhhhhhhhh')
    return response.data;
  } catch (error) {
    console.error(`Error while logging in user`, error);
    throw error;
  }
}

async function logOutUser(id) {
  try {
    await axios.post(`${baseUrl}/logout`, { id: id });
  } catch (error) {
    throw error;
  }
}

export { verifyEmailAndSendOtp, logOutUser, userLogin, getPrivateKey, getAllKeys };
