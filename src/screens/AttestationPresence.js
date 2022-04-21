import React, { useState} from 'react'
import {
    Button,
    Text,
    TextInput,
    View,
    StyleSheet} from 'react-native';
import {BASE_URL} from '../config';
import axios from 'axios';


const AttestationPresence =  () => {

    const [motif, setMotif] = useState(null);
    const [groupe, setGroupe ] = useState(null);
    const [nom, setNom ] = useState(null);
    const [prenom, setPrenom ] = useState(null);
    const [niveau, setNiveau ] = useState(null);

    const depotDemande = (motif, groupe, nom, prenom, niveau) =>{



      axios
      .post(`${BASE_URL}/process-definition/att_presence:4:bd2b40ca-ba49-11ec-9615-8d765d216035/submit-form`,
      {
        motif:motif,
        groupe:groupe,
        nom:nom,
        prenom:prenom,
        niveau:niveau
      },
      {
        auth: {
          username: "etudiant",
          password: "bpm"
        }
     
      })
      .then(res => {  
        console.log(res); 
      })
      .catch(e => {
        console.log(` demande attestation error ${e}`);
        
      });



    }

 return(

    <View style={styles.container}>
      
      <View style={styles.wrapper}>


        <TextInput
          style={styles.input}
          value={motif}
          placeholder="Entrer votre motif"
          onChangeText={text => setMotif(text)}
        />

        <TextInput
          style={styles.input}
          value={groupe}
          placeholder="Entrer votre groupe"
          onChangeText={text => setGroupe(text)}
          
        />

        <TextInput
          style={styles.input}
          value={nom}
          placeholder="Entrer votre nom"
          onChangeText={text => setNom(text)}
        
        />

        <TextInput
        style={styles.input}
        value={prenom}
        placeholder="Entrer votre prenom"
        onChangeText={text => setPrenom(text)}
      
        />

        <TextInput
        style={styles.input}
        value={niveau}
        placeholder="Entrer votre niveau"
        onChangeText={text => setNiveau(text)}
      
        />

        <Button
          title="Déposer demande"
          onPress={() => {
            depotDemande(motif, groupe, nom, prenom, niveau);  

          }}
          
        />
       
       
      </View>
    </View>
 )
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
  });


export default AttestationPresence;