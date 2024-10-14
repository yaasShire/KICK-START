import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import NoReportImg from '../../../../../../assets/images/no-report.png'
import { SIZES2 } from '../../../../../theme/globalStyle'

const NoReport = () => {
    return (
        <View style={styles.container}>
            <Image source={NoReportImg} style={{ width: 150, height: 100, resizeMode: "center" }} />
            <Text style={[SIZES2.text_md]}>No Report Found</Text>
        </View>
    )
}

export default NoReport

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        rowGap: 10
    }
})