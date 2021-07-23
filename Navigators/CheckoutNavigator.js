import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Screen
import Checkout from '../Screens/Carts/Checkout/Checkout';
import Payment from '../Screens/Carts/Checkout/Payment';
import Confirm from '../Screens/Carts/Checkout/Confirm';

// Custom tab bar
import MyCheckoutTabBar from './MyCheckoutTabBar';


const Tab = createMaterialTopTabNavigator();

function MyTab() {
  return (
    <Tab.Navigator
      swipeEnabled={false}
      tabBar={props => <MyCheckoutTabBar {...props} />}
    >
      <Tab.Screen name="Shipping" component={Checkout} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Confirm" component={Confirm} />
    </Tab.Navigator>
  );
}

export default function CheckoutNavigator() {
  return <MyTab />
}