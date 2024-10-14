import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { COLORS, LAY_OUT, SIZES2 } from '../../theme/globalStyle'
import { EvilIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { calculateDistance } from '../../utilities'

const FutsalCards = ({ data = {}, location = {} }) => {
    const { navigate } = useNavigation()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [isFavorited, setIsFavorited] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [error2, setError2] = useState(false)
    let distance = 0
    if (location?.latitude && location?.longitude) {
        distance = calculateDistance(location.latitude, location?.longitude, Number(data?.latitude), Number(data?.longitude));
    }
    //
    const onBookNow = () => {
        navigate('FutsalsStack', {
            screen: 'Details',
            initial: false,
            params: {
                id: data?.id, futsalName: data?.name, distance, address: data?.address, numberOfCourts: data?.numberOfCourts, numberOfHoursOpen: data?.numberOfHoursOpen, imageUrl: "",
                description: data?.description, openTime: data?.openTime, closeTime: data?.closeTime
            }
        })
    }
    const addOrRemoveVenueFromUserFavorites = async () => {
        try {
            const { result } = await authorizedUpdate(`profile/addOrRemoveFavoriteVenueToUser/${data?.id}`, setError2, setLoading2)
            if (result?.message == "Venue Added To Favorite") {
                setIsFavorited(true)
                getPopularVenues()
            }
            if (result?.message == "Venue Removed From Favorite") {
                setIsFavorited(false)
                getPopularVenues()
            }
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(data?.numberOfCourts);
    return (
        <Pressable style={styles.container} onPress={onBookNow}>
            <View style={styles.imgWrapper}>
                <Image source={{ uri: data?.images[0] }} style={styles.image} />
            </View>
            <View style={styles.content}>
                <Text numberOfLines={1} style={[SIZES2.text_base]}>{data?.name}</Text>
                <View style={styles.addressWrapper}>
                    <EvilIcons name='location' />
                    <Text numberOfLines={1} style={[SIZES2.text_sm]}>{data?.address}/{data?.city}</Text>
                </View>
                {/* <View style={styles.wrapper}>
                    <FontAwesome name='star' size={15} color={"#f7b502"} />
                    <Text numberOfLines={1} style={[SIZES2.text_sm]}>4.8</Text>
                </View> */}
                <View style={styles.wrapper}>
                    <MaterialCommunityIcons name='map-marker-distance' size={18} color={COLORS.linkColor} />
                    <Text numberOfLines={1} style={[SIZES2.text_sm]}>{distance.toFixed(2)}km away</Text>
                </View>
                <View style={styles.wrapper}>
                    <MaterialCommunityIcons name='soccer-field' size={18} color={COLORS.gray_font_color} />
                    <Text numberOfLines={1} style={[SIZES2.text_sm]}>{data?.numberOfCourts} Court{data?.numberOfCourts > 0 ? 's' : ''}</Text>
                </View>
                <View style={styles.wrapper}>
                    {/* <MaterialCommunityIcons name='soccer-field' size={15} color={COLORS.linkColor} /> */}
                    <Text numberOfLines={1} style={[SIZES2.text_sm, { fontFamily: "poppins300", color: "rgba(0, 0, 0, .6)" }]}>{data?.description}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default FutsalCards

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bg_primary,
        // borderWidth: 1,
        borderColor: COLORS.bg_secondary,
        padding: 5,
        height: 135,
        borderRadius: 8,
        flexDirection: "row",
        columnGap: 5,
        alignItems: "center",
    },
    content: {
        flex: 1,
        alignItems: "flex-start",
        rowGap: 10
    },
    image: {
        width: "50",
        height: "100%",
        borderRadius: 8,
        resizeMode: "cover"
    },
    imgWrapper: {
        width: "45%",
    },
    addressWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        columnGap: 3
    },
    wrapper: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 3
    },
})