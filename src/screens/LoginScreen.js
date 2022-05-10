import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';


const LoginScreen = ({navigation}) => {
  const {error} = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login} = useContext(AuthContext);

  return (
    <View style={styles.container}>


    <Image style={styles.img} source={require('./l.png')} />
    
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
      <Text style={styles.error} >{error.message}</Text>
      
     
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Entrer votre nom d'utilisateur"
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Entrer votre mot de passe"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Button
          title="Se connecter"
          onPress={() => {
            login(email, password);
            
          }}
        />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error:{
    color:'red',
    fontWeight:'bold'
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
  img:{ 
    width: 150,
    height: 130,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:20
  }
});

export default LoginScreen;
