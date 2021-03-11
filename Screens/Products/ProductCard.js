import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Button, TouchableOpacity } from 'react-native';

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
    return (
        <TouchableOpacity
            onPress={() => props.navigation.navigate("Product Detail",{item: props})}
        >
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    resizeMod='contain'
                    source={{ uri: props.colorProducts[0].images[0] }}
                />
                <View style={styles.card} />
                <Text style={styles.title}>
                    {props.name.length > 15 ? props.name.substring(0, 15 - 3) + '...'
                        : props.name}
                </Text>
                <Text style={styles.price}>${props.colorProducts[0].price}</Text>
                <View style={{marginBottom: 60}}>
                    <Button title={'Add to cart'} color={'green'} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width/2 - 15,
        height: width/1.4,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: "center",
        elevation: 8,
        backgroundColor: "white",
        marginVertical: 5,
    },
    image: {
        width: width/2 - 20 - 15,
        height: width/2 - 20 - 30
    },
    card: {
        marginBottom: 5,
        height: width/20 - 20 -90,
        backgroundColor: 'transparent',
        width: width/2 - 20 - 10
    },
    title: {
        fontWeight: '700',
        fontSize: 14,
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10
    },
    button: {
        marginBottom: 60,
        backgroundColor: 'green',
        color: 'white',
        borderRadius: 10,
    }
})

export default ProductCard;