import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Error from '../../Shared/Error';
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

const Register = (props) => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const register = () => {
    if (
      email === '' ||
      name === '' ||
      phone === '' ||
      password === '') {
      setError('Please fill in the form correctly!')
    }
    else {
      let user = {
        name,
        email,
        phone,
        password,
        isAdmin: false
      }
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Registration Succeeded",
        text2: "Please login into your account"
      })
      props.navigation.navigate("Login");
      // Failed case
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
      >
        <FormContainer title={"Register"}>
          <Input
            placeholder={"Email"}
            name={"email"}
            id={"email"}
            onChangeText={(text) => setEmail(text.toLowerCase())}
          />
          <Input
            placeholder={"Name"}
            name={"name"}
            id={"name"}
            onChangeText={(text) => setName(text)}
          />
          <Input
            placeholder={"Phone Number"}
            name={"phone"}
            id={"phone"}
            keyboardType={"numeric"}
            onChangeText={(text) => setPhone(text)}
          />
          <Input
            placeholder={"Password"}
            name={"password"}
            id={"password"}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={styles.buttonGroup}>
            {error ? <Error message={error} /> : null}
          </View>
          <View style={styles.buttonGroup}>
            <EasyButton
              large
              primary
              onPress={() => register()}
            >
              <Text style={{ color: 'white' }}>Register</Text>
            </EasyButton>
          </View>
          <View style={styles.buttonGroup}>
            <EasyButton
              large
              secondary
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text style={{ color: 'white' }}>Back to login</Text>
            </EasyButton>
          </View>
        </FormContainer>
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  buttonGroup: {
    width: '80%',
    margin: 10,
    alignItems: 'center',
  }
})

export default Register;