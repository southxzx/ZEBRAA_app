import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Item, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import FormContainer from '../../../Shared/Form/FormContainer';
import Input from '../../../Shared/Form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import TextCustom from '../../../Shared/StyledComponents/TextCustom';
import { EditIcon } from '../../../Shared/StyledComponents/ListSvg';
import TearLines from "react-native-tear-lines";
import EasyButton from '../../../Shared/StyledComponents/EasyButton';
import { useTheme } from '../../../Context/store/ThemeContext';

const countries = require("../../../assets/data/120 countries.json");

const Checkout = (props) => {

  const { cartItem } = props;
  var totalFee = 0;
  cartItem.length && cartItem.forEach(cart => {
    return (totalFee += (cart.idColorProduct.price) * (cart.quantity))
  });
  const [orderItems, setOrderItems] = useState();
  const [shipmentActive, setShipmentActive] = useState(1);

  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));

  useEffect(() => {
    setOrderItems(props.cartItem);
    return () => {
      setOrderItems();
    }
  }, []);

  const selectShipmentMethod = (method) => {
    setShipmentActive(method);
  }

  const checkOut = () => {
    let checkoutData = {
      total: totalFee,
      shipmentFee: shipmentActive*5,
      address: "KTX D2, Lê Văn Việt, TP. Thủ Đức, TPHCM"
    }
    props.navigation.navigate("Payment", { order: checkoutData, cart: cartItem })
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.blockMoney}>
        <TextCustom color="#ccc" style={{ paddingBottom: 5 }}>SUMMARY</TextCustom>
        {/* <View style={Styles.lineMoney}>
          <TextCustom>Sub Total</TextCustom>
          <TextCustom fontSize={16} fontWeight={500} fontStyle="Medium" color="#f48c06">${total.subTotal}</TextCustom>
        </View>
        <View style={Styles.lineMoney}>
          <TextCustom>Shipping</TextCustom>
          <TextCustom fontSize={16} fontWeight={500} fontStyle="Medium" color="#f48c06">${total.shipping}</TextCustom>
        </View> */}
        <View style={Styles.lineMoney}>
          <TextCustom>Total</TextCustom>
          <TextCustom fontSize={16} fontWeight={500} fontStyle="Medium" color="#f48c06">${totalFee + shipmentActive*5}</TextCustom>
        </View>
      </View>

      <TextCustom fontWeight={500} fontStyle="Medium" style={{ paddingVertical: 10 }}>Delivery Address</TextCustom>

      <View style={Styles.blockAddress}>
        <TextCustom fontWeight={500} fontStyle="Medium">Đặng Phương Nam</TextCustom>
        <TextCustom>+84 32 762 5943</TextCustom>
        <TextCustom style={{ paddingTop: 10 }}>484A, Lê Văn Việt, P. Tăng Nhơn Phú A, TP. Thủ Đức, TP.HCM (Kí túc xá D2)</TextCustom>
        <TouchableOpacity style={Styles.editAddressBtn}>
          <EditIcon />
        </TouchableOpacity>
      </View>

      <TextCustom fontWeight={500} fontStyle="Medium" style={{ paddingVertical: 10 }}>Select Shipment Method</TextCustom>
      <View style={Styles.blockShipment}>
        <TouchableOpacity
          style={shipmentActive === 1 ? Styles.subBlockShipmentActive : Styles.subBlockShipment}
          onPress={() => selectShipmentMethod(1)}
        >
          <Image
            source={require('../../../assets/shipNormal.png')}
            style={{ width: 50, height: 50, marginRight: 20 }}
            resizeMode="contain"
          />
          <View style={Styles.desShipment}>
            <TextCustom fontWeight={500} fontStyle="Medium">Standard: $5</TextCustom>
            <TextCustom>Regularly take 3-5 days delivery</TextCustom>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={shipmentActive === 2 ? Styles.subBlockShipmentActive : Styles.subBlockShipment}
          onPress={() => selectShipmentMethod(2)}
        >
          <Image
            source={require('../../../assets/shipFast.png')}
            style={{ width: 50, height: 50, marginRight: 20 }}
            resizeMode="contain"
          />
          <View style={Styles.desShipment}>
            <TextCustom fontWeight={500} fontStyle="Medium">Fast: $10</TextCustom>
            <TextCustom>Delivery within a day</TextCustom>
          </View>
        </TouchableOpacity>
      </View>

      <EasyButton
        large
        primary
        onPress={() => checkOut()}
      >
        <TextCustom style={{ color: 'white' }}>Proceed to Payment</TextCustom>
      </EasyButton>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { cartItem } = state;
  return {
    cartItem: cartItem,
  }
}
const createStyles = (theme) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundPrimary,
      height: '100%',
      padding: 20,
    },
    blockMoney: {
      backgroundColor: theme.iconBg,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 10
    },
    lineMoney: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    blockAddress: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.borderLightOrange,
      backgroundColor: theme.backgroundPrimary,
      shadowColor: '#FFE4C4',
      shadowRadius: 5,
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 0,
        height: 2
      }
    },
    editAddressBtn: {
      position: 'absolute',
      right: 10,
      top: 10
    },
    blockShipment: {
  
    },
    subBlockShipmentActive: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: 'row',
      marginBottom: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#f48c06',
      backgroundColor: theme.backgroundPrimary,
      shadowColor: '#FFE4C4',
      shadowRadius: 5,
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 0,
        height: 2
      }
    },
    subBlockShipment: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: 'row',
      marginBottom: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.borderLightOrange,
      backgroundColor: theme.backgroundPrimary,
      shadowColor: '#FFE4C4',
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

export default connect(mapStateToProps, null)(Checkout);