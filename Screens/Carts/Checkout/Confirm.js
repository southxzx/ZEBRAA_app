import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import { Text, Left, Right, ListItem, Thumbnail, Body} from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/cartActions';

var { height, width } = Dimensions.get("window");

const Confirm = (props) => {

    const confirmOrder = () => {
        setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("Cart");
        }, 3000)
    }

    const confirm = props.route.params

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
               <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Confirm Order</Text>
            </View>
            {props.route.params ? (
                <View style={{ borderWidth: 2, borderColor: 'orange', width: width/1.1}}>
                    <Text style={styles.shipping}>Shipping to:</Text>
                    <View style={{ padding: 8}}>
                        <Text>Address: {confirm.order.order.shippingAddress1}</Text>
                        <Text>Address 2: {confirm.order.order.shippingAddress2}</Text>
                        <Text>City: {confirm.order.order.city}</Text>
                        <Text>Zip Code: {confirm.order.order.zip}</Text>
                        <Text>Country: {confirm.order.order.country}</Text>
                    </View>
                    <Text style={styles.shipping}>Items:</Text>
                    {confirm.order.order.orderItems.map((x) => {
                        return (
                            <ListItem
                                style={styles.listItem}
                                key={x.product.name}
                                avatar
                            >
                                <Left>
                                    <Thumbnail source={{ uri: x.product.colorProducts[0].images[0]}}/>
                                </Left>
                                <Body style={styles.body}>
                                    <Left>
                                        <Text>{x.product.name}</Text>
                                    </Left>
                                    <Right>
                                        <Text>$ {x.product.colorProducts[0].price}</Text>
                                    </Right>
                                </Body>

                            </ListItem>
                        )
                    })}
                </View>
            ) : null}
            <View style={{ alignItems: 'center', margin: 20}}>
                <Button title={"Place order"} onPress={confirmOrder}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignItems: 'center',
        backgroundColor: 'white', 
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
    },
    shipping: {
        alignSelf: 'center' ,
        margin: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
    listItem: {
        alignSelf: 'center' ,
        backgroundColor: 'white',
        justifyContent: 'center',

    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold'
    }

})

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart())
    }
}

export default connect(null, mapDispatchToProps) (Confirm);