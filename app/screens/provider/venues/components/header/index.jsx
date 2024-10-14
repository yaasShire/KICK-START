import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { LAY_OUT, SIZES2 } from '../../../../../theme/globalStyle'
import IosAndroidSafeArea from '../../../../../components/iosAndroidSafeArea'

const VenueHeader = ({ onRegisterProductBtn = () => { }, title = "", showAddIcon = false, showSearchIcon = false }) => {
    return (
        <View style={styles.container}>
            <IosAndroidSafeArea />
            <StatusBar barStyle={'default'} />
            <View style={styles.subWrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={[SIZES2.text_base]}>{title}</Text>
                </View>
                <View style={styles.leftContentWrapper}>
                    {
                        showAddIcon &&
                        <TouchableOpacity onPress={onRegisterProductBtn}>
                            <AntDesign name='pluscircle' size={30} color={"#000"} />
                        </TouchableOpacity>
                    }
                    {
                        showSearchIcon &&

                        <TouchableOpacity>
                            <Ionicons name='search-sharp' size={23} color={"#000"} />
                        </TouchableOpacity>
                    }
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