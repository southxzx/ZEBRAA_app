import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { Container } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';
import baseURL from '../../assets/common/baseURL';
import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.actions';


const UserProfile = (props) => {

    const context = useContext(AuthGlobal);
    const [userProfile, setUserProfile] = useState('');

    useEffect(() => {
        if (
            context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null
        ){
            props.navigation.navigate("Login");
        }

        // Truờng hợp get user by ID
        // AsyncStorage.getItem("jwt")
        //     .then((res) => {
        //         axios.get(`${baseURL}user/${context.stateUser.user._id}`, {
        //             headers: { Authorization: `Bearer ${res}` },
        //         })
        //         .then((user) => setUserProfile(user.data))
        //     })
        //     .catch((error) => console.log(error));
        setUserProfile(context.stateUser.userProfile);

        return () => {
            setUserProfile();
        }
    }, [context.stateUser.isAuthenticated])

    return (
        <Container style={styles.container}>
            <ScrollView contentContainerStyle={styles.subContainer}>
                <Text style={{fontSize: 30}}>
                    {userProfile ? userProfile.name : ""}
                </Text>
                <View style={{marginTop: 20}}>
                    <Text style={{margin: 10}}>
                        Email: {userProfile ? userProfile.email : ""}
                    </Text>
                    <Text style={{margin: 10}}>
                        Role: {userProfile ? userProfile.role : ""}
                    </Text>
                </View>
                <View style={{marginTop: 80}}>
                    <Button title={"Sign Out"} onPress={() => [
                        AsyncStorage.removeItem("jwt"),
                        logoutUser(context.dispatch)
                    ]}/>
                </View>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    subContainer: {
        alignItems: 'center',
        marginTop: 60
    }
})

export default UserProfile;