import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { LAY_OUT, SIZES2 } from '../../../../theme/globalStyle'
import { AntDesign, Ionicons } from '@expo/vector-icons'

const VenueHeader = ({ onRegisterProductBtn = () => { } }) => {
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <StatusBar backgroundColor='#000' />
            <View style={styles.subWrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={[SIZES2.text_xl]}>Venues</Text>
                </View>
                <View style={styles.leftContentWrapper}>
                    <TouchableOpacity onPress={onRegisterProductBtn}>
                        <AntDesign name='pluscircle' size={30} color={"#000"} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='search-sharp' size={23} color={"#000"} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default VenueHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    subWrapper: {
        paddingVertical: 15,
        padding: LAY_OUT.paddingX,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    titleWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    leftContentWrapper: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 20
    }
})