//
import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { Carousel } from 'react-native-ui-lib/src/components/carousel';
import { COLORS } from '../../../../theme/globalStyle';
//
const ImageCarousel = () => {
    const images = [
        require('../../../../../assets/images/Futsals/futsal1.jpeg'),
        require('../../../../../assets/images/Futsals/futsal2.jpeg'),
        require('../../../../../assets/images/Futsals/futsal3.jpeg'),
        require('../../../../../assets/images/Futsals/futsal4.jpeg'),
    ]
    return (
        <Carousel
            loop
            pageControlPosition="over"
            onChangePage={() => console.log('page changed')}
            showCounter={Platform.OS == "android" ? true : false}
            pageControlProps={{ color: COLORS.tertiary_color, enlargeActive: true, }}
        >
            {
                images.map((item, index) => (
                    <View key={index} style={styles.imagesCon}>
                        <Image
                            resizeMode="cover"
                            source={images[index]}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>
                ))
            }
        </Carousel>
    )
}
//
export default ImageCarousel;
//
const styles = StyleSheet.create({
    imagesCon: {
        height: 300,
        width: '100%',
        backgroundColor: 'blue'
    }
})
//