import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ProductCard from './ProductCard';

var { width, height } = Dimensions.get("window");

const ProductList = (props) => {

  const { item } = props;

  return (
    <View style={{
      backgroundColor: '#fbfbfb',
    }}>
      <ProductCard {...item} navigation={props.navigation} />
    </View>
  )
}


export default ProductList;