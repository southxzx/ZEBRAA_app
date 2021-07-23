import React from 'react';
import { StyleSheet } from 'react-native';
import { Badge, Text } from 'native-base';

import { connect } from 'react-redux';

const CartBadge = (props) => {
  return (
    <>
      {props.cartItem.length ? (
        <Badge info style={styles.badge}>
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
    height: 20,
    width: 20,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    top: -5,
    right: -5
  },
  text: {
    position: 'absolute',
    fontSize: 8,
    fontWeight: 'bold',
  }
})

export default connect(mapStateToProps, null)(CartBadge);
