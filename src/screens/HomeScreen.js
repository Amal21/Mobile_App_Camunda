import React, {useContext} from 'react'
import {Button, StyleSheet, Text, View, FlatList, ListView} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const Home = () => {
  const {listprocess, isLoading, logout} = useContext(AuthContext);

  //const array=listprocess.data.map((e) => {
          
    //console.log('list of processes '+e.name);
    
  //});




  return (
    <View style={styles.container}>
      
      <Text style={styles.welcome}>Liste des processus</Text>

     

       <View style={styles.container}>
      {listprocess.data.map((e) => {



        return(
         <Text style={styles.welcome}>{e.name}</Text>

        )
        
      
       
        //console.log('list of processes '+e.name);




        
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
});

export default Home;
