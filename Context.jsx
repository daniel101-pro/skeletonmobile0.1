// AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usertoken, setUsertoken] = useState('false');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Assume we're fetching a token from storage or an API
    const fetchToken = async () => {
      setIsLoading(true)
      const token = await AsyncStorage.getItem("token")
      console.log("Token: ", token)
      if (token === 'true'){
        setUsertoken('true')
        setTimeout(() => {
          console.log("T: ", usertoken)
          setIsLoading(false)
        }, 3000)
        
      }
      setIsLoading(false)
    };

    fetchToken();
  }, []);

  return (
    <AuthContext.Provider value={{ usertoken, setUsertoken, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
