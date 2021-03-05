import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ProductCard from './ProductCard'; 

var { width, height } = Dimensions.get("window");

const ProductList = (props) => {

    const {item} = props;

    return (
        <View style={{ 
                       backgroundColor: 'gainsboro',
                    }}>
            <ProductCard {...item}/>
        </View>
    )
}


export default ProductList;