/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const signUpTemplate = {
    name: {value: '', error: ''},
    email: {value: '', error: ''},
    password: {value: '', error: ''},
    confirm: {value: '', error: ''},
    phone: {value: '', error: ''},
  };

  const [signupForm, setsignupForm] = useState({...signUpTemplate});
  const [loading, setLoading] = useState(false);

  const handleFormError = (key, value) => {
    let error = '';
    if (key === 'name') {
      if (value.length < 3) {
        error = 'Name must be atleast 3 characters';
      }
    } else if (key === 'email') {
      if (value.length === 0) {
        error = 'Email Address must not be blank';
      } else if (!/^([\w-\.])+@([\w-])+\.([\w-]{2,4})$/g.test(value)) {
        error = 'Invalid email';
      }
    } else if (key === 'password') {
      if (
        !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/g.test(value)
      ) {
        error = 'Invalid Password';
      }
    } else if (key === 'confirm') {
      if (value !== signupForm.password.value) {
        error = 'Password not matching';
      }
    } else if (key === 'phone') {
      if (value.length < 10) {
        error = 'Must be atleast 10 digits';
      } else if (value.length > 12) {
        error = 'Must not be greater than 12 digits';
      }
    }

    return error;
  };

  const handleForm = (key, value) => {
    let currentSignupForm = {...signupForm};
    // if(key === 'name'){
    //   currentSignupForm.name = value
    // }
    // else if(key === 'email'){
    //   currentSignupForm.email = value
    // }
    // else if(key === 'password'){
    //   currentSignupForm.password = value
    // }
    // else if(key === 'confirmPassword'){
    //   currentSignupForm.confirmPassword = value
    // }
    currentSignupForm[key]['value'] = value;
    currentSignupForm[key]['error'] = handleFormError(key, value);
    setsignupForm(currentSignupForm);
  };

  const extractFormData = () => {
    let data = {};

    Object.entries(signupForm).forEach(([key, value]) => {
      data[key] = value.value;
    });

    return data;
  };

  const postUserData = async data => {
    try {
      const res = await axios.post('http://localhost:3000/users', data, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': 'true007',
        },
      });
      return res;
    } catch (err) {
      return err;
    }
  };

  const handleSubmit = async () => {
    console.log('handle submit', signupForm);
    const data = extractFormData();
    console.log('Extract form data', data);
    setLoading(true);
    try {
      const response = await postUserData(data);
      if (response.status === 200) {
        setLoading(false);
        Alert.alert('Success', 'User created succesfully');
      } else {
        setLoading(false);
        Alert.alert('Failed', )
      }
    } 
    catch(err){
      setLoading(false)
      Alert.alert("failed")
    }
  };

  useEffect(() => {
    console.log(loading);
  }, [signupForm]);

  const newLocal = "#0000";
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size={'large'}
          color={'black'}
          style={{marginVertical: 70, marginHorizontal: 20}}
        />
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Sign Up</Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={text => handleForm('name', text)}
            value={signupForm.name.value}
          />
          {signupForm.name.error && (
            <Text style={styles.error}>{signupForm.name.error}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => handleForm('email', text)}
            value={signupForm.email.value}
          />
          {signupForm.email.error && (
            <Text style={styles.error}>{signupForm.email.error}</Text>
          )}
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Password"
            onChangeText={text => handleForm('password', text)}
            value={signupForm.password.value}
          />
          {signupForm.password.error && (
            <Text style={styles.error}>{signupForm.password.error}</Text>
          )}

          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={text => handleForm('confirm', text)}
            value={signupForm.confirm.value}
          />
          {signupForm.confirm.error && (
            <Text style={styles.error}>{signupForm.confirm.error}</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Phone"
            onChangeText={text => handleForm('phone', text)}
            value={signupForm.phone.value}
          />

          {signupForm.phone.error && (
            <Text style={styles.error}>{signupForm.phone.error}</Text>
          )}

          <View style={styles.btnContainer}>
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    paddingBottom: 10,
    paddingLeft: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },

  formContainer: {
    width: '85%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 4,
  },
  heading: {
    fontSize: 22,
    color: '#333',
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#aaa',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1,
  },
  btnContainer: {
    width: 150,
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default App;
