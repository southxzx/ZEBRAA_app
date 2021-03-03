import React from 'react';
import { StyleSheet, View, Dimensions, Image, Text, Button } from 'react-native';

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                resizeMethod='contain'
                source={{uri: props.colorProducts[0].images[0]}}
            />
            <View style={styles.card}/>
            <Text style={styles.title}>
                {props.name.length > 15 ? props.name.substring(0,15-3) + '...'
                : props.name}
            </Text>
            <Text style={styles.price}>${props.colorProducts[0].price}</Text>
            <View style={{marginBottom: 60}}>
                <Button title={'Add'} color={'green'}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width/2 - 20,
        height: width/1.4,
        padding: 10,
        borderRadius: 10,
        marginTop: 25,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: "center",
        elevation: 8,
        backgroundColor: "white",
    },
    image: {
        width: width/2 - 20 - 10,
        height: width/2 - 20 - 30
    },
    card: {
        marginBottom: 10,
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
    }
})

export default ProductCard;