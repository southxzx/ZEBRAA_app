import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';
import baseURL from '../../assets/common/baseURL';
import { isEmpty } from "lodash";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
  console.log(JSON.stringify(user));
  fetch(`${baseURL}user/login`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).
    then((res) => res.json()).
    then((data) => {
      if (data) {
        const token = data.token;
        AsyncStorage.setItem("jwt", token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded, data.user)) // TODO
      } else {
        logoutUser(dispatch);
      }
    }).
    catch((err) => {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: "Please provide correct credentials",
        text2: ""
      });
      logoutUser(dispatch);
    });
}

export const getUserProfile = (dispatch) => {
  AsyncStorage.getItem("token").then(token => {
    fetch(`${baseURL}user/get-info`, {
      method: 'POST',
      body: JSON.stringify({ token: token }),
      headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json'
      },
    }).
    then((res) => res.json()).
    then((data) => {
      if (!isEmpty(data)){
        dispatch(setCurrentUser(data, data.user));
      } else {
        logoutUser(dispatch);
      }
    });
  });
}

export const logoutUser = (dispatch) => {
  AsyncStorage.removeItem("jwt");
  AsyncStorage.removeItem("token");
  dispatch(setCurrentUser({}))
}

// Action để dispatch qua reducer
export const setCurrentUser = (decoded = null, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user
  }
}

export const googleSignIn = (idToken, dispatch) => {
  // console.log(idToken);
  fetch(`${baseURL}user/googlelogin-ios`, {
    method: 'POST',
    body: JSON.stringify({ idToken: idToken }),
    headers: {
      'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
      'Content-Type': 'application/json'
    },
  }).
    then((res) => res.json()).
    then((data) => {
      const { token } = data;
      if (token){
        AsyncStorage.setItem("token", token).then(
          getUserProfile(dispatch)
        );
      }
    }).
    catch((error) => console.log(error));
}