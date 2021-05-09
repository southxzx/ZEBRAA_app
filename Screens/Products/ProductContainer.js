import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Container, Header, Icon, Input, Item, Text } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';

import ProductList from './ProductList';
import SearchedProduct from './SearchedProduct';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';

import baseURL from '../../assets/common/baseURL';
import { SearchIcon, SettingIcon } from '../../Shared/StyledComponents/ListSvg';

var { height, width } = Dimensions.get('window');

const ProductContainer = (props) => {

  const [products, setProducts] = useState();
  const [productsFilter, setProductsFilter] = useState([]);
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
          const data = await axios.post(`${baseURL}product/getAll`, {
            limit: 16,
            skip: 0,
            filters: {
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
        <Container style={styles.container}>
          <View style={styles.search}>
            <View style={styles.inputSection}>
              <View style={styles.iconSearch}>
                <SearchIcon />
              </View>
              <TextInput
                placeholder="Search"
                onFocus={openList}
                style={styles.inputSearch}
                onChangeText={(text) => searchProduct(text)}
              />
              {focus == true ? (
                <Icon name="ios-close" onPress={onBlur} />
              ) : null}
            </View>
            <TouchableOpacity>
              <View style={styles.settingIcon}>
                <SettingIcon />
              </View>
            </TouchableOpacity>
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
          {focus == true ? (
            <SearchedProduct
              productsFilter={productsFilter}
              navigation={props.navigation}
            />
          ) : (
            <ScrollView>
              <View>
                {/* <Banner /> */}
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
              ) : (
                <View style={[styles.center, { height: height / 2 }]}>
                  <Text style={{ color: '#cecece' }}>No product founds </Text>
                </View>
              )}
            </ScrollView>
          )}
        </Container>
      ) : (
        // loading
        <Container style={[styles.center, { backgroundColor: '#f2f2f2', height: height }]}>
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
    fontFamily: 'Poppins_300Light',
    flexWrap: "wrap",
    backgroundColor: "#fbfbfb",
  },
  listContainer: {
    height: '100%',
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "#fbfbfb",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    width: width,
    height: 50,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'relative',
  },
  inputSection: {
    width: '80%',
  },
  inputSearch: {
    height: '90%',
    color: '#757575',
    backgroundColor: '#f3f3f2',
    padding: 20,
    paddingLeft: 50,
    marginRight: 20,
    borderRadius: 20,
  },
  iconSearch: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  settingIcon: {
    height: '90%',
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    shadowColor: '#757575',
    backgroundColor: '#fff',
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
})

export default ProductContainer;
