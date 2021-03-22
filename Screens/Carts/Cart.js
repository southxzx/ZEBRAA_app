import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Button } from 'react-native';
import { Container, Text, Left, Right, H1, ListItem, Thumbnail, Body } from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome";
import { SwipeListView } from 'react-native-swipe-list-view';
import CartItem from './CartItem';

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

var { width, height } = Dimensions.get("window");

const Cart = (props) => {

    var total = 0;
    props.cartItem.forEach(cart => {
        return (total += cart.product.colorProducts[0].price)
    })

    return (
        <>
            {props.cartItem.length ? (
                <Container>
                    <H1 style={{ alignSelf: 'center' }}>Cart</H1>
                    <SwipeListView
                        data={props.cartItem}
                        renderItem={(data) => (
                            <CartItem item={data} />
                        )}
                        renderHiddenItem={(data) => (
                            <View style={styles.hiddenContainer}>
                                <TouchableOpacity
                                    style={styles.hiddenButton}
                                    onPress={() => props.removeFromCart(data.item)}
                                >
                                    <Icon name="trash" color={"white"} size={30} />
                                </TouchableOpacity>
                            </View>
                        )}
                        disableRightSwipe={true}
                        previewOpenDelay={3000}
                        friction={1000}
                        tension={40}
                        leftOpenValue={75}
                        stopLeftSwipe={75}
                        rightOpenValue={-75}
                    />
                    <View style={styles.bottomContainer}>
                        <Left>
                            <Text style={styles.price}>${total}</Text>
                        </Left>
                        <Right>
                            <EasyButton
                                danger
                                medium
                                onPress={() => props.clearCart()}
                            >
                                <Text style={{ color: 'white' }}>Clear</Text>
                            </EasyButton>
                        </Right>
                        <Right>
                            <EasyButton
                                primary
                                large
                                onPress={() => props.navigation.navigate("Checkout")}
                            >
                                <Text style={{ color: 'white' }}>Checkout</Text>
                            </EasyButton>
                        </Right>
                    </View>
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
    return {
        cartItem: cartItem
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
        removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#cecece'
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        elevation: 20,
    },
    price: {
        fontSize: 20,
        margin: 15,
        color: 'red'
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    hiddenButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
        height: 70,
        width: width / 1.2
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);