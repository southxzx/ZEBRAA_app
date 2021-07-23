import axios from 'axios';
import React, { useState, useCallback, useEffect, useMemo, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Container, Header, Icon, Input, Item, Text } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';

import ProductList from './ProductList';
import SearchedProduct from './SearchedProduct';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';
import ModalRequiresLogin from '../../Shared/ModalRequiresLogin';
import TextCustom from '../../Shared/StyledComponents/TextCustom';
import { useTheme } from '../../Context/store/ThemeContext';
import { SearchIcon, SettingIcon } from '../../Shared/StyledComponents/ListSvg';

import baseURL from '../../assets/common/baseURL';

import * as actions from '../../Redux/Actions/productAction';
import * as actionsCart from '../../Redux/Actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../Context/actions/Auth.actions';
import AuthGlobal from '../../Context/store/AuthGlobal';

var { height, width } = Dimensions.get('window');

const ProductContainer = (props) => {

  const context = useContext(AuthGlobal);
  const { stateUser: { isAuthenticated, userProfile }} = context;
  const result = useSelector(state => state.productReducer);
  const { cateList, loadingCate, productList, loadingProduct } = result;
  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));

  const [products, setProducts] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState();
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useFocusEffect((
    useCallback(
      () => {
        setFocus(false);
        setActive(-1);

        const FetchCategories = async () => {
          dispatch(actions.getCategories());
          setCategories(cateList);
        }

        const FetchProduct = async () => {
          console.log("fetching");
          const args = {
            // limit: 16,
            skip: 0,
            filters: {
              // category: ['5fe69f5270075d277c752092']
            }
          }
          await dispatch(actions.fetchProducts(args));
        }

        if (!productList.length){
          FetchProduct();
        }

        if (!cateList.length) {
          FetchCategories();
        }

        setProducts(productList);
        setInitialState(productList);
        setProductsCtg(productList);
        setLoading(false);

        return () => {
          setProducts([]);
          setProductsFilter([]);
          setFocus();
          setCategories([]);
          setActive();
          setInitialState();
        }
      },
      [productList],
    ))
  )

  useEffect(() => {
    dispatch(actionsCart.getCart(userProfile._id));
    getUserProfile(context.dispatch);
  }, [])

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
        <Container style={Styles.container}>
          {/* <ModalRequiresLogin/> */}
          <View>
            <CategoryFilter
              categories={cateList}
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
              <TextCustom fontSize={16} fontWeight={600} fontStyle="SemiBold" style={Styles.newestTitle}>Newest Collections</TextCustom>
              <View>
                <Banner listProduct={productsCtg} />
              </View>
              <TextCustom fontSize={16} fontWeight={600} fontStyle="SemiBold" style={Styles.newestTitle}>Popular Collections</TextCustom>
              {productsCtg.length > 0 ? (
                <View style={Styles.listContainer}>
                  {productsCtg.sort().map((item) => {
                    return (
                      <ProductList
                        key={item._id}
                        item={item}
                        navigation={props.navigation}
                        theme={theme}
                      />
                    )
                  })}
                </View>
              ) : (
                <View style={[Styles.center, { height: height / 2 }]}>
                  <Text style={{ color: '#cecece' }}>No product founds </Text>
                </View>
              )}
            </ScrollView>
          )}
        </Container>
      ) : (
        // loading
        <Container style={[Styles.center, { backgroundColor: '#f2f2f2', height: height }]}>
          <ActivityIndicator
            size="large"
            color="red"
          />
        </Container>
      )}
    </>
  )
}
const createStyles = (theme) => {
  const styles = StyleSheet.create({
    container: {
      fontFamily: 'Poppins_300Light',
      flexWrap: "wrap",
      backgroundColor: theme.backgroundPrimary,
    },
    listContainer: {
      height: '100%',
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      flexWrap: "wrap",
      backgroundColor: theme.backgroundPrimary,
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
    newestTitle: {
      // textTransform: 'uppercase',
      marginLeft: 15,
      marginVertical: 10,
      // borderLeftWidth: 2,
      // borderLeftColor: '#757575'
    }
  })
  return styles
}

export default ProductContainer;
