import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Text, Left, Right, H1, ListItem, Thumbnail, Body } from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";
import { SwipeListView } from 'react-native-swipe-list-view';
import CartItem from './CartItem';
import TextCustom from '../../Shared/StyledComponents/TextCustom';

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import { DeleteIcon } from '../../Shared/StyledComponents/ListSvg';
import { useTheme } from '../../Context/store/ThemeContext';

var { width, height } = Dimensions.get("window");

const Cart = (props) => {

  const { cartItem } = props;
  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));

  var total = 0;
  cartItem.length && cartItem.forEach(cart => {
    return (total += (cart.idColorProduct.price) * (cart.quantity))
  });

  useEffect(() => {
      props.getCart();//
  }, []);

  return (
    <View style={Styles.container}>
      <View style={Styles.topCart}>
        <View style={Styles.largeTitle}>
          <TextCustom fontSize={22}>Shopping</TextCustom>
          <TextCustom fontSize={22} fontWeight={500} fontStyle="Medium">Cart</TextCustom>
        </View>
        <TouchableOpacity style={Styles.btnDelete} onPress={() => props.clearCart()}>
          <Icon name="trash" color={'#f48c06'} size={30} />
        </TouchableOpacity>
      </View>
      <View style={Styles.cartSection}>
        {cartItem.length ? (
          <>
            <ListItem style={{ borderBottomWidth: 0 }}>
              <SwipeListView
                data={cartItem}
                keyExtractor={(data) => data.idSize}
                renderItem={(data) => (
                  <CartItem item={data} key={data.idColorProduct} navigation={props.navigation}/>
                )}
                renderHiddenItem={(data) => (
                  <View style={Styles.hiddenContainer} key={data.item._id}>
                    <TouchableOpacity
                      style={Styles.hiddenButton}
                      onPress={() => props.removeFromCart(data.item._id)}
                    >
                      <Icon name="trash" color={"white"} size={30} />
                    </TouchableOpacity>
                  </View>
                )}
                disableRightSwipe={true}
                previewOpenDelay={3000}
                friction={1000}
                tension={40}
                leftOpenValue={75}
                stopLeftSwipe={75}
                rightOpenValue={-75}
              />
            </ListItem>
            <View style={Styles.bottomContainer}>
              <View style={Styles.infoCart}>
                <TextCustom fontSize={14} fontWeight={500} fontStyle="Medium" color={theme.ink75}>{cartItem.length} Items</TextCustom>
                <TextCustom fontSize={20} fontWeight={500} fontStyle="Medium">${total}.00</TextCustom>
              </View>
              <View style={Styles.nextBtn}>
                <EasyButton
                  primary
                  large
                  maxWidth
                  onPress={() => props.navigation.navigate("Checkout", { cart: cartItem })}
                >
                  <Text style={{ color: 'white' }}>Next</Text>
                </EasyButton>
              </View>
            </View>
          </>
        ) : (
          <View style={Styles.emptyContainer}>
            <TextCustom fontSize={24} color="#ccc" >Your cart is empty</TextCustom>
          </View>
        )}
      </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { cartItem } = state;
  return {
    cartItem: cartItem
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCart: () => dispatch(actions.getCart()),
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item))
  }
}
const createStyles = (theme) => {
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      position: 'relative',
      backgroundColor: theme.backgroundPrimary,
      paddingLeft: 20,
      paddingRight: 20,
    },
    topCart: {
      // backgroundColor: '#fbfbfb',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cartSection: {
      height: '100%',
      position: 'relative',
    },
    emptyContainer: {
      alignSelf: 'center',
      paddingVertical: 150,
    },
    bottomContainer: {
      width: '100%',
      position: 'absolute',
      bottom: 78,
      left: 0,
      elevation: 20,
      borderTopWidth: 1,
      borderColor: '#d7d7d7'
    },
    infoCart: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 10,
    },
    hiddenContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      flexDirection: 'row',
    },
    hiddenButton: {
      backgroundColor: '#f48c06',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingRight: 25,
      height: 70,
      width: width / 1.2,
      borderRadius: 10,
    },
    nextBtn: {
      marginBottom: 20,
      marginTop: 20,
    }
  });
  return styles
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);