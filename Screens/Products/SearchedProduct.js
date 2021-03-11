import React from 'react';
import { View , StyleSheet, Dimensions} from 'react-native';
import { Content, Left, Body, ListItem, Thumbnail, Text } from 'native-base';

var {width} = Dimensions.get("window");

const SearchedProduct = (props) => {

    const {productsFilter} = props;

    return (
        <Content style={{width: width}}>
            {productsFilter.length > 0 ? (
                productsFilter.map((item) => (
                    <ListItem
                        onPress={() => {
                            props.navigation.navigate("Product Detail", {item: item})
                        }}
                        key={item._id}
                        avatar
                    >
                        <Left>
                            <Thumbnail
                                source={{uri: item.colorProducts[0].images[0]}}
                            />
                        </Left>
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note>
                                {item.description.length > 40 ? item.description.substring(0,40-3)+'...' : item.description}
                            </Text>
                        </Body>
                    </ListItem>
                ))
            ) : (
                <View style={styles.center}>
                    <Text style={{ alignSelf: 'center' }}>
                        No products match the selected criteria
                    </Text>
                </View>
            )}
        </Content>
    );
};

const styles = StyleSheet.create({
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default SearchedProduct;