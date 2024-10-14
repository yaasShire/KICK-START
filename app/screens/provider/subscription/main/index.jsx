import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native'
import React, { useState } from 'react'
import logo from '../../../../../assets/icon.png'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../theme/globalStyle'
import { RadioButton } from 'react-native-ui-lib'
import { Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { authorizedProviderPost } from '../../../../api/authorizedProviderPost'
import PayModal from '../components/payModal'

const MainSubscription = () => {
    // 
    const [selectedPlan, setSelectedPlan] = useState({ plan: "Annual Plan", price: 300, subscriptionType: "YEARLY" })
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { goBack, navigate } = useNavigation()
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const features = [
        {
            id: 1,
            title: "Venue Management",
            description: "Allows field owners to manage field details, set prices, update availability, and monitor facilities."
        },
        {
            id: 2,
            title: "Order Management",
            description: "Enables field owners to approve, track, and manage user bookings, including confirmed, pending, and canceled orders"
        },
        {
            id: 3,
            title: "Reports",
            description: "Generates reports for field owners to analyze bookings, revenue, customer behavior, and field usage."
        },
    ]

    const subscribe = async () => {
        try {
            const data = {
                subscriptionType: selectedPlan?.subscriptionType,
                price: selectedPlan?.price
            };
            console.log(data);

            const { result } = await authorizedProviderPost("authenticate/providerSubscribe", setError, setLoading, JSON.stringify(data))
            console.log(result);
            if (result?.subscriptionType) {
                navigate("RequestApproval")
            }
        } catch (error) {
            console.log(error);
        }
    }

    // 
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <View style={styles.logoInfoWrapper}>
                <View style={styles.logNameWrapper}>
                    <Image source={logo} style={styles.logoImg} />
                    <Text style={[SIZES2.text_xl]}>Sport On Subscribe</Text>
                </View>
                <View>
                    <Text style={[SIZES2.text_sm, { fontFamily: "poppins400", textAlign: "center" }]}>Lorem ipsum dolor sit amet. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni iure ipsam recusandae expedita, assumenda iste.</Text>
                </View>
            </View>
            <View style={styles.plansWholeWrapper}>
                <View style={styles.plansWrapper}>
                    <View style={styles.plan}>
                        <View style={styles.btnNameWrapper}>
                            <RadioButton size={20} selected={selectedPlan.plan == 'Annual Plan' ? true : false} onPress={() => setSelectedPlan({ plan: "Annual Plan", price: 300, subscriptionType: "YEARLY" })} />
                            <Text style={styles.title}>Annual Plan</Text>
                        </View>
                        <Text style={[SIZES2.text_md]}>$300/year</Text>
                    </View>
                    <Divider style={{ width: "100%" }} />
                    <View style={styles.plan}>
                        <View style={styles.btnNameWrapper}>
                            <RadioButton size={20} selected={selectedPlan.plan == 'Monthly Plan' ? true : false} onPress={() => setSelectedPlan({ plan: "Monthly Plan", price: 100, subscriptionType: "MONTHLY" })} />
                            <Text style={styles.title}>Monthly Plan</Text>
                        </View>
                        <Text style={[SIZES2.text_md]}>$100/month</Text>
                    </View>
                </View>
            </View>
            <View style={styles.featuresWholeWrapper}>
                <Text style={[SIZES2.text_md, { fontFamily: "poppins400", opacity: .8 }]}>App Features</Text>
                {/* <View style={styles.featuresWrapper}> */}
                <FlatList
                    data={features}
                    style={styles.featuresWrapper}
                    scrollEnabled={false}
                    keyExtractor={(item) => item?.id}
                    renderItem={({ item }) => (
                        <View style={styles.feature}>
                            <View>
                                <Image source={logo} style={styles.featureImg} />
                            </View>
                            <View style={styles.featureContentWrapper}>
                                <Text style={[SIZES2.text_md]}>{item?.title}</Text>
                                <Text style={[SIZES2.text_sm, { fontFamily: "poppins400", width: "70%" }]}>{item?.description}</Text>
                            </View>
                        </View>
                    )}
                />
                {/* </View> */}
            </View>
            <View style={styles.subscribeBtnWrapper}>
                <TouchableOpacity style={styles.subscribeBtn} onPress={() => {
                    setShowPaymentModal(true)
                }}>
                    <Text style={[SIZES2.text_base, { color: "#fff" }]}>Subscribe {selectedPlan?.plan}/{selectedPlan?.price}</Text>
                </TouchableOpacity>
            </View>
            <PayModal showPaymentModal={showPaymentModal} setShowPaymentModal={setShowPaymentModal} subscribe={subscribe} />
        </View>
    )
}

export default MainSubscription

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    logoImg: {
        width: 100,
        height: 100,
        resizeMode: "contain",
        borderRadius: 10
    },
    logoInfoWrapper: {
        padding: LAY_OUT.padding,
        alignItems: "center",
        rowGap: 10
    },
    logNameWrapper: {
        alignItems: "center"
    },
    plansWholeWrapper: {
        padding: LAY_OUT.padding
    },
    plansWrapper: {
        alignItems: "center",
        rowGap: 10,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        borderColor: "rgba(0, 0, 0, .1)",
        backgroundColor: COLORS.bg_tertiary
    },
    plan: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: LAY_OUT.padding,
        paddingVertical: 5,
        alignItems: "center"
    },
    btnNameWrapper: {
        flexDirection: "row",
        columnGap: 5,
        alignItems: "center"
    },
    title: {
        ...SIZES2.text_md
    },
    subscribeBtnWrapper: {
        alignItems: "center",
        padding: LAY_OUT.padding,
        marginTop: 20
    },
    subscribeBtn: {
        backgroundColor: COLORS.primary_color,
        width: "100%",
        paddingVertical: 15,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center"
    },
    featuresWholeWrapper: {
        padding: LAY_OUT.paddingX,
        rowGap: 10
    },
    featuresWrapper: {
        rowGap: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "rgba(0, 0, 0, .1)",
        backgroundColor: COLORS.bg_tertiary
    },
    feature: {
        flexDirection: "row",
        width: "100%",
        columnGap: 5,
        justifyContent: "space-between",
        padding: LAY_OUT.padding,
        // margin:6

    },
    featureImg: {
        width: 50,
        height: 50,
        resizeMode: "contain",
        borderRadius: 10
    },
    featureContentWrapper: {
        rowGap: 5,
        width: "99%"
    }
})