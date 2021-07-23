import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Stack 
import HomeNavigator from './HomeNavigator';
import CartNavigator from './CartNavigator';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';

//
import CartIcon from '../Shared/CartIcon';
import AuthGlobal from '../Context/store/AuthGlobal';
import MyTabBar from './MyTabBar';
import SearchNavigator from './SearchNavigator';


const Tab = createBottomTabNavigator();

const Main = () => {

  const context = useContext(AuthGlobal);
  return (
    <Tab.Navigator
      // initialRouteName="Home"
      // tabBarOptions={{
      //     keyboardHidesTabBar: true,
      //     showLabel: false,
      //     activeTintColor: '#391e63'
      // }}
      tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
      />
      {/* {
                context.stateUser.userProfile?.role === 'admin' ? (
                    <Tab.Screen
                        name="Admin"
                        component={AdminNavigator}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <Icon
                                    name='cog'
                                    color={color}
                                    size={35}
                                />
                            )
                        }}
                    />
                ) : null } */}
      <Tab.Screen
        name="User"
        component={UserNavigator}
      />
    </Tab.Navigator>

  )
}

export default Main;