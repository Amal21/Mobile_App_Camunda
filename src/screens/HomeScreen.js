import React, {useContext} from 'react'
import {Button, StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const Home = ({navigation}) => {

  const {listprocess, isLoading, logout} = useContext(AuthContext);

 



  return (
    <View style={styles.container}>
      
      <Text style={styles.welcome}>Liste des processus</Text>

     

       <View style={styles.container}>

      {listprocess.data.map((e) => {

        return(
         //<Text style={styles.welcome} >{e.name}</Text>

         /*<Button
          title={e.name}
          
          style={styles.styleBtn}

          onPress={() => {
            
            navigation.navigate('Demande Attestation de Présence');

          }}
          
        />*/

        <Pressable style={styles.styleBtn} onPress = {() =>{
            
          navigation.navigate('Demande Attestation de Présence');

        } }> 
                          <Text style={styles.text}>{e.name}</Text>
        </Pressable>
    

        )

      })
      }
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
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
  styleBtn: {

    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    borderWidth: 2,
    backgroundColor:"lightblue",
    height: 25,
    textAlign:"center",
    
    borderColor: "white", 
    
    marginBottom: 10,
  }
});

export default Home;
