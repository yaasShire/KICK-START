//
import React from 'react';
import { BlurView } from 'expo-blur';
import { appLayout, COLORS, SIZES2 } from '../../../../theme/globalStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions, ImageBackground, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import futsalImage from '../../../../../assets/images/Futsals/futsal1.jpeg'
import { calculateDistance } from '../../../../utilities';
import { useNavigation } from '@react-navigation/native';
//
const { width, height } = Dimensions.get('screen');
//
const NearByFutsalsCard = ({ data = {}, location = {} }) => {
    const { navigate } = useNavigation()
    let distance
    if (location?.latitude && location?.longitude) {
        distance = calculateDistance(location.latitude, location?.longitude, Number(data?.latitude), Number(data?.longitude));
    }

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
    return (
        <Pressable onPress={onBookNow}>
            <ImageBackground source={{ uri: data?.images[1] }} resizeMode="cover" style={styles.container}>
                <View intensity={Platform.OS == "android" ? 80 : 60} tint="dark" style={styles.blurViewCon}>
                    <Text style={styles.futsalName}>
                        {data?.name}
                    </Text>
                    <View style={[{ columnGap: 1, justifyContent: 'flex-start' }]}>
                        <View style={{ flexDirection: "row", alignItems: "center", columnGap: 6 }}>
                            <MaterialCommunityIcons name="map-marker-distance" size={12} color={COLORS.tertiary_color} />
                            <Text style={styles.address}>
                                {distance.toFixed(2)}km
                            </Text>
                        </View>
                        <Text style={styles.address}>
                            {data?.city}/{data?.address}
                        </Text>
                    </View>
                    <View style={styles.rowCon}>
                        <Text style={styles.price}>
                            {data?.numberOfHoursOpen} Hours Open
                        </Text>
                        <Text style={styles.price}>
                            {data?.numberOfCourts} Courts
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </Pressable>
    )
}
//
export default NearByFutsalsCard;
//
const styles = StyleSheet.create({
    container: {
        height: height / 6,
        borderRadius: 10,
        width: width / 1.7,
        overflow: 'hidden',
        paddingBottom: '3%',
        justifyContent: 'flex-end'
    },
    blurViewCon: {
        rowGap: 5,
        width: '90%',
        padding: '3%',
        borderRadius: 5,
        marginLeft: '5%',
        marginBottom: '2.5%',
        overflow: 'hidden',
        borderWidth: 0.3,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderColor: COLORS.light_green_color,
    },
    rowCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    futsalName: {
        ...SIZES2.text_sm,
        color: "#ffffff",
        opacity: 99,
    },
    address: {
        opacity: 99,
        ...SIZES2.text_sm,
        letterSpacing: 0.7,
        color: COLORS.bg_secondary,
    },
    price: {
        opacity: 99,
        ...SIZES2.text_sm,
        letterSpacing: 0.7,
        color: "#ffffff",
    },
})
//