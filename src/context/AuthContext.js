import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [listprocess, setListProcess] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const login = (email, password) => {
    setIsLoading(true);
    axios
      .get(
        `${BASE_URL}/process-definition?latest=true&active=true&startableInTasklist=true&startablePermissionCheck=true&firstResult=0&maxResults=15`,
        {
          auth: {
            username: email,
            password: password,
          },
        },
      )
      .then(res => {
        AsyncStorage.setItem();

        AsyncStorage.setItem('username', email);
        AsyncStorage.setItem('password', password);

        let listprocess = res;
        //console.log(listprocess);
        setListProcess(listprocess);
        setIsLogged(true);
        //console.log(JSON.stringify(listprocess));
        //console.log(JSON.stringify(listprocess, null, 2));

        const array = listprocess.data.map(e => {
          console.log('list of processes ' + e.name + ' id : ' + e.id);
        });

        //AsyncStorage.setItem('listprocess', JSON.stringify(listprocess));
        //AsyncStorage.getItem(listprocess);
        console.log(listprocess);

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
        isLogged,
        splashLoading,
        login,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
