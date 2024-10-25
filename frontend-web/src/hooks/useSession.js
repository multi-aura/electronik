import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useSession = () => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      setAuthToken(token); 
    }
  }, []);

  return authToken;
};

export default useSession;
