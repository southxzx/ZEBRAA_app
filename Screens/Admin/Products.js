import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Header, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import baseURL from '../../assets/common/baseURL';
import AsyncStorage from '@react-native-community/async-storage';
import ListItem from './ListItem';

var { height, width } = Dimensions.get("window");

const Products = (props) => {

    const [productList, setProductList] = useState();
    const [productFilter, setProductsFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();

    useFocusEffect(
        // useCallback để tránh render lại khi có thay đổi về state
        useCallback(
            () => {
                // Get token 
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res);
                    })
                    .catch((err) => console.log(err))
                // Call api
                axios
                .post(`${baseURL}product/getAll`)
                .then((res) => {
                    // console.log(res.data.data);
                    setProductList(res.data.data);
                    setProductsFilter(res.data.data);
                    setLoading(false);
                })
                .catch((err) => console.log(err));

                return () => {
                    setProductList();
                    setProductsFilter();
                    setLoading(true);
                }
            },
            [],
        )
    )

    return (
        <View>
            <View>
                <Header searchBar rounded>
                    <Item style={{ padding: 5}}>
                        <Icon name="search"/>
                        <Input
                            placeholder={"Search"}
                            //onChange
                        />
                    </Item>
                </Header>
            </View>
            {loading ? (
                <View>
                    <ActivityIndicator size="large" color="red"/>
                </View>
            ) : (
                <FlatList
                    data={productFilter}
                    renderItem={({item, index}) => (
                        <ListItem
                            {...item}
                            navigation={props.navigation}
                            index={index}
                        />
                    )}
                    keyExtractor={(item) => item._id}
                />
            )}
        </View>
    );
}

export default Products;