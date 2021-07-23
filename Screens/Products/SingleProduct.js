import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Image, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import TextCustom from '../../Shared/StyledComponents/TextCustom';

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import Toast from 'react-native-toast-message';
import StarRating from '../../Shared/StarRating';
import { BackIcon, HeartIconFill } from '../../Shared/StyledComponents/ListSvg';
import { useTheme } from '../../Context/store/ThemeContext';
import AuthGlobal from '../../Context/store/AuthGlobal';

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item)
  const [active, setActive] = useState({
    'thumnail': 0,
    'color': 0,
    'size': 0,
  });
  const { stateUser: { isAuthenticated, userProfile } } = useContext(AuthGlobal);
  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));

  const handleActiveItem = (type, index) => {
    let activeState = { ...active }
    activeState[type] = index;
    setActive(activeState);
  }

  const addItemToCart = (item) => {
    if (isAuthenticated){
      const dataCart = {
        idUser: userProfile._id || '',
        idProduct: item._id || '',
        idColorProduct: item.colorProducts[active.color]._id || '',
        idSize: item.colorProducts[active.color].sizeProducts[active.size]._id || '',
        quantity: 1
      }
      props.addItemToCart(dataCart);
    }
  }

  // const callAvgRating

  return (
    <Container style={Styles.container}>
      <View style={Styles.topButton}>
        <TouchableOpacity style={Styles.backBtn} onPress={() => props.navigation.navigate("Home")}>
          <BackIcon color={theme.ink} />
        </TouchableOpacity>
        <View style={Styles.backBtn}>
          <HeartIconFill />
        </View>
      </View>
      <ScrollView style={{}}>
        <View style={Styles.imageBlock}>
          <View style={Styles.imageContainer}>
            <Image
              source={{ uri: item.colorProducts[active.color].images[active.thumnail] }}
              resizeMode="center"
              style={Styles.image}
            />
          </View>
          <View style={Styles.otherImages}>
            {item.colorProducts[active.color].images.map((itemOtherImage, index) =>
              <TouchableOpacity
                key={index}
                style={{ width: '18%' }}
                onPress={(e) => handleActiveItem('thumnail', index)}
              >
                <Image
                  source={{ uri: itemOtherImage }}
                  style={active.thumnail === index ? Styles.otherImageSelected : Styles.otherImageItem}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={Styles.infoBlock}>

          {/* Price Block */}
          <View style={Styles.contentContainer}>
            <TextCustom fontWeight={500} fontStyle="Medium" fontSize={18} style={Styles.contentHeader}>{item.name}</TextCustom>
            <View style={Styles.priceRating}>
              <View style={Styles.priceBox}>
                <TextCustom fontSize={16} color="#f48c06" fontWeight={500} fontStyle="Medium">$</TextCustom>
                <TextCustom fontSize={22} fontWeight={500} fontStyle="Medium" color="#292929" style={{ marginLeft: 4 }}>{item.colorProducts[active.color].price}</TextCustom>
              </View>
              <StarRating score={4} />
            </View>
          </View>

          {/* Size */}
          <View style={Styles.sizeContainer}>
            <TextCustom fontSize={14} fontWeight={500} fontStyle="Medium" style={Styles.contentText}>Available Sizes</TextCustom>
            <View style={Styles.colorImages}>
              {item.colorProducts[active.color].sizeProducts.map((itemSizeProduct, index) =>
                <React.Fragment key={index}>
                  {
                    itemSizeProduct.quantity <= 0 ? (
                      <View style={{ width: '15%', marginRight: 4, marginBottom: 10, marginLeft: 4 }} key={index} >
                        <TextCustom fontSize={12} fontWeight={500} fontStyle="Medium" style={[Styles.sizeItem, Styles.sizeItemDisabled]}>US {itemSizeProduct.size.name}</TextCustom>
                      </View>
                    ) : (
                      <TouchableOpacity
                        key={index}
                        style={{ width: '15%', marginRight: 4, marginBottom: 10, marginLeft: 4 }}
                        onPress={(e) => handleActiveItem('size', index)}
                      >
                        <TextCustom fontSize={12} fontWeight={500} fontStyle="Medium" style={active.size === index ? [Styles.sizeItem, Styles.sizeItemSelected] : Styles.sizeItem}>US {itemSizeProduct.size.name}</TextCustom>
                      </TouchableOpacity>
                    )
                  }
                </React.Fragment>
              )}
            </View>
          </View>

          {/* Color */}
          <View style={Styles.sizeContainer}>
            <TextCustom fontSize={14} fontWeight={500} fontStyle="Medium" style={Styles.contentText}>Available Colors</TextCustom>
            <View style={Styles.colorImages}>
              {item.colorProducts.map((itemColorProduct, index) =>
                <TouchableOpacity
                  key={index}
                  style={{ width: '18%', marginRight: 4, marginBottom: 10, marginLeft: 4 }}
                  onPress={(e) => handleActiveItem('color', index)}
                >
                  <Image
                    source={{ uri: itemColorProduct.images[0] }}
                    style={active.color === index ? Styles.otherImageSelected : Styles.otherImageItem}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* TODO: Description, Rich des and Availability */}
          <View style={Styles.desContainer}>
            <TextCustom fontSize={14} fontWeight={500} fontStyle="Medium" style={Styles.contentText}>Description</TextCustom>
            <TextCustom color={theme.darkTheme ? "#fff" : "#757575"}>{item.description}</TextCustom>
          </View>

          {/* Review */}
          <View>

          </View>

        </View>
      </ScrollView>

      <TouchableOpacity
        style={Styles.addCartBtn}
        onPress={() => {
          addItemToCart(item),
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: `${item.name} added to Cart`,
              text2: "Go to your cart to complete order"
            })
        }}
      >
        <Image
          source={require('../../assets/add-to-basket.png')}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>
    </Container>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: (dataCart) => {
      dispatch(actions.addToCart(dataCart))
    }
  }
}

