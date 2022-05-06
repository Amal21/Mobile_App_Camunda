import React, {useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';




const Home = ({navigation}) => {
  const {listprocess, listtasks, isLoading, logout} = useContext(AuthContext);
  const [user, setUser] = useState();

  const getUsername = async () => {
    let userName = await AsyncStorage.getItem('username');

    setUser(userName);
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        {console.log('user from storage', user)}

        {user == 'etudiant' ? (
          <>
            <Text style={styles.welcome}>Liste des processus</Text>

            {listprocess?.data?.map(e => {
              return (
                <Pressable
                  style={styles.styleBtn}
                  onPress={() => {
                    if (e.name == 'Demande Attestation de presence') {
                      navigation.navigate('Demande Attestation de Présence', {
                        id: e.id,
                      });
                      console.log('id of cliqued object', e.id);
                    }else if (e.name == 'Demande Verification Note') {
                      navigation.navigate('Demande Vérification Note', {
                        id: e.id,
                      });
                      console.log('id of cliqued object', e.id);
                    }
                  }}>
                  <Text style={styles.text}>{e.name} </Text>
                </Pressable>
              );
            })}
          </>
        ) : (
          <>
            <Text style={styles.welcome}>Liste des tâches</Text>

            {listtasks?.data?.map(e => {
              return (
                <Pressable style={styles.styleBtn}>
                  <Text style={styles.text}>{e.name} </Text>
                </Pressable>
              );
            })}
          </>
        )}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex:1,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcome: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
    //fontWeight:'bold',
    color: 'black',
  },
  text: {
    fontSize: 15,
    //marginBottom: 8,
    //fontWeight:'bold',
    color: 'black',
  },
  styleBtn: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 5,
    paddingBottom: 5,
    borderWidth: 2,
    backgroundColor: 'lightblue',
    height: 50,
    width: 350,
    textAlign: 'center',
    fontWeight: 'bold',

    borderColor: 'white',
  },
});

export default Home;
