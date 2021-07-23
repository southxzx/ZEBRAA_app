import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import TextCustom from './StyledComponents/TextCustom';
import * as _ from 'lodash';

const HoriCardProduct = ({ itemProduct }) => {

  const imageUrl = _.get(itemProduct, 'colorProducts[0].images[0]', '')
  const price = _.get(itemProduct, 'colorProducts[0].price', '')

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.imageProduct}
      />
      <View style={styles.infoProduct}>
        {/* <TextCustom>NEW COLLECTION</TextCustom> */}
        <TextCustom fontSize={18} fontWeight={300} fontStyle="Light" style={styles.nameProduct}>{itemProduct.name}</TextCustom>
        <View style={styles.priceBox}>
            <TextCustom color="#f48c06" fontWeight={500} fontStyle="Medium">$</TextCustom>
            <TextCustom fontSize={17} fontWeight={500} fontStyle="Medium" color="#f48c06" style={{ marginLeft: 4}}>{price}.0</TextCustom>
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: '100%',
    backgroundColor: '#f6f6f6',
    borderRadius: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#FFE4C4',
  },
  imageProduct: {
    position: 'absolute',
    alignSelf: 'center',
    overflow: 'hidden',
    top: -40,
    width: 200,
    height: 200,
  },
  infoProduct: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  nameProduct: {

  },
  priceBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default HoriCardProduct