export default connect(null, mapDispatchToProps)(SingleProduct);

const createStyles = (theme) => {
  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      height: '100%',
      backgroundColor: theme.backgroundPrimary,
    },
    topButton: {
      position: 'absolute',
      zIndex: 1,
      display: 'flex',
      flexDirection: 'row',
      width: '90%',
      justifyContent: 'space-between',
      top: 15,
      alignSelf: 'center',
    },
    backBtn: {
      backgroundColor: theme.backgroundPrimary,
      borderColor: '#d7d7d7',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      shadowColor: '#757575',
      shadowRadius: 5,
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 0,
        height: 2
      }
    },
    infoBlock: {
      backgroundColor: theme.backgroundPrimary,
      borderRadius: 30,
      padding: 20,
    },
    imageContainer: {
      backgroundColor: '#f6f6f6',
      padding: 0,
      margin: 0,
      width: '100%',
      height: 300,
    },
    image: {
      width: '100%',
      height: 250,
    },
    imageBlock: {
      position: 'relative',
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 10,
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    contentHeader: {
      width: '70%',
      textTransform: 'uppercase',
      marginBottom: 20,
    },
    contentText: {
      marginBottom: 10,
    },
    bottomContainer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 10,
      right: 10,
      left: 10,
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3.84,
      elevation: 5,
    },
    leftView: {
      margin: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    price: {
      fontSize: 24,
    },
    discount: {
      marginLeft: 15,
      color: 'green',
    },
    desContainer: {
      marginBottom: 10,
      alignItems: 'center',
    },
    otherImages: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 15,
      alignItems: 'center',
      width: '100%',
    },
    colorImages: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      flexWrap: 'wrap'
    },
    otherImageItem: {
      backgroundColor: '#f6f6f6',
      height: 50,
      width: 60,
      borderWidth: 1,
      borderColor: '#d7d7d7',
      borderRadius: 15,
    },
    otherImageSelected: {
      height: 50,
      width: 60,
      borderWidth: 2,
      borderColor: '#f48c06',
      backgroundColor: '#f6f6f6',
      borderRadius: 15,
    },
    sizeItem: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#d7d7d7',
      borderRadius: 10,
      textAlign: 'center',
      paddingBottom: 5,
      paddingTop: 5,
    },
    sizeItemSelected: {
      borderColor: '#f48c06',
      backgroundColor: '#f48c06',
      borderRadius: 10,
      color: '#fff',
      overflow: 'hidden',
    },
    sizeItemDisabled: {
      opacity: 0.2
    },
    priceBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 5,
    },
    priceRating: {
      alignItems: 'center',
    },
    sizeContainer: {
    },
    addCartBtn: {
      position: 'absolute',
      padding: 20,
      borderRadius: 50,
      backgroundColor: '#f48c06',
      right: 15,
      bottom: 15,
      shadowColor: '#e85d04',
      shadowRadius: 5,
      shadowOpacity: 0.3,
      shadowOffset: {
        width: 0,
        height: 2
      }
    }
  })
  return styles
}