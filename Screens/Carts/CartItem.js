import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Left, Right, ListItem, Thumbnail, Body } from 'native-base';

const CartItem = (props) => {
    const item = props.item.item;
    console.log(item);
    const [quantity, setQuantity] = useState(1);

    return (
        <ListItem style={styles.listItem} key={Math.random()} avatar>
            <Left>
                <Thumbnail
                    source={{ uri: item.product.colorProducts[0].images[0] }}
                />
            </Left>
            <Body style={styles.body}>
                <Left>
                    <Text>{item.product.name}</Text>
                </Left>
                <Right>
                    <Text>${item.product.colorProducts[0].price}</Text>
                </Right>
            </Body>
        </ListItem>
    )
}

const styles = StyleSheet.create({
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row',
    }
})

export default CartItem;
