import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../../theme/globalStyle'
import { Feather } from '@expo/vector-icons'

const PickTime = ({ title = "" }) => {
    return (
        <View style={styles.pickTime}>
            <View style={styles.pickTimeLeft}>
                <Feather name='clock' color={"#000"} size={15} />
                <Text style={[SIZES2.text_md, { color: "rgba(0, 0, 0, .6)" }]}>{title}</Text>
            </View>
            <View style={styles.pickTimeRight}>
                <Feather name='chevron-down' size={15} />
            </View>
        </View>
    )
}

export default PickTime

const styles = StyleSheet.create({
    pickTime: {
        borderBottomWidth: 1,
        padding: LAY_OUT.padding,
        borderRadius: 5,
        borderColor: COLORS.gray_color,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 6,
        justifyContent: "space-between"
    },
    pickTimeLeft: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 5
    }
})