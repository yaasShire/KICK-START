import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, LAY_OUT, screenWidth } from '../../../../../theme/globalStyle'
import aiImage from '../../../../../../assets/images/ai.jpg'
import { AntDesign, EvilIcons } from '@expo/vector-icons'

const VenueImageItem = ({ img = "", removeImage = () => { } }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: img }} style={styles.img} />
            <TouchableOpacity style={styles.closeBtn} onPress={() => removeImage(img)}>
                <AntDesign name='close' size={12} color={"#000"} />
            </TouchableOpacity>
        </View>
    )
}

export default VenueImageItem

const styles = StyleSheet.create({
    container: {
        width: screenWidth / 2.16,
        height: 150,
        borderRadius: 8,
    },
    img: {
        width: "100%",
        height: "100%",
        borderRadius: 4,
        resizeMode: "cover"
    },
    closeBtn: {
        position: "absolute",
        backgroundColor: COLORS.gray_color,
        padding: 5,
        right: 5,
        top: 5,
        borderRadius: 5
    }
})