import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { Container, Header, Icon, Input, Item, Text } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';

import ProductList from './ProductList';
import SearchedProduct from './SearchedProduct';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';

import baseURL from '../../assets/common/baseURL';

var { height } = Dimensions.get('window');

const ProductContainer = (props) => {

    const [products,setProducts] = useState();
    const [productsFilter,setProductsFilter] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState();
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState();
    const [loading, setLoading] = useState(true);

    useFocusEffect((
        useCallback(
            () => {
                setFocus(false);
                setActive(-1);
        
                const FetchCategories = async () => {
                    const cate = await axios.get(`${baseURL}category/get`);
                    setCategories(cate.data);
                }
            
                const FetchProduct = async () => {
                    const data = await axios.post(`${baseURL}product/getAll`,{
                        limit: 8,
                        skip: 0,
                        filters:{ 
                            // category: ['5fe69f5270075d277c752092']
                        }
                    })
                    setProducts(data.data.data); 
                    setProductsFilter(data.data.data); // For Search product
                    setInitialState(data.data.data);
                    setProductsCtg(data.data.data);
                    setLoading(false);
                }
        
                FetchProduct();
                FetchCategories();
        
                return () => {
                    setProducts([]);
                    setProductsFilter([]);
                    setFocus();
                    setCategories([]);
                    setActive();
                    setInitialState();
                }
            },
        [],
    ))
    )


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

    // categories

    const changeCategory = (ctg) => {
        {
            ctg === 'all' 
            ? [setProductsCtg(initialState), setActive(true)]
            : [setProductsCtg(products.filter((i) => i.category._id === ctg)), setActive(true)]
        }
    }

    return (
        <>
        {loading == false ? (
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
                    navigation={props.navigation}
                />
            ) : (
            <ScrollView>
                <View>
                    <Banner/>
                </View>
                <View>
                    <CategoryFilter
                        categories={categories}
                        categoryFilter={changeCategory}
                        productsCtg={productsCtg}
                        active={active}
                        setActive={setActive}
                    />
                </View>
                {productsCtg.length > 0 ? (
                    <View style={styles.listContainer}>
                        {productsCtg.map((item) => {
                            return (
                                <ProductList
                                    key={item._id}
                                    item={item}
                                    navigation={props.navigation}
                                />
                            )
                        })}
                    </View>
                ): (
                    <View style={[styles.center, {height: height/2}]}>
                        <Text style={{color: '#cecece'}}>No product founds </Text>
                    </View>
                )}
            </ScrollView>
            )}
        </Container>
        ) : (
            // loading
            <Container style={[styles.center, { backgroundColor: '#f2f2f2', height: height}]}>
                <ActivityIndicator
                    size="large"
                    color="red"
                />
            </Container>
        )}
    </>
    )
}
const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
      },
      listContainer: {
        height: '100%',
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro", 
        paddingHorizontal: 5,
        paddingVertical: 5,
      },
      center: {
          justifyContent: 'center',
          alignItems: 'center',
      }
})

export default ProductContainer;
