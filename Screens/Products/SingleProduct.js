import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, Button, TouchableOpacity } from 'react-native';
import { Left, Right, Container, H1 } from 'native-base';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import Toast from 'react-native-toast-message';
import TrafficLight from '../../Shared/StyledComponents/TrafficLight';

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item)
  const [availability, setAvailability] = useState();
  const [availabilityText, setAvailabilityText] = useState('');
  const [active, setActive] = useState({
    'thumnail': 0,
    'color': 0,
    'size': 0,
  })

  useEffect(() => {
    if (!props.route.params.item.colorProducts[0].sizeProducts[0]) {
      setAvailability(<TrafficLight unavailable></TrafficLight>);
      setAvailabilityText("This product doesn't have any size!");
    }
    else {
      if (props.route.params.item.colorProducts[0].sizeProducts[0]
        && props.route.params.item.colorProducts[0].sizeProducts[0].quantity == 0) {
        setAvailability(<TrafficLight unavailable></TrafficLight>);
        setAvailabilityText("Unavailable");
      }
      else {
        if (props.route.params.item.colorProducts[0].sizeProducts[0]
          && props.route.params.item.colorProducts[0].sizeProducts[0].quantity <= 10) {
          setAvailability(<TrafficLight limited></TrafficLight>);
          setAvailabilityText("Limited Stock");
        }
        else {
          setAvailability(<TrafficLight available></TrafficLight>);
          setAvailabilityText("Available");
        }
      }
    }

    return () => {
      setAvailability(null);
      setAvailabilityText("");
    }
  }, [])

  const handleActiveItem = (type, index) => {
    let activeState = { ...active }
    activeState[type] = index;
    setActive(activeState);
  }

  return (
    <Container style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            source={{ uri: item.colorProducts[active.color].images[active.thumnail] }}
            resizeMod="container"
            style={styles.image}
          />
          <View style={styles.otherImages}>
            {item.colorProducts[active.color].images.map((itemOtherImage, index) =>
              <TouchableOpacity
                key={index}
                style={{ width: '18%' }}
                onPress={(e) => handleActiveItem('thumnail', index)}
              >
                <Image
                  source={{ uri: itemOtherImage }}
                  style={active.thumnail === index ? styles.otherImageSelected : styles.otherImageItem}
                  resizeMod="container"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.contentContainer}>
          <H1 style={styles.contentHeader}>{item.name}</H1>
        </View>

        {/* Color */}
        <View>
          <Text style={styles.contentText}>Color:</Text>
          <View style={styles.colorImages}>
            {item.colorProducts.map((itemColorProduct, index) =>
              <TouchableOpacity
                key={index}
                style={{ width: '18%', marginRight: 4, marginBottom: 10, marginLeft: 4 }}
                onPress={(e) => handleActiveItem('color', index)}
              >
                <Image
                  source={{ uri: itemColorProduct.images[0] }}
                  style={active.color === index ? styles.otherImageSelected : styles.otherImageItem}
                  resizeMod="container"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Size */}
        <View>
          <Text style={styles.contentText}>Size:</Text>
          <View style={styles.colorImages}>
            {item.colorProducts[active.color].sizeProducts.map((itemSizeProduct, index) =>
              <TouchableOpacity
                key={index}
                style={{ width: '10%', marginRight: 4, marginBottom: 10, marginLeft: 4 }}
                onPress={(e) => handleActiveItem('size', index)}
              >
                <Text style={active.size === index ? [styles.sizeItem, styles.sizeItemSelected] : styles.sizeItem}>{itemSizeProduct.size.name}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* TODO: Description, Rich des and Availability */}
        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{ marginRight: 10 }}>
              Availability: {availabilityText}
            </Text>
            {availability}
          </View>
          <Text style={styles.contentText}>{item.category.name}</Text>
          <Text>{item.description}</Text>
        </View>

        {/* Review */}
        <View>

        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Left>
          <View style={styles.leftView}>
            <Text style={styles.price}>${item.colorProducts[active.color].price}</Text>
            <Text style={styles.discount}>30% off</Text>
          </View>
        </Left>
        <Right>
          <EasyButton
            primary
            medium
            onPress={() => {
              props.addItemToCart(item),
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${item.name} added to Cart`,
                  text2: "Go to your cart to complete order"
                })
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text>
          </EasyButton>
        </Right>
      </View>
    </Container>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: (product) => {
      dispatch(actions.addToCart({ quantity: 1, product }))
    }
  }
}

export default connect(null, mapDispatchToProps)(SingleProduct);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',

  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0
  },
  image: {
    width: '100%',
    height: 250,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeader: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
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
  availabilityContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  availability: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  otherImages: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  colorImages: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  otherImageItem: {
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  otherImageSelected: {
    height: 80,
    borderWidth: 2,
    borderColor: '#e76f51',
    borderRadius: 10,
  },
  sizeItem: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    paddingBottom: 5,
    paddingTop: 5,
  },
  sizeItemSelected: {
    borderColor: '#e76f51',
  }
})