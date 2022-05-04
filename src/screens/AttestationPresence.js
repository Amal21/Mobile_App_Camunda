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

const AttestationPresence = ({route}) => {
  const {id} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  //const [userName, setUserName ] = useState();
  //const [passWord, setPassWord ] = useState();
  const [fieldsFormAPI, setFieldsFormAPI] = useState(null);
  const [keysOfData, setKeysOfData] = useState();
  const [requestData, setRequestData] = useState();

  /*
  const crendentials= async () => {
    try { 

      let userName = await AsyncStorage.getItem('username');
      let passWord = await AsyncStorage.getItem('password')

      
      
      if (userName) {
        console.log("userName" , userName)
        setUserName(userName);
      }

      if(passWord){
        console.log("pass" , passWord)

        setPassWord(passWord)
      }

    } catch (e) {
      console.log(`get credentials error ${e}`);
    }

  };
*/

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
        console.log(
          'demande attestation de présence envoyée avec succès : ',
          res.data,
        );
     setRequestData({variables: {...fieldsFormAPI}});
        //setFieldsFormAPI(fieldsFormAPI)
      })
      .catch(e => {
        console.log(` demande attestation error ${e}`);
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
        //console.log('Data from Get Axios ', JSON.stringify(res.data, null,2));
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
    // console.log( "name" ,name)
    setRequestData(
      //ovveride of names motif ..with new values

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
        {console.log('fieldsFormAPI here', JSON.stringify(requestData, null, 2))}
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
            setModalVisible(true);
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

export default AttestationPresence;
