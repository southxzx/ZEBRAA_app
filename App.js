import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// Redux 
import { Provider } from 'react-redux';
import store from './Redux/store';

// Context api
import Auth from './Context/store/Auth';
import { Theme } from './Context/store/ThemeContext';

//Navigators
import Main from './Navigators/Main';

//Screens
import Header from './Shared/Header';
import ProductContainer from './Screens/Products/ProductContainer'


LogBox.ignoreAllLogs(true);

export default function App() {


  return (
    <Auth>
      <Theme>
        <Provider store={store}>
          <NavigationContainer>
            <Header />
            <Main />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </NavigationContainer>
        </Provider>
      </Theme>
    </Auth>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
