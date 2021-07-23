import React, { useMemo } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import { useTheme } from '../Context/store/ThemeContext';
import HoriCardProduct from './HoriCardProduct';
import { ArrowNext, BackIcon } from './StyledComponents/ListSvg';
import TextCustom from './StyledComponents/TextCustom';

var { width } = Dimensions.get("window");

const Banner = ({ listProduct }) => {

  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));
  const newestList = listProduct ? listProduct.slice(listProduct.length - 4).reverse() : [];

  // console.log("listProduct", listProduct);
  const imgArray = [
    {
      uri: 'https://res.cloudinary.com/zebraa/image/upload/v1621781040/banner0_oeblzz.jpg'
    },
    {
      uri: 'https://res.cloudinary.com/zebraa/image/upload/v1621781040/banner1_k0gcew.jpg'
    },
  ]

  const renderIcon = (type) => {
    if (type === 'next'){
      return <View style={Styles.iconSwipe}><ArrowNext color={theme.ink} /></View>
    } else
    if (type === 'prev'){
      return <View style={Styles.iconSwipe}><BackIcon color={theme.ink} /></View>
    }
  }

  return (
    <ScrollView>
      <View style={Styles.container}>
        <View style={Styles.swiper}>
          <Swiper
            style={{ height: width / 2 }}
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={3}
            showsButtons={true}
            showsPagination={false}
            nextButton={renderIcon('next')}
            prevButton={renderIcon('prev')}
            buttonWrapperStyle={{ paddingHorizontal: 30 }}
          >
            {imgArray.map((item) => {
              return (
                // <HoriCardProduct itemProduct={item} key={item._id} />
                <Image
                  key={item.uri}
                  source={{ uri: item.uri}}
                  style={Styles.imageBanner}
                />
              );
            })}
          </Swiper>
        </View>
      </View>
    </ScrollView>
  )
}

const createStyles = (theme) => {
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      // backgroundColor: '#fff8f0',
    },
    swiper: {
      width: width,
      alignItems: 'center',
      marginVertical: 10,
      // shadowColor: '#e85d04',
      // shadowOpacity: 0.2,
      // shadowOffset: {
      //   width: 0,
      //   height: 2
      // }
    },
    imageBanner: {
      width: '95%',
      height: '100%',
      alignSelf: 'center',
      borderRadius: 15,
      borderWidth: 2,
      borderColor: theme.borderLightOrange,
    },
    iconSwipe: {
      backgroundColor: theme.backgroundPrimary,
      borderRadius: 50,
      shadowColor: '#fff',
      shadowOpacity: 0.5,
      shadowOffset: {
        width: 0,
        height: 2
      }
    }
  });
  return styles
}


export default Banner;

