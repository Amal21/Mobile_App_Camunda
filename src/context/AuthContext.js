import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  
  const [listprocess, setListProcess] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

 

  const login = (email, password) => {

    setIsLoading(true);

   

    axios
      .get(`${BASE_URL}/process-definition`,{

        auth: {
          username: email,
          password: password
        }
      })
      .then(res => {
        let listprocess = res;
        console.log(listprocess);
        setListProcess(listprocess)
        AsyncStorage.setItem('listprocess', JSON.stringify(listprocess));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  

  
  useEffect(() => {
    //isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        listprocess,
        splashLoading,
        login
        
      }}>
      {children}
    </AuthContext.Provider>
  );
};
