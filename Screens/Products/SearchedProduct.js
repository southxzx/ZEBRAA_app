import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Content, Left, Body, ListItem, Thumbnail, Text } from 'native-base';
import TextCustom from '../../Shared/StyledComponents/TextCustom';
import { useTheme } from '../../Context/store/ThemeContext';

var { width } = Dimensions.get("window");

const SearchedProduct = (props) => {
  const { productsFilter } = props;
  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));

  return (
    <Content style={{ width: '100%' }}>
      {productsFilter.length > 0 ? (
        productsFilter.map((item) => (
          <ListItem
            onPress={() => {
              props.navigation.navigate("Product Detail", { item: item })
            }}
            key={item._id}
            avatar
            style={Styles.listItem}

          >
            <Left style={{ marginLeft: 0 }}>
              <Image
                source={{ uri: item.colorProducts[0].images[0] }}
                style={Styles.thumnail}
              />
            </Left>
            <Body>
              <TextCustom fontSize={14} style={Styles.titleProduct}>{item.name}</TextCustom>
              <Text note style={{ color: theme.ink }}>
                {item.description.length > 40 ? item.description.substring(0, 35) + '...' : item.description}
              </Text>
            </Body>
          </ListItem>
        ))
      ) : (
        <View style={Styles.center}>
          <TextCustom fontSize={16} color="#757575" style={{ textAlign: 'center' }}>
            No products match the selected criteria
          </TextCustom>
        </View>
      )}
    </Content>
  );
};

const createStyles = (theme) => {
  const styles = StyleSheet.create({
    center: {
      justifyContent: 'center',
      height: '100%',
      alignSelf: 'center',
      marginTop: 30,
      width: '70%',
    },
    listItem: {
      marginLeft: 0,
      paddingLeft: 0,
      paddingVertical: 10,
      alignItems: 'center',
      backgroundColor: 'white',
      justifyContent: 'center',
      backgroundColor: theme.backgroundPrimary
    },
    thumnail: {
      backgroundColor: '#f6f6f6',
      height: 50,
      width: 60,
      borderWidth: 1,
      borderColor: '#d7d7d7',
      borderRadius: 15,
    },
    titleProduct: {
      textTransform: 'uppercase',
    },
  });
  return styles
}

export default SearchedProduct;