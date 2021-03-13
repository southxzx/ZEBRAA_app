import React from 'react';
import { StyleSheet } from 'react-native';
import { Badge, Text } from 'native-base';

import { connect } from 'react-redux';

const CartIcon = (props) => {
    return (
        <>
            {props.cartItem.length ? (
                <Badge style={styles.badge}>
                    <Text style={styles.text}>{props.cartItem.length}</Text>
                </Badge>
            ) : null}
        </>
    )
}

const mapStateToProps = (state) => {
    const { cartItem } = state;
    return {
        cartItem
    }
}

const styles = StyleSheet.create({
    badge: {
        width: 27,
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        top: -5,
        right: -5
    },
    text: {
        fontSize: 12,
        width: 100,
        fontWeight: 'bold',
    }
})

export default connect(mapStateToProps, null)(CartIcon);
