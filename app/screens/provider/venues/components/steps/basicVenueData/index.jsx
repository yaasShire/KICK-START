import { View, Text, StyleSheet, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../../../theme/globalStyle'
import { Button, TextInput } from 'react-native-paper'
import { Feather } from '@expo/vector-icons'
import PickTime from '../../pickTime'
import PickTimeCalendar from '../../pickTimeCalendar'
import { Formik } from 'formik'
import { basicVenueDataValidation } from '../../../../../../validation/venueRegistration/basicVenueDataValidation'
import { useDispatch, useSelector } from 'react-redux'
import { addBasicVenueData } from '../../../../../../redux/venue'
import VenueFacilities from '../../venueFacilities'
import { authorizeProviderGet } from '../../../../../../api/authorizedProviderGet'

const BasicVenueData = ({ setCurrentPosition = () => { } }) => {
    const venueBasicData = useSelector(state => state?.venueSlice?.venueRegistration?.basicVenueData)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openTime, setOpenTime] = useState(venueBasicData?.openTime ? new Date(JSON.parse(venueBasicData?.openTime)) : new Date())
    const [closeTime, setCloseTime] = useState(venueBasicData?.closeTime ? new Date(JSON.parse(venueBasicData?.closeTime)) : new Date())
    const venueFacilities = useSelector(state => state?.venueSlice?.venueRegistration?.facilities)
    const [facilityError, setFacilityError] = useState(false)
    const [intialVenueData, setIntialVenueData] = useState({
        name: venueBasicData?.name,
        email: venueBasicData?.email,
        description: venueBasicData?.description,
        numberOfHoursOpen: venueBasicData?.numberOfHoursOpen,
        facilityIdS: venueBasicData?.facilityIdS,
        phoneNumber: venueBasicData?.phoneNumber
    })
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [facilities, setFacilities] = useState([])
    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let amPm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours from 24-hour to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // If hours is 0, set it to 12

        // Add leading zero to minutes if needed
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${hours}:${minutes} ${amPm}`;
    }

    let formattedOpenTime = formatTime(openTime)
    let formattedCloseTime = formatTime(closeTime)
    const onSaveBasicVenueData = (values) => {
        console.log(values, formattedOpenTime, formattedCloseTime);

        if (formattedOpenTime && formattedCloseTime) {
            if (venueFacilities?.length == 0) {
                setFacilityError(true)
                setTimeout(() => {
                    setFacilityError(false)
                }, 3000)
                return;
            } else {
                dispatch(
                    addBasicVenueData({ ...values, openTime: JSON.stringify(openTime), closeTime: JSON.stringify(closeTime) })
                )
                setCurrentPosition(1)
            }
        }
    }

    const getFacilities = async () => {
        try {
            const { result } = await authorizeProviderGet("facility/get", setError, setLoading)
            console.log("result--->", result);
            setFacilities(result)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getFacilities()
    }, [])
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Formik
                        onSubmit={onSaveBasicVenueData}
                        initialValues={intialVenueData}
                        validationSchema={basicVenueDataValidation}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
                            return (
                                <View style={{ rowGap: 15, marginBottom: 15 }}>
                                    <View style={styles.textFieldsWrapper}>
                                        <TextInput
                                            mode='flat'
                                            label="Name"
                                            value={values.name}
                                            error={(errors?.name && touched.name) ? true : false}
                                            style={{ backgroundColor: "#fff" }}
                                            onChangeText={text => handleChange("name")(text)}
                                        />
                                        <TextInput
                                            mode='flat'
                                            label="Email"
                                            keyboardType='email-address'
                                            value={values.email}
                                            error={(errors?.email && touched.email) ? true : false}
                                            style={{ backgroundColor: "#fff" }}
                                            onChangeText={text => handleChange("email")(text)}
                                        />
                                        <TextInput
                                            mode='flat'
                                            label="Phone Number"
                                            keyboardType='number-pad'
                                            value={values.phoneNumber}
                                            error={(errors?.phoneNumber && touched.phoneNumber) ? true : false}
                                            style={{ backgroundColor: "#fff" }}
                                            onChangeText={text => handleChange("phoneNumber")(text)}
                                        />
                                        <TextInput
                                            mode='flat'
                                            label="Number Of Hours Open Daily"
                                            keyboardType='number-pad'
                                            value={
                                                values.numberOfHoursOpen
                                                // Number(values.numberOfHoursOpen) > 24 || Number(values.numberOfHoursOpen) == 0 ? handleChange("numberOfHoursOpen")("") : values.numberOfHoursOpen

                                            }
                                            error={(errors?.numberOfHoursOpen && touched.numberOfHoursOpen) ? true : false}
                                            style={{ backgroundColor: "#fff" }}
                                            onChangeText={text => {
                                                // Number(values.numberOfHoursOpen) > 24 || Number(values.numberOfHoursOpen) == 0 ? handleChange("numberOfHoursOpen")("") : handleChange("numberOfHoursOpen")(text)
                                                handleChange("numberOfHoursOpen")(text)

                                            }}
                                            maxLength={2}
                                        />
                                        <TextInput
                                            mode='flat'
                                            label="Description"
                                            value={values.description}
                                            error={(errors?.description && touched.description) ? true : false}
                                            style={{ backgroundColor: "#fff" }}
                                            onChangeText={text => handleChange("description")(text)}
                                        />
                                        <VenueFacilities data={[facilities]} err={facilityError} />
                                        <PickTimeCalendar title='Select Open Time:' setTime={setOpenTime} time={openTime} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                                        <PickTimeCalendar title='Select Close Time:' setTime={setCloseTime} time={closeTime} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                                    </View>
                                    <Button mode='contained' style={{ padding: 3 }} onPress={() => {
                                        handleSubmit()
                                        if (venueFacilities?.length == 0) {
                                            setFacilityError(true)
                                            setTimeout(() => {
                                                setFacilityError(false)
                                            }, 3000)
                                        }
                                    }}>Next</Button>
                                </View>
                            )
                        }}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>

        </View>
    )
}

export default BasicVenueData

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: LAY_OUT.padding,
        rowGap: 25
    },
    textFieldsWrapper: {
        rowGap: 10
    },

})