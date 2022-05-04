import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import AttestationPresence from '../screens/AttestationPresence';
import {AuthContext} from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {listprocess, splashLoading, isLogged} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogged ? (
          <>
            <Stack.Screen name="Home" component={Home} />

            <Stack.Screen
              name="Demande Attestation de Présence"
              component={AttestationPresence}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
