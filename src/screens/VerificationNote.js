import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import {BASE_URL} from '../config';
import axios from 'axios';

const VerificationNote = ({route}) => {


  const {id} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [fieldsFormAPI, setFieldsFormAPI] = useState(null);
  const [keysOfData, setKeysOfData] = useState();
  const [requestData, setRequestData] = useState();



  const depotDemande = async () => {
    let userName = await AsyncStorage.getItem('username');
    let passWord = await AsyncStorage.getItem('password');

    axios
      .post(
        `${BASE_URL}/process-definition/${id}/submit-form`,

        requestData,
        {
          auth: {
            username: userName,
            password: passWord,
          },
        },
      )
      .then(res => {
        setModalVisible(true);
        console.log(
          'demande vérification note envoyée avec succès : ',
          res.data,
        );
        setRequestData({variables: {...fieldsFormAPI}});
        //setFieldsFormAPI(fieldsFormAPI)
      })
      .catch(e => {
        console.log(` demande vérification note error ${e}`);
      });
  };

  const getForm = async () => {
    let userName = await AsyncStorage.getItem('username');
    let passWord = await AsyncStorage.getItem('password');

    await axios
      .get(`${BASE_URL}/process-definition/${id}/form-variables`, {
        auth: {
          username: userName,
          password: passWord,
        },
      })
      .then(res => {
       
        setFieldsFormAPI(res.data);
        setKeysOfData(Object.keys(res.data));
        setRequestData({variables: {...res.data}});
      })
      .catch(e => {
        console.log(`Get Form error ${e}`);
      });
  };

  const handleChange = (key, value) => {
    console.log('Text Index:' + key);
    console.log('Text Value:' + value);
    const name = keysOfData[key];
  
    setRequestData(
      

      {
        variables: {
          ...requestData.variables,
          [name]: {...requestData.variables[name], value},
        },
      },
    );
  };

  useEffect(() => {
    getForm();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {console.log(
          'fieldsFormAPI here',
          JSON.stringify(requestData, null, 2),
        )}
        {fieldsFormAPI ? (
          keysOfData?.map((el, key) => {
            return (
              <TextInput
                style={styles.input}
                name={keysOfData[key]}
                key={key}
                type={fieldsFormAPI[el].type}
                value={requestData?.variables[el].value}
                placeholder={`Entrer votre ${keysOfData[key]}`}
                onChangeText={text => handleChange(key, text)}
              />
            );
          })
        ) : (
          <Text> Loading </Text>
        )}

        <Button
          title="Déposer demande"
          onPress={() => {
            depotDemande();
            
          }}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}> Demande envoyée avec succès !</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );




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
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: 'green',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: 'green',
      fontWeight: 'bold',
    },
  });
  
export default VerificationNote;