import React, { useState, useMemo } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Text, Left, Right, ListItem, Thumbnail, Body } from 'native-base';
import TextCustom from '../../Shared/StyledComponents/TextCustom';
import { findIndex } from 'lodash';
import { useTheme } from '../../Context/store/ThemeContext';


const CartItem = (props) => {
  const { item: { item }, navigation } = props;
  const [quantity, setQuantity] = useState(1);
  const { theme } = useTheme();
  const Styles = useMemo(() => createStyles(theme));

  const colorIndex = findIndex(item.idProduct.colorProducts, ['_id', item.idColorProduct._id]);
  const sizeIndex = findIndex(
    item.idProduct.colorProducts[colorIndex].sizeProducts,
    ["_id", item.idSize]
  );
  const size = item.idProduct.colorProducts[colorIndex].sizeProducts[sizeIndex].size.name;

  return (
    <ListItem style={Styles.listItem} noIndent key={Math.random()} avatar>
      <View style={Styles.thumnail}>
        <Image
          source={{ uri: item.idColorProduct.images[0] }}
          style={Styles.imageThumbnail}
          resizeMode="contain"
        />
      </View>
      <Body style={Styles.body}>
        <TextCustom fontSize={14} style={Styles.titleProduct}>{item.idProduct.name}</TextCustom>
        <View style={Styles.priceBoxCart}>
          <TextCustom fontSize={14} color="#f48c06" fontWeight={500} fontStyle="Medium">$</TextCustom>
          <TextCustom fontSize={18} fontWeight={500} fontStyle="Medium" color="#292929">{item.idColorProduct.price}</TextCustom>
          <TextCustom>| Size: US {size}</TextCustom>
        </View>
      </Body>
      <View>
        <TextCustom fontWeight={500} fontStyle="Medium" style={Styles.qty}>{item.quantity}</TextCustom>
      </View>
    </ListItem>
  )
}
const createStyles = (theme) => {
  const styles = StyleSheet.create({
    listItem: {
      paddingLeft: 0,
      alignItems: 'center',
      backgroundColor: 'white',
      justifyContent: 'center',
      backgroundColor: theme.backgroundPrimary
    },
    thumnail: {
      paddingLeft: 0,
    },
    body: {
  
    },
    imageThumbnail: {
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
    priceBoxCart: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 5,
    },
    qty: {
      backgroundColor: theme.iconBg,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      overflow: 'hidden',
      marginRight: 10,
    },
  });
  return styles
}

export default CartItem;
