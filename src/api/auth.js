import axios from './axiosConfig';

export const initiateGoogleLogin = () => {
  const redirectUri = `${window.location.origin}/api/oauth2/redirect`;
  return `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080'}/api/oauth2/authorize/google?redirect_uri=${encodeURIComponent(redirectUri)}`;
};

export const verifyToken = async () => {
  try {
    const response = await axios.get('/api/auth/user'); // Add /api prefix
    return response.data;
  } catch (error) {
    throw new Error('Token verification failed');
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
};