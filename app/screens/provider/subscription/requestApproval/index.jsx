import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, Linking, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import serviceImg from '../../../../../assets/images/service.png'
import { COLORS, SIZES2 } from '../../../../theme/globalStyle'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { authorizeProviderGet } from '../../../../api/authorizedProviderGet'
import { useNavigation } from '@react-navigation/native'

const RequestApproval = () => {
    const { navigate } = useNavigation()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [refreshControl, setRefreshControl] = useState(false)
    const checkUserSubscription = async () => {
        try {
            const { result } = await authorizeProviderGet("authenticate/isUserSubscribed", setError, setLoading)
            if (result?.message === "User is Subscribed But Not Approved") {
                navigate("RequestApproval")
            } else if (result?.data == false) {
                navigate("MainSubscription")
            } else if (result?.data == true) {
                navigate("ProviderHome")
            }
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        checkUserSubscription()
    })
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <ScrollView contentContainerStyle={[styles.container]}
                refreshControl={<RefreshControl refreshing={refreshControl} onRefresh={checkUserSubscription} />}
            >
                <View style={styles.imgWrapper}>
                    <Image source={serviceImg} style={styles.img} />
                </View>
                <View style={styles.contentWrapper}>
                    <Text style={[SIZES2.text_base]}>Request Approve</Text>
                    <Text style={[SIZES2.text_sm, { textAlign: "center", fontFamily: "poppins400", padding: 10 }]}>Wait for admins to approve your request to use your dashboard or you can contact them righ away by calling or chatting them through whatsapp!</Text>
                </View>
                <View style={styles.actionsWrapper}>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(`tel:612518368`)
                        }}
                        style={styles.contactBtn}>
                        <Feather name='phone-call' size={28} color={"#000"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(
                                `http://api.whatsapp.com/send?phone=252612518368`
                            )
                        }}
                        style={styles.contactBtn}>
                        <FontAwesome name='whatsapp' size={30} color={"#47c355"} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default RequestApproval

const styles = StyleSheet.create({
    container: {
        flex: 1,
        rowGap: 15
    },
    img: {
        width: 200,
        height: 200,
        resizeMode: "cover"
    },
    imgWrapper: {
        height: "35%",
        justifyContent: "center",
        alignItems: "center"
    },
    contentWrapper: {
        justifyContent: "center",
        alignItems: "center",
        rowGap: 5
    },
    actionsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        columnGap: 16
    },
    contactBtn: {
        backgroundColor: "rgba(0, 0, 0, .1)",
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    }
})