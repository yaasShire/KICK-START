//
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Devider } from '../../../../components';
import { COLORS } from '../../../../theme/globalStyle';
//
const { width, height } = Dimensions.get('screen');
//
const AmenitiesCard = ({ amenityName, imageUrl, data = {} }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageCon}>
                <Image
                    source={{ uri: data?.iconUrl }}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <Text style={styles.amenityName}>
                {data?.name}
            </Text>
        </View>
    )
}
//
export default AmenitiesCard;
//
const styles = StyleSheet.create({
    container: {
        rowGap: 10,
        width: width / 5,
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    imageCon: {
        width: 20,
        height: 20,
    },
    amenityName: {
        fontSize: 10,
        fontWeight: "bold",
        color: COLORS.black800
    }
})
//