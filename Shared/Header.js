import React, { useState, useMemo } from 'react';
import { StyleSheet, Image, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../Context/store/ThemeContext';
import ModalSetting from './ModalSetting';
import { MenuIcon, SettingIcon } from './StyledComponents/ListSvg';

const Header = () => {

  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));
  const logoURL = theme.darkTheme ? require('../assets/logo-nike-darkmode.png') : require('../assets/logo-nike.png')
  const [showModalSetting, setShowModalSetting] = useState(false);
  const handleShowModalSetting = () => {
    setShowModalSetting(!showModalSetting);
  }

  return (
    <SafeAreaView style={Styles.header}>
      <View>
        <Image
          source={logoURL}
          style={Styles.logo}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity style={Styles.iconSetting} onPress={handleShowModalSetting}>
          <SettingIcon color={theme.ink} />
      </TouchableOpacity>
      { showModalSetting && <ModalSetting onClose={handleShowModalSetting}/> }
    </SafeAreaView>
  )
}

const createStyles = (theme) => {
  const styles = StyleSheet.create({
    header: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: theme.backgroundPrimary,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10, // Todo: delete
    },
    logo: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
      marginHorizontal: 15,
    },
    iconSetting: {
      // height: '90%',
      marginHorizontal: 15,
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: 10,
      justifyContent: 'center',
      shadowColor: '#757575',
      backgroundColor: theme.iconBg,
      shadowRadius: 5,
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 0,
        height: 2
      }
    }
  });
  return styles
}

export default Header;