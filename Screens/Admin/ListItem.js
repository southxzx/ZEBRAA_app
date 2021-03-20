import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, Image, TouchableOpacity, TouchableHighlight, Dimensions } from 'react-native';
import  Icon from 'react-native-vector-icons/FontAwesome';

var { width, height } = Dimensions.get("window");

const ListItem = (props) => {
    return(
        <View>
            <TouchableOpacity
                // onPress
            >
                <Image
                    source={{uri: props.colorProducts[0].images[0]}}
                    resizeMode="contain"
                />
                <Text numberOfLines={1} ellipsizeMode="tail">{props.name}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail">{props.category.name}</Text>
                <Text>${props.colorProducts[0].price}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ListItem;
