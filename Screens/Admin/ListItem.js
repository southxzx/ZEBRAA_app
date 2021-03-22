import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, Image, TouchableOpacity, TouchableHighlight, Dimensions, Modal } from 'react-native';
import  Icon from 'react-native-vector-icons/FontAwesome';
import EasyButton from '../../Shared/StyledComponents/EasyButton';

var { width, height } = Dimensions.get("window");

const ListItem = (props) => {

    const [modalVisible, setModalVisible] = useState(false);

    return(
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { 
                    setModalVisible(false);
                }}
            >
                <View style={styles.centerView}>
                    <View style={styles.modalView}>
                        <TouchableHighlight
                            underlayColor="#e8e8e8"
                            onPress={() => setModalVisible(false)}
                            style={{ 
                                alignSelf: "flex-end",
                                position: "absolute",
                                top: 5,
                                right: 10
                            }}
                        >
                            <Icon name="close" size={20}/>
                        </TouchableHighlight>
                        {/* <Button title="Edit" onPress={() => [
                            props.navigation.navigate("ProductForm"),
                            setModalVisible(false)
                        ]}/> */}
                        <EasyButton 
                            medium 
                            secondary
                            onPress={() => [
                                props.navigation.navigate("ProductForm"),
                                setModalVisible(false)
                            ]}
                        >
                            <Text style={styles.textStyle}>Edit</Text>
                        </EasyButton>
                        <EasyButton 
                            medium 
                            danger
                            onPress={() => [
                                // Delete function here
                                setModalVisible(false)
                            ]}
                        >
                            <Text style={styles.textStyle}>Delete</Text>
                        </EasyButton>
                        {/* <Button title="Delete" onPress={() => [
                            // Delete function here
                            setModalVisible(false)
                        ]}/> */}
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                style={[styles.container, {
                    backgroundColor: props.index % 2 == 0 ? 'white' : "gainsboro"
                }]}
                
                onPress={() => {
                    props.navigation.navigate("Product Detail", { item: props})
                }}
                // onPressLong
                onLongPress={() => { setModalVisible(true)}}
            >
                <Image
                    source={{uri: props.colorProducts[0].images[0]}}
                    resizeMode="contain"
                    style={styles.image}
                />
                <Text style={styles.item1} numberOfLines={1} ellipsizeMode="tail">{props.name}</Text>
                <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">{props.category.name}</Text>
                <Text style={styles.item2}>${props.colorProducts[0].price}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        width: width,
        alignItems: 'center'
    },
    image: {
        borderRadius: 50,
        width: width / 6,
        height: 40,
        margin: 2
    },
    item: {
        flexWrap: "wrap",
        margin: 3,
        width: width / 6
    },
    item1: {
        flexWrap: "wrap",
        margin: 3,
        width: width / 3
    },
    item2: {
        textAlign: 'right',
        margin: 3,
        width: width / 5
    },
    centerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
    }
})

export default ListItem;
