import React, {useContext} from 'react'
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const HomeScreen = () => {
  const {listprocess, isLoading, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      
      <Text style={styles.welcome}>Welcome </Text>
      <Button title="Logout" color="red" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default HomeScreen;
