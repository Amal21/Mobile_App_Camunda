import React, {useContext} from 'react';
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
  const {listprocess, isLoading, logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>

      <View style={styles.welcome}>
     
        { listprocess.data.length > 0 ? 

          <> 
          <Text style={styles.welcome}>Liste des processus</Text>


         { listprocess.data.map(e => {
          return (

            <Pressable
              style={styles.styleBtn}
              onPress={() => {

                if(e.name == "Demande Attestation de presence")
                { navigation.navigate('Demande Attestation de Présence',{ id: e.id});
                  console.log('id of cliqued object', e.id)
                }
               
              }}>
            
              <Text style={styles.text}>{e.name} </Text>
            </Pressable>
          );
        }
        )
}
        </>
        
        : <Text style={styles.text} > Profil agent n'a aucun processus à lancer !</Text>}
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
    //fontWeight:'bold',
    color: 'black'
  },
  text:{

    fontSize: 15,
    //marginBottom: 8,
    //fontWeight:'bold',
    color: 'black'

  },
  styleBtn: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 5,
    paddingBottom: 5,
    borderWidth: 2,
    backgroundColor: 'lightblue',
    height: 50,
    width:350,
    textAlign: 'center',
    fontWeight:'bold',

    borderColor: 'white',

    
  },
});

export default Home;
