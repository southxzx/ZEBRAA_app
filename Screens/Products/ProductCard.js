import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Button, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import { AddIcon, HeartIcon } from '../../Shared/StyledComponents/ListSvg';
import TextCustom from '../../Shared/StyledComponents/TextCustom';

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate("Product Detail", { item: props })}
    >
      <View style={styles.container}>
        {/* <View style={styles.heartIcon}>
          <HeartIcon/>
        </View> */}
        <Image
          style={styles.image}
          resizeMod='contain'
          source={{ uri: props.colorProducts[0].images[0] }}
        />
        <View style={styles.card} />
        <TextCustom fontWeight={500} fontStyle="Medium" style={styles.title} color="#292929">
          {props.name.length > 20 ? props.name.substring(0, 20 - 3) + '...'
            : props.name}
        </TextCustom>
        <View style={styles.numberColor}>
          <TextCustom fontSize={12} color="#f48c06" fontWeight={500} fontStyle="Medium">{props.colorProducts.length} Colors</TextCustom>
        </View>
        <View style={styles.lastRow}>
          <View style={styles.priceBox}>
            <TextCustom color="#f48c06" fontWeight={500} fontStyle="Medium">$</TextCustom>
            <TextCustom fontSize={17} fontWeight={500} fontStyle="Medium" color="#292929" style={{ marginLeft: 4}}>{props.colorProducts[0].price}.0</TextCustom>
          </View>
          <View style={styles.btnAdd}>
            <EasyButton
              justIcon
              onPress={() => {
                props.addItemToCart(props),
                  Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: `${props.name} added to Cart`,
                    text2: "Go to your cart to complete order"
                  })
              }}
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
    addItemToCart: (product) => {
      dispatch(actions.addToCart({ quantity: 1, product }))
    }
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: width / 2 - 15,
    height: width / 1.5,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    elevation: 8,
    backgroundColor: "white",
    marginVertical: 10,
    shadowColor: '#e85d04',
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2
    }
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

export default connect(null, mapDispatchToProps)(ProductCard);