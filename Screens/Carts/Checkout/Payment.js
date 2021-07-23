import React, { useState, useContext, useMemo } from 'react';
import { View, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';
import TextCustom from '../../../Shared/StyledComponents/TextCustom';
import EasyButton from '../../../Shared/StyledComponents/EasyButton';
import AuthGlobal from '../../../Context/store/AuthGlobal';
import orderService from '../../../Service/ordersService';
import { useTheme } from '../../../Context/store/ThemeContext';

const Payment = (props) => {

  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));
  const { stateUser: { userProfile }, dispatch } = useContext(AuthGlobal);
  let order2 = {}; let cart2 = {};
  if (props.route.params){
    const { order, cart } = props.route.params;
    order2 = order; cart2 = cart;
  }
  const paymentList = [
    { name: "Cash On Delivery", img: require('../../../assets/cash.png'), value: "cash" },
    { name: "Credit Card", img: require('../../../assets/mastercard.png'), value: "credit" },
    { name: "Credit Card", img: require('../../../assets/paypal.png'), value: "paypal" }
  ]

  const [checked, setChecked] = useState('cash');
  const [card, setCard] = useState();

  const placeOrder = () => {
    const dataOrder = {
      idUser: userProfile._id,
      cart: cart2,
      status: "Confirming",
      payment: checked,
      shipment:"Standard",
      note:"k",
      name: userProfile.name,
      address: order2.address,
      phone:"3333333",
      totalRaw: order2.total,
      shipmentFee: order2.shipmentFee,
      discount:"0",
      totalOrder: order2.total,
    }
    orderService.placeOrder(dataOrder);
  }

  return (
    <View style={Styles.container}>
      <TextCustom fontSize={16} fontWeight={500} fontStyle="Medium">Select your payment</TextCustom>
      <View style={Styles.blockPayment}>
        {
          paymentList.map((payment) =>
            <TouchableOpacity style={Styles.payment} key={payment.value} onPress={() => setChecked(payment.value)}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={Styles.logoPayment}>
                  <Image source={payment.img} style={{ width: 50, height: 40, padding: 5 }} resizeMode="contain" />
                </View>
                <View>
                  <TextCustom fontWeight={500} fontStyle="Medium">{payment.name}</TextCustom>
                </View>
              </View>
              <RadioButton
                value={payment.value}
                status={checked === payment.value ? 'checked' : 'unchecked'}
                onPress={() => setChecked(payment.value)}
                color="#f48c06"
              />
            </TouchableOpacity>
          )
        }

      </View>
      <View style={Styles.button}>
        <EasyButton
          large
          primary
          onPress={placeOrder}
        >
          <TextCustom style={{ color: 'white' }}>Pay</TextCustom>
        </EasyButton>
      </View>
    </View>
  )
}

const createStyles = (theme) => {
  const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundPrimary,
    height: '100%',
    padding: 20,
  },
  blockPayment: {
    marginTop: 20,
    padding: 10,
  },
  payment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoPayment: {
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
    margin: 10,
  },
  checkBox: {
    backgroundColor: '#000',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    margin: 20,
  }
  })
  return styles;
}

export default Payment;