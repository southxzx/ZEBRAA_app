import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';

import ProductList from './ProductList';

const ProductContainer = () => {

    const [products,setProducts] = useState();

    useEffect(() => {
        
        const FetchProduct = async () => {
            const data = await axios.post('https://tinhyeumaunang.herokuapp.com/api/product/getAll',{
                limit: 4,
                skip: 0,
                filters:{ 
                    category: ['5fe69f5270075d277c752092']
                }
            })
            setProducts(data.data.data);
        }
        FetchProduct();
        return () => {
            setProducts([]);
        }
    }, [])

    return (
        <View>
            <Text>Product Container</Text>
            <FlatList
                data={products}
                renderItem={({item}) => <ProductList item={item} key={item._id}/>}
                keyExtractor={(item) => item._id}
                numColumns={2}
            />
        </View>
    )
}

export default ProductContainer;