import React, { useContext, useState, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Content, ListItem, Icon, Left, Body, Right } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';
import baseURL from '../../assets/common/baseURL';
import AuthGlobal from '../../Context/store/AuthGlobal';
import { logoutUser } from '../../Context/actions/Auth.actions';
import { AddIcon, SettingIcon } from '../../Shared/StyledComponents/ListSvg';
import TextCustom from '../../Shared/StyledComponents/TextCustom';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

// context
import { useTheme } from '../../Context/store/ThemeContext';

var { height, width } = Dimensions.get('window');

const UserProfile = (props) => {

  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState('');
  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));

  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
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
  }, [context.stateUser.isAuthenticated]);

  const urlAvatarDefault = 'https://res.cloudinary.com/zebraa/image/upload/v1622948378/default-user_gcwpps.png';

  return (
    <Container style={Styles.container}>
      <View style={Styles.avatarBlock}>
        <Image
          source={{ uri: userProfile?.avatar ? userProfile.avatar : urlAvatarDefault }}
          style={Styles.avatar}
          resizeMode="contain"
        />
        <View style={Styles.buttonUpload}>
          <AddIcon />
        </View>
      </View>
      <TextCustom fontSize={24} style={{ alignSelf: 'center' }}>{userProfile ? userProfile.name : ""}.</TextCustom>
      <Content style={Styles.content}>
        <ListItem icon style={Styles.listItem}>
          <Left>
            <SettingIcon color={theme.ink} />
          </Left>
          <Body>
            <TextCustom fontWeight={500} fontStyle="Medium">Account Setting</TextCustom>
          </Body>
        </ListItem>
        <ListItem icon style={Styles.listItem}>
          <Left>
            <SettingIcon color={theme.ink} />
          </Left>
          <Body>
            <TextCustom fontWeight={500} fontStyle="Medium">Your Orders</TextCustom>
          </Body>
        </ListItem>
        <ListItem icon style={Styles.listItem}>
          <Left>
            <SettingIcon color={theme.ink} />
          </Left>
          <Body>
            <TextCustom fontWeight={500} fontStyle="Medium">Purchase History</TextCustom>
          </Body>
        </ListItem>
        <ListItem icon style={Styles.listItem}>
          <Left>
            <SettingIcon color={theme.ink} />
          </Left>
          <Body>
            <TextCustom fontWeight={500} fontStyle="Medium">Change Password</TextCustom>
          </Body>
        </ListItem>
        <ListItem icon style={Styles.listItem}>
          <Left>
            <SettingIcon color={theme.ink} />
          </Left>
          <Body>
            <TextCustom fontWeight={500} fontStyle="Medium">Guide Program</TextCustom>
          </Body>
        </ListItem>
      </Content>
      <View style={{ margin: 20, width: '80%' }}>
        <EasyButton
          large
          primary
          onPress={() => logoutUser(context.dispatch)}
        >
          <Text style={{ color: 'white', alignSelf: 'center'}}>Sign Out</Text>
        </EasyButton>
      </View>
    </Container>
  )
}
const createStyles = (theme) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: theme.backgroundPrimary,
    },
    subContainer: {
      marginTop: 10,
    },
    avatarBlock: {
      position: 'relative',
      alignSelf: 'center',
      paddingVertical: 20,
      maxWidth: 100,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    buttonUpload: {
      position: 'absolute',
      right: 0,
      bottom: 20,
      backgroundColor: '#f48c06',
      padding: 5,
      borderRadius: 50,
    },
    content: {
      marginTop: 20,
    },
    listItem: {
      width: width,
      margin: 5,
      paddingLeft: 5,
    }
  });
  return styles
}

export default UserProfile;