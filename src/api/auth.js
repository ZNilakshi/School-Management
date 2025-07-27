import axios from './axiosConfig';

export const initiateGoogleLogin = () => {
  const redirectUri = `${window.location.origin}/oauth2/redirect`;
  return `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080'}/api/oauth2/authorize/google?redirect_uri=${encodeURIComponent(redirectUri)}`;
};

export const verifyToken = async (token) => {
  try {
    const response = await axios.get('/auth/user');
    return response.data;
  } catch (error) {
    throw new Error('Token verification failed');
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
};