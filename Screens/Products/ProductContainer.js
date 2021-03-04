import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Container, Header, Icon, Input, Item, Text } from 'native-base';

import ProductList from './ProductList';
import SearchedProduct from './SearchedProduct';
import Banner from '../../Shared/Banner';

const ProductContainer = () => {

    const [products,setProducts] = useState();
    const [productsFilter,setProductsFilter] = useState([]);
    const [focus, setFocus] = useState();

    useEffect(() => {

        setFocus(false);
        
        const FetchProduct = async () => {
            const data = await axios.post('https://tinhyeumaunang.herokuapp.com/api/product/getAll',{
                limit: 4,
                skip: 0,
                filters:{ 
                    category: ['5fe69f5270075d277c752092']
                }
            })
            setProducts(data.data.data);
            setProductsFilter(data.data.data);
        }
        FetchProduct();
        return () => {
            setProducts([]);
            setProductsFilter([]);
            setFocus();
        }
    }, [])

    const searchProduct = (text) => {
        setProductsFilter(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }

    return (
        <Container>
            <Header searchBar rounded >
                <Item>
                    <Icon name="ios-search"/>
                    <Input 
                        placeholder="Search"
                        onFocus={openList}
                        onChangeText={(text) => searchProduct(text)}
                    />
                    {focus == true ? (
                        <Icon name="ios-close" onPress={onBlur}/>
                    ) : null}
                </Item>
            </Header>
            {focus == true ? (
                <SearchedProduct
                    productsFilter={productsFilter}
                />
            ) : (
                <View>
                <View>
                    <Banner/>
                </View>
                <FlatList
                    data={products}
                    renderItem={({item}) => <ProductList item={item} key={item._id}/>}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                />
            </View>
            )}
        </Container>
    )
}

export default ProductContainer;