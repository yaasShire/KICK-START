import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS, SIZES2 } from '../../../../../theme/globalStyle'

const ReportHeader = ({ showReport = false, venueList = [], onPress = () => { } }) => {
    return (
        <View style={styles.container}>
            <Text style={[SIZES2.text_base]}>Report</Text>
            <TouchableOpacity disabled={!showReport && venueList?.length == 0} onPress={onPress} style={{ opacity: (!showReport && venueList?.length == 0) ? .5 : 1 }}>
                <MaterialCommunityIcons name='cloud-download-outline' size={25} color={COLORS.linkColor} />
            </TouchableOpacity>
        </View>
    )
}

export default ReportHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})