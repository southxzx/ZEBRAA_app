import React from 'react';
import { StyleSheet, Image, SafeAreaView, View } from 'react-native';
import { MenuIcon } from './StyledComponents/ListSvg';

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <View>
        <Image
          source={require('../assets/logo-nike.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, // Todo: delete
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  }
})

export default Header;