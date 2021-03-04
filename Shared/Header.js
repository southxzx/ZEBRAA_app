import React from 'react';
import { StyleSheet, Image, SafeAreaView, View } from 'react-native';

const Header = () => {
    return (
        <SafeAreaView style={styles.header}>
            <Image 
                source={require('../assets/logo-nike.png')}
                resizeMod='contain'
                style={{height: 40, width: 100}}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        // marginTop: 100, // Todo: delete
    }
})

export default Header;