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
            tabBar={props => <MyTabBar {...props}/>}
        >
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name='home'
                            style={{ position: 'relative' }}
                            color={color}
                            size={35}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Icon
                                name='shopping-cart'
                                color={color}
                                size={35}
                            />
                            <CartIcon />
                        </View>
                    )
                }}
            />
            {
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
                ) : null }
            <Tab.Screen
                name="User"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name='user'
                            color={color}
                            size={35}
                        />
                    )
                }}
            />
        </Tab.Navigator>

    )
}

export default Main;