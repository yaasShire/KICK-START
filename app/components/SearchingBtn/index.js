import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'
import { LAY_OUT, SIZES2 } from '../../theme/globalStyle'

const SearchHeader = ({ onRegisterProductBtn = () => { }, onSearch = () => { }, onFilter = () => { } }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#000' />
            <View style={styles.subWrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={[SIZES2.text_base]}>Venues</Text>
                </View>
                <View style={styles.leftContentWrapper}>
                    {/* <TouchableOpacity onPress={onFilter}>
                        <Ionicons name='filter-circle' size={26} color={"#000"} />
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={onSearch}>
                        <Ionicons name='search-sharp' size={23} color={"#000"} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SearchHeader

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