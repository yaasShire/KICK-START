import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { LAY_OUT, SIZES2, screenHeight, screenWidth } from '../../../../../theme/globalStyle'
import { Foundation } from '@expo/vector-icons'

const InfoCard = ({ data = {} }) => {
    return (
        <View style={styles.container(data?.bgColor)}>
            <Text style={[SIZES2.text_md, { color: "#fff", fontFamily: "poppins600" }]}>{data?.title}</Text>
            <View style={styles.lowerContent}>
                <Text style={[SIZES2.text_base, { color: "#fff" }]}>{data?.ammount}</Text>
            </View>
        </View>
    )
}

export default InfoCard

const styles = StyleSheet.create({
    container: (bgColor = "") => ({
        padding: LAY_OUT.padding,
        paddingVertical: 30,
        width: screenWidth / 2.19,
        height: 125,
        backgroundColor: bgColor,
        borderRadius: 10,
        justifyContent: "space-between"
    }),
    lowerContent: {
        rowGap: 3
    },
    textArrowWrapper: {
        flexDirection: "row",
        columnGap: 3
    }
})