import React, { useEffect, useState, useContext, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import Toast from 'react-native-toast-message';

import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input';
import Error from '../../Shared/Error';
import { loginValidationSchema } from '../../Shared/Form/ValidationSchema';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import TextCustom from '../../Shared/StyledComponents/TextCustom';
import { useTheme } from '../../Context/store/ThemeContext';

// Context API
import AuthGlobal from '../../Context/store/AuthGlobal';
import { loginUser, googleSignIn } from '../../Context/actions/Auth.actions';

// Authen fingerprint
import * as LocalAuthentication from 'expo-local-authentication';
import { checkFingerprintAvailable, LocalAuthenticationOptions } from '../../Utils/login';

// Google Auth
import * as Google from "expo-google-app-auth";

const Login = (props) => {

  const context = useContext(AuthGlobal);
  const [error, setError] = useState('');
  const [scanned, setScanned] = useState(false);
  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate("User Profile");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleOnSubmit = ({ email, password }) => {
    const user = {
      email,
      password,
    }
    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch)
    }
  }
  const signInAsync = async () => {
    try {
      const { type, user, idToken } = await Google.logInAsync({
        iosClientId: "631624789326-b615apsbnkil1l50ogm2mrbjn9kcvcsa.apps.googleusercontent.com",
        // androidClientId: `<YOUR_ANDROID_CLIENT_ID>`,
      });
      if (type === "success") {
        googleSignIn(idToken, context.dispatch);
      }
    } catch (error) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong with Google sign in!",
      })
    }
  };
  const signInFingerprint = async () => {
    if (checkFingerprintAvailable) {
      let result = await LocalAuthentication.authenticateAsync(LocalAuthenticationOptions);
      if (result.success) {
        setScanned(true);
        console.log("ok nha");
        const data = {
          email: "phuongnamsk1095@gmail.com",
          password: "Nam123@"
        }
        loginUser(data, context.dispatch)
      }
    } else {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: "Your device does not support fingerprint!"
      })
    }
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.largeTitle}>
        <TextCustom fontSize={28}>Hello,</TextCustom>
        <TextCustom fontSize={36} fontWeight={500} fontStyle="Medium" color="#f48c06" >Welcome!</TextCustom>
      </View>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={values => handleOnSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
          <FormContainer title={'Login'}>
            <Input
              placeholder={'Email address'}
              name={'email'}
              id={'email'}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {errors.email &&
              <Error message={errors.email} />
            }
            <Input
              placeholder={'Password'}
              name={'password'}
              id={'password'}
              value={values.password}
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
            />
            {errors.password &&
              <Error message={errors.password} />
            }
            <View style={Styles.buttonGroup}>
              {error ? <Error message={error} /> : null}
              <View style={{ flexDirection: 'row' }}>
                <EasyButton
                  large
                  primary
                  onPress={() => handleSubmit()}
                >
                  <Text style={{ color: 'white' }}>Login</Text>
                </EasyButton>
                <TouchableOpacity onPress={signInFingerprint}>
                  <Image
                    source={require('../../assets/fingerprint.png')}
                    style={Styles.iconFingerprint}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TextCustom fontSize={14} style={{ alignSelf: 'center', paddingTop: 10 }}>OR</TextCustom>
            <View style={Styles.loginSocialGroup}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/facebook.png')}
                  style={Styles.logoSocial}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={signInAsync}>
                <Image
                  source={require('../../assets/google-plus.png')}
                  style={Styles.logoSocial}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/twitter.png')}
                  style={Styles.logoSocial}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View style={Styles.signUpLine}>
              <TextCustom style={Styles.middleText}>Don't have an account yet?</TextCustom>
              <TouchableOpacity onPress={() => props.navigation.navigate("Register")} >
                <TextCustom style={Styles.linkSignUp} fontWeight={500} fontStyle="Medium" color="#f48c06" >Sign Up</TextCustom>
              </TouchableOpacity>
            </View>
          </FormContainer>
        )}
      </Formik>
    </View>
  )
}

const createStyles = (theme) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundPrimary,
    },
    largeTitle: {
      marginHorizontal: 40,
      // borderBottomWidth: 1,
      // borderBottomColor: theme.borderBoldOrange,
    },
    buttonGroup: {
      marginTop: 10,
      width: '70%',
      alignItems: 'center',
    },
    middleText: {
      marginBottom: 20,
      alignSelf: 'center',
    },
    loginSocialGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 20,
    },
    logoSocial: {
      width: 48,
      height: 48,
      marginHorizontal: 15,
    },
    signUpLine: {
      flexDirection: 'row',
      paddingTop: 40,
    },
    linkSignUp: {
      paddingHorizontal: 5,
    },
    iconFingerprint: {
      width: 48,
      height: 48,
      marginLeft: 15,
    }
  });
  return styles
}


export default Login;