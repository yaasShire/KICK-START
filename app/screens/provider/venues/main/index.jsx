import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import VenueHeader from '../components/header'
import VenueCard from '../components/venueCard'
import { LAY_OUT, SIZES2 } from '../../../../theme/globalStyle'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import GorhomBottomSheet from '../../../../components/GorhomBottomSheet'
import VenueRegistration from '../components/venueRegistration'
import { get } from '../../../../api/get'
import noVenueFoundImg from '../../../../../assets/images/Futsals/venue_not_found.png'
import { authorizeProviderGet } from '../../../../api/authorizedProviderGet'
import { ListEmptyComponent } from '../../../../components'
import EmptyC from '../../../provider/components/emptyC'
import ConfirmationModal from '../../components/confirmationModal'
import { authorizedProviderDelete } from '../../../../api/authorizedProviderDelete'
import { useDispatch } from 'react-redux'
import { addBasicVenueData, addVenueAddress, addVenueImages } from '../../../../redux/venue'
import IosAndroidSafeArea from '../../../../components/iosAndroidSafeArea'
const MainVenue = () => {
    const { navigate } = useNavigation()
    const venueRegistrationRef = useRef()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [venues, setVenues] = useState([])
    const [updateVenueStatus, setUpdateVenueStatus] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [venue, setVenue] = useState({})
    const [refreshing, setRefreshing] = useState(false)
    const [confirmationTexts, setConfirmationTexts] = useState({
        title: "",
        description: "",
        label: ""
    })
    const dispatch = useDispatch()
    const onVenueCLick = (id) => {
        navigate("VenueDetail", { id })
    }
    const onRegisterProductBtn = () => {
        venueRegistrationRef?.current?.expand()
    }

    const getProviderVenues = async () => {
        try {
            const { result } = await authorizeProviderGet("venue/myVenues", setError, setLoading)
            setVenues(result)
        } catch (error) {
            console.log(error);
        }
    }



    const deleteVenue = async () => {
        try {
            console.log("courtId", venue?.id);
            const { result } = await authorizedProviderDelete(`venue/delete/${venue?.id}`, setError, setLoading)
            console.log("result-->", result);
            if (result?.message == "Venue Deleted Successfully") {
                getProviderVenues()
            }
        } catch (error) {
            console.log(error);
        }
    }
    const updateVenue = async () => {
        try {
            // console.log(venue?.openTime, venue?.closeTime, venue);
            // dispatch(addBasicVenueData({
            //     name: venue?.name,
            //     email: venue?.email,
            //     phoneNumber: venue?.phoneNumber,
            //     numberOfHoursOpen: venue?.numberOfHoursOpen,
            //     description: venue?.description,
            //     facilityIdS: venue?.facilityIdS,
            //     // openTime: venue?.openTime,
            //     // closeTime: venue?.closeTime
            // }))

            // dispatch(addVenueAddress({
            //     address: venue?.address,
            //     city: venue?.city
            // }))
            // dispatch(addVenueImages(venue?.images))

            // setUpdateVenueStatus(true)
            // venueRegistrationRef?.current?.expand()

        } catch (error) {
            console.log(error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getProviderVenues()
        }, [])
    )
    return (
        <View style={styles.container}>
            <IosAndroidSafeArea />
            <VenueHeader onRegisterProductBtn={onRegisterProductBtn} title="Venues" showAddIcon />
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ rowGap: 10, padding: LAY_OUT.padding }}
                data={venues}
                renderItem={({ item }) => (
                    <VenueCard setVenue={setVenue} onPress={() => onVenueCLick(item?.id)} data={item} setShowConfirmationModal={setShowConfirmationModal} setConfirmationTexts={setConfirmationTexts} />
                )}
                ListEmptyComponent={() => (<EmptyC title='No Venue Found' />)}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getProviderVenues} />}
            />
            <GorhomBottomSheet sheetRef={venueRegistrationRef} snapPoints={["93%"]} >
                <VenueRegistration getProviderVenues={getProviderVenues} venue venueRegistrationRef={venueRegistrationRef} />
            </GorhomBottomSheet>
            <ConfirmationModal updateVenue={updateVenue} deleteVenue={deleteVenue} showConfirmationModal={showConfirmationModal} setShowConfirmationModal={setShowConfirmationModal} confirmationTexts={confirmationTexts} />
        </View>
    )
}

export default MainVenue

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
})