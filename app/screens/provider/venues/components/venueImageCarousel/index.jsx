import { View, Text, Platform, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Carousel } from "react-native-ui-lib/src/components/carousel";
import aiImage from '../../../../../../assets/images/ai.jpg'
//
const VenueImageCarousel = ({ baseUri = "", images = [] }) => {
    return (
        <Carousel
            autoplayInterval={2000}
            counterTextStyle={{ color: "pink" }}
            containerStyle={{}}
            initialPage={1}
            // autoplay={true}
            loop={true}
            // showCounter={Platform.OS == 'android' ? true : true}
            // contentInset={100}
            pageControlPosition='above'
            style={styles.container}
            contentContainerStyle={styles.contentWrapper}
        >
            {
                images?.length > 0 ?
                    images?.map((image, index) => (
                        <Image key={image} style={styles.img} source={{ uri: image }} />
                    )) :
                    <Image style={styles.img} source={aiImage} />
            }
        </Carousel>
    )
}

export default VenueImageCarousel

const styles = StyleSheet.create({
    img: {
        height: "100%",
        width: "100%"
    },
    contentWrapper: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
        flex: 1
    }
})