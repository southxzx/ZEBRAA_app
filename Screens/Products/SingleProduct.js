import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import { Left, Right, Container, H1 } from 'native-base';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import Toast from 'react-native-toast-message';
import TrafficLight from '../../Shared/StyledComponents/TrafficLight';

const SingleProduct = (props) => {
    const [item, setItem] = useState(props.route.params.item)
    const [availability, setAvailability] = useState();
    const [availabilityText, setAvailabilityText] = useState('');

    useEffect(() => {
        if (props.route.params.item.colorProducts[0].sizeProducts[0].quantity == 0){
            setAvailability(<TrafficLight unavailable></TrafficLight>);
            setAvailabilityText("Unavailable");
        }
        else{
            if (props.route.params.item.colorProducts[0].sizeProducts[0].quantity <= 10){
                setAvailability(<TrafficLight limited></TrafficLight>);
                setAvailabilityText("Limited Stock");
            }
            else{
                setAvailability(<TrafficLight available></TrafficLight>);
                setAvailabilityText("Available");
            }
        }

        return () => {
            setAvailability(null);
            setAvailabilityText("");
        }
    }, [])

    return (
        <Container style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image
                        source={{ uri: item.colorProducts[0].images[0] }}
                        resizeMod="container"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <H1 style={styles.contentHeader}>{item.name}</H1>
                    <Text style={styles.contentText}>{item.category.name}</Text>
                </View>
                {/* TODO: Description, Rich des and Availability */}
                <View style={styles.availabilityContainer}>
                    <View style={styles.availability}>
                        <Text style={{ marginRight: 10 }}>
                            Availability: {availabilityText}
                        </Text>
                        {availability}
                    </View>
                    <Text>{item.description}</Text>
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <Left>
                    <Text style={styles.price}>${item.colorProducts[0].price}</Text>
                </Left>
                <Right>
                    <EasyButton
                        primary
                        medium
                        onPress={() => {
                            props.addItemToCart(item),
                                Toast.show({
                                    topOffset: 60,
                                    type: "success",
                                    text1: `${item.name} added to Cart`,
                                    text2: "Go to your cart to complete order"
                                })
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold'}}>Add</Text>
                    </EasyButton>
                </Right>
            </View>
        </Container>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addItemToCart: (product) => {
            dispatch(actions.addToCart({ quantity: 1, product }))
        }
    }
}

export default connect(null, mapDispatchToProps)( SingleProduct);

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',

    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250,
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20,
    },
    contentText: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 24,
        color: 'red',
        margin: 20,
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    }
})