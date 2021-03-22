import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { Header, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import baseURL from '../../assets/common/baseURL';
import AsyncStorage from '@react-native-community/async-storage';
import ListItem from './ListItem';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

var { height, width } = Dimensions.get("window");

const ListHeader = () => {
    return (
        <View
            elevation={1}
            style={styles.listHeader}
        >
            <View style={styles.headerItem}></View>
            <View style={styles.headerItem1}>
                <Text style={{ fontWeight: 'bold' }}>Name</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: 'bold' }}>Cate</Text>
            </View>
            <View>
                <Text style={[styles.headerItem2, { fontWeight: 'bold' }]}>Price</Text>
            </View>
        </View>
    )
}

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

    const searchProduct = (text) => {
        if (text == "") {
            setProductsFilter(productList);
        }
        setProductsFilter(
            productList.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("Orders")}
                >
                    <Icon name="shopping-bag" size={18} color="white" />
                    <Text style={styles.buttonText}>Orders</Text>
                </EasyButton>
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("ProductForm")}
                >
                    <Icon name="plus" size={18} color="white" />
                    <Text style={styles.buttonText}>Products</Text>
                </EasyButton>
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("Categories")}
                >
                    <Icon name="plus" size={18} color="white" />
                    <Text style={styles.buttonText}>Category</Text>
                </EasyButton>
            </View>
            <View>
                <Header searchBar rounded>
                    <Item style={{ padding: 5 }}>
                        <Icon name="search" />
                        <Input
                            placeholder={"Search"}
                            onChangeText={(text) => searchProduct(text)}
                        />
                    </Item>
                </Header>
            </View>
            {loading ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            ) : (
                <FlatList
                    data={productFilter}
                    ListHeaderComponent={ListHeader}
                    renderItem={({ item, index }) => (
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

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'gainsboro',
    },
    headerItem: {
        margin: 3,
        width: width / 6
    },
    headerItem1: {
        margin: 3,
        width: width / 3
    },
    headerItem2: {
        textAlign: 'right',
        margin: 3,
        width: width / 5
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        margin: 10,
    },
    container: {
        marginBottom: 160,
        backgroundColor: 'white'
    },
})

export default Products;