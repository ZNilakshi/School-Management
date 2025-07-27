export const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
  };
  
  export const handleOAuthRedirect = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      localStorage.setItem('accessToken', token);
      window.location.href = '/dashboard'; // Redirect to dashboard after login
      return true;
    }
    return false;
  };