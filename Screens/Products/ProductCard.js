import _ from 'lodash';
import React, { useContext, useState, useMemo } from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Button, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import AuthGlobal from '../../Context/store/AuthGlobal';
import { useTheme } from '../../Context/store/ThemeContext';
import * as actions from '../../Redux/Actions/cartActions';
import ModalRequiresLogin from '../../Shared/ModalRequiresLogin';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import { AddIcon, HeartIcon } from '../../Shared/StyledComponents/ListSvg';
import TextCustom from '../../Shared/StyledComponents/TextCustom';

var { width } = Dimensions.get("window");

const ProductCard = (props) => {

  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));
  const { stateUser: { isAuthenticated, userProfile } } = useContext(AuthGlobal);
  const [showModalLogin, setShowModalLogin] = useState(false);

  const closeModal = () => {
    setShowModalLogin(false);
  }

  const handleAddToCart = (product) => {
    if (isAuthenticated) {
      const dataCart = {
        idUser: userProfile._id || '',
        idProduct: product._id || '',
        idColorProduct: _.get(product, "colorProducts[0]._id", '' ),
        idSize: _.get(product, "colorProducts[0].sizeProducts[0]._id", ''),
        quantity: 1
      };
      props.addItemToCart(dataCart);
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: `${props.name} added to Cart`,
        text2: "Go to your cart to complete order"
      })
    } else {
      setShowModalLogin(true);
    }
  }

  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate("Product Detail", { item: props })}
    >
      { showModalLogin && <ModalRequiresLogin navigation={props.navigation} onClose={closeModal}/> }
      <View style={Styles.container}>
        {/* <View style={Styles.heartIcon}>
          <HeartIcon/>
        </View> */}
        <Image
          style={Styles.image}
          resizeMod='contain'
          source={{ uri: props.colorProducts[0].images[0] }}
        />
        <View style={Styles.card} />
        <TextCustom fontWeight={500} fontStyle="Medium" style={Styles.title}>
          {props.name.length > 20 ? props.name.substring(0, 20 - 3) + '...'
            : props.name}
        </TextCustom>
        <View style={Styles.numberColor}>
          <TextCustom fontSize={12} color="#f48c06" fontWeight={500} fontStyle="Medium">{props.colorProducts.length} Colors</TextCustom>
        </View>
        <View style={Styles.lastRow}>
          <View style={Styles.priceBox}>
            <TextCustom color="#f48c06" fontWeight={500} fontStyle="Medium">$</TextCustom>
            <TextCustom fontSize={17} fontWeight={500} fontStyle="Medium" color="#292929" style={{ marginLeft: 4 }}>{props.colorProducts[0].price}.0</TextCustom>
          </View>
          <View style={Styles.btnAdd}>
            <EasyButton
              justIcon
              onPress={() => handleAddToCart(props)}
            >
              <AddIcon />
            </EasyButton>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: (dataCart) => {
      dispatch(actions.addToCart(dataCart))
    }
  }
}

const createStyles = (theme) => {
  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      width: width / 2 - 15,
      height: width / 1.5,
      padding: 10,
      marginHorizontal: 5,
      borderRadius: 20,
      elevation: 8,
      backgroundColor: theme.backgroundPrimary,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: theme.borderBoldOrange,
      // shadowColor: '#e85d04',
      // shadowRadius: 5,
      // shadowOpacity: 0.2,
      // shadowOffset: {
      //   width: 0,
      //   height: 2
      // }
    },
    heartIcon: {
      position: 'absolute',
      zIndex: 1,
      top: 10,
      left: 10,
    },
    image: {
      width: width / 2 - 20 - 15,
      height: width / 2 - 20 - 30,
      borderRadius: 10,
      // transform: [{ rotate: '-15deg'}]
    },
    card: {
      marginBottom: 5,
      height: width / 20 - 20 - 90,
      backgroundColor: 'transparent',
      width: width / 2 - 20 - 10
    },
    title: {
      marginBottom: 5,
    },
    numberColor: {
      color: '#757575',
      alignSelf: 'flex-start',
    },
    lastRow: {
      marginTop: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    priceBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    price: {
      color: '#f48c06',
    },
    btnAdd: {
      elevation: 8,
      shadowColor: '#e85d04',
      shadowRadius: 5,
      shadowOpacity: 0.4,
      shadowOffset: {
        width: 0,
        height: 2
      }
    }
  })
  return styles
}

export default connect(null, mapDispatchToProps)(ProductCard);