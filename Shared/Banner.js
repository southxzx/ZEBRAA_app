import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';

var { width } = Dimensions.get("window");

const Banner = () => {
    const [bannerData,setBannerData] = useState([]);

    useEffect(() => {
        setBannerData([
        'https://i0.wp.com/s1.uphinh.org/2021/03/04/slide1.png',
        'https://i0.wp.com/s1.uphinh.org/2021/03/04/slide2.png'
        ]);

        return () => {
            setBannerData([]);
        }
    },[])

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.swiper}>
                    <Swiper
                        style={{ height: width / 2 - 10 }}
                        showsButtons={false}
                        autoplay={true}
                        autoplayTimeout={2}
                    >
                        {bannerData.map((item) => {
                            return (
                                <Image
                                    key={item}
                                    style={styles.iamgeBanner}
                                    resizeMode='contain'
                                    source={{ uri: item }}
                                />
                            );
                        })}
                    </Swiper>
                    <View style={{ height: 20 }}></View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gainsboro'
    },
    swiper: {
        width: width,
        alignItems: 'center',
        marginTop: 5,
        borderRadius: 10,
    },
    iamgeBanner: {
        height: width/2,
        width: width-20,
        borderRadius: 20,
        marginHorizontal: 10
    }
})

export default Banner;

