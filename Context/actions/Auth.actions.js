import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-toast-message';
import baseURL from '../../assets/common/baseURL';

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
    // console.log(JSON.stringify(user));
    fetch(`${baseURL}user/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).
    then((res) => res.json()).
    then((data) =>{
        if (data){
            //console.log(data);
            const token = data.token;
            AsyncStorage.setItem("jwt", token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded, data.user)) // TODO
        } else {
            logoutUser(dispatch);
        }
    }).
    catch((err) =>{
        Toast.show({
            topOffset: 60,
            type: 'error',
            text1: "Please provide correct credentials",
            text2: ""
        });
        logoutUser(dispatch);
    });
}

export const getUserProfile = (id) => {
    fetch(`${baseURL}user/${id}`,{
        method : 'GET',
        body: JSON.stringify(user),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    }).
    then((res) => res.json()).
    then((data) => console.log(data));
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}

// Cái trung tâm để dispatch qua reducer
export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}