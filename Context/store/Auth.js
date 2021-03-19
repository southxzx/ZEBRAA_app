import React, {useReducer, useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

import authReducer from '../reducers/Auth.reducer';
import { setCurrentUser } from '../actions/Auth.actions';
import AuthGlobal from './AuthGlobal';
import AsyncStorage from '@react-native-community/async-storage';

const Auth = props => {
    const [stateUser, dispatch] = useReducer(authReducer, {
        isAuthenticated: null,
        user: {},
        userProfile: {}
    });

    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
        if (AsyncStorage.jwt){
            const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : "";
            if (setShowChild) {
                dispatch(setCurrentUser(jwt_decode(decoded)))
            }
        }
        return () => setShowChild(false);
    }, [])

    if (!showChild){
        return null;
    } else {
        return (
            <AuthGlobal.Provider
                value={{
                    stateUser,
                    dispatch
                }}
                // stateUser là để lấy tới chỗ khác
                // dispatch là để gọi từ chỗ khác
            >
                {props.children}
            </AuthGlobal.Provider>
        )
    }
}

export default Auth;