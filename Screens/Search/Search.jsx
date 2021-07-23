import React, { useCallback, useState, useRef, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image } from 'react-native';
import { View, StyleSheet, TextInput, TouchableOpacity, Dimensions, Keyboard } from 'react-native';
import Slider from '@react-native-community/slider';
import { CloseIcon, SearchIcon, SettingIcon } from '../../Shared/StyledComponents/ListSvg';
import TextCustom from '../../Shared/StyledComponents/TextCustom';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../Redux/Actions/productAction';
import Panel from '../../Shared/Panel';
import SearchedProduct from '../Products/SearchedProduct';
import { useTheme } from '../../Context/store/ThemeContext';

var { height, width } = Dimensions.get('window')

const Search = (props) => {

  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));

  const result = useSelector(state => state.productReducer);
  const { cateList, loadingCate, productList } = result;
  const dispatch = useDispatch();
  const myTextInput = useRef();

  const [cateListState, setCateListState] = useState([]);
  const [activeSearch, setActiveSearch] = useState(false);
  const [productsFilter, setProductsFilter] = useState([]);

  useFocusEffect((
    useCallback(() => {
      const fetchCateList = async () => {
        setCateListState(cateList);
      }
      fetchCateList();
      setProductsFilter(productList);
    }, [])
  ));

  const searchProduct = (text) => {
    setProductsFilter(
      productList.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    )
  }

  const openList = () => {
    setActiveSearch(true);
  }
  const onBlur = () => {
    setActiveSearch(false);
    myTextInput.current.clear();
    Keyboard.dismiss();
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.search}>
        <View style={Styles.inputSection}>
          <View style={Styles.iconSearch}>
            <SearchIcon color={theme.ink} />
          </View>
          <TextInput
            ref={myTextInput}
            placeholder="Search"
            placeholderTextColor={theme.ink75} 
            onFocus={openList}
            style={Styles.inputSearch}
            onChangeText={(text) => searchProduct(text)}
          />
          {activeSearch == true &&
            <TouchableOpacity style={Styles.closeBtn} onPress={onBlur}>
              <CloseIcon color={theme.ink} />
            </TouchableOpacity>
          }
        </View>
        <TouchableOpacity>
          <View style={Styles.settingIcon}>
            <SettingIcon color={theme.ink} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={Styles.content}>
        {activeSearch ?
          (
            <SearchedProduct productsFilter={productsFilter} navigation={props.navigation} />
          ) :
          (<View>
            <Panel title="Search by Categories">
              <View style={Styles.cateList}>
                {
                  cateList.length > 0 && cateList.map((itemCate) => (
                    <TouchableOpacity style={Styles.itemCate} key={itemCate.name}>
                      <View style={Styles.imageBackground}>
                        <Image
                          source={{ uri: itemCate.description }}
                          style={Styles.imageCate}
                        />
                      </View>
                      <TextCustom style={{ textTransform: 'uppercase', paddingTop: 10, alignSelf: 'center' }} fontSize={13} fontWeight={500} fontStyle="Medium">{itemCate.name}</TextCustom>
                    </TouchableOpacity>
                  ))
                }
              </View>
            </Panel>
            <Panel title="Search by Price">
              <View>
                <Slider
                  style={{ width: '100%', height: 40 }}
                  minimumValue={0}
                  maximumValue={500}
                  minimumTrackTintColor="#f48c06"
                  maximumTrackTintColor="#f48c06"
                  onSlidingComplete={(value) => console.log(value)}
                />
              </View>
            </Panel>
          </View>)}
      </View>
    </View>
  )
}
const createStyles = (theme) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundPrimary,
      height: '100%',
      paddingLeft: 20,
      paddingRight: 20,
    },
    content: {
      height: '100%',
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
      position: 'relative',
    },
    inputSearch: {
      color: theme.ink75,
      backgroundColor: theme.iconBg,
      padding: 10,
      height: '100%',
      paddingLeft: 50,
      paddingRight: 50,
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
      backgroundColor: theme.iconBg,
      shadowRadius: 5,
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 0,
        height: 2
      }
    },
    closeBtn: {
      position: 'absolute',
      right: 30,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      zIndex: 1,
    },
    largeTitle: {
      paddingBottom: 20,
    },
    cateList: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: "wrap",
    },
    itemCate: {
      margin: 15,
      paddingHorizontal: 5,
      alignItems: 'center',
    },
    imageBackground: {
      position: 'relative',
      backgroundColor: theme.iconBg,
      borderRadius: 15,
      width: 80,
      height: 80,
    },
    imageCate: {
      top: -35,
      right: -15,
      position: 'absolute',
      width: 100,
      height: 100,
      transform: [{ rotate: '-30deg' }],
      shadowColor: '#757575',
      shadowRadius: 5,
      shadowOpacity: 0.3,
      shadowOffset: {
        width: 0,
        height: 2
      }
    }
  });
  return styles
}

export default Search
