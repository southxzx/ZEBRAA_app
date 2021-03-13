import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Container, Text, Left, Right, H1, ListItem, Thumbnail, Body } from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

var { width, height } = Dimensions.get("window");

const Cart = (props) => {

    return (
    <>
    {props.cartItem ? (
        <Container>
            <H1 style={{alignSelf: 'center'}}>Cart</H1>
            {props.cartItem.map((item)=>{
                return (
                    <ListItem style={styles.listItem} key={Math.random()} avatar>
                        <Left>
                            <Thumbnail
                                source={{uri: item.product.colorProducts[0].images[0]}}
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
            })}
        </Container>
    ) : (
        <Container style={styles.emptyContainer}>
            <Text style={styles.text}>Looks like your cart is empty</Text>
            <Text style={styles.text}>Add products to your cart to get started</Text>
        </Container>
    )}
    </>
    )
}

const mapStateToProps = (state) => {
    const { cartItem } = state;
    return{
        cartItem: cartItem
    };
};

const styles = StyleSheet.create({
    emptyContainer: {
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#cecece'
    },
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

export default connect(mapStateToProps, null)(Cart);