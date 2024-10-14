import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-paper'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../../theme/globalStyle'
import { textShortner } from '../../../../../utilities'

const TotalReportCard = ({ title = "", data = [], venueData = {} }) => {
    console.log('====================================');
    console.log(venueData);
    console.log('====================================');
    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text>Venue Of Highest Revenue Income</Text>
            </View>
            <Divider />
            <View style={styles.segmentsWrapper}>
                <View style={styles.segment}>
                    <Text style={styles.value}>{textShortner(venueData?.venue?.name, 12)}</Text>
                    <Text style={styles.title}>Name</Text>
                </View>
                <View style={styles.verticalBar} />
                <View style={styles.segment}>
                    <Text style={styles.value}>{textShortner(venueData?.venue?.address, 15)}</Text>
                    <Text style={styles.title}>Address</Text>
                </View>
                <View style={styles.verticalBar} />
                <View style={styles.segment}>
                    <Text style={styles.value}>${textShortner(venueData?.totalRevenue, 20)}</Text>
                    <Text style={styles.title}>Revenue</Text>
                </View>
            </View>
        </View>
    )
}

export default TotalReportCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bg_primary,
        borderRadius: 5,
        // rowGap: 7,
        borderWidth: .5,
        borderColor: COLORS.gray_color
    },
    titleWrapper: {
        paddingHorizontal: 8,
        height: 30,
        justifyContent: "center"
    },
    segmentsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: LAY_OUT.padding,

    },
    segment: {
        rowGap: 5,
        justifyContent: "space-between",
        alignItems: "center"
    },
    value: {
        ...SIZES2.text_base
    },
    title: {
        ...SIZES2.text_md,
        fontFamily: "poppins400"
    },
    verticalBar: {
        width: 1,
        height: 30,
        backgroundColor: COLORS.gray_color,
        marginHorizontal: 15
    },
})