import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { LAY_OUT } from '../../../../../../theme/globalStyle'
import { Formik } from 'formik'
import { venueAddressValidation } from '../../../../../../validation/venueRegistration/venueAddressValidation'
import { useDispatch, useSelector } from 'react-redux'
import { addVenueAddress } from '../../../../../../redux/venue'
import { authorizeProviderGet } from '../../../../../../api/authorizedProviderGet'
import RegionsList from '../../regionsList'
import SelectList from '../../../../components/selectList'
import CityListPicker from '../../../../../../components/CityListPicker'
import { get } from '../../../../../../api/get'
import CityList from '../../cityList'

const VenueAddressData = ({ setCurrentPosition = () => { } }) => {
    const venueAddressData = useSelector(state => state?.venueSlice?.venueRegistration?.venueAddress)
    const [intialVenueAddressData, setIntialVenueAddressData] = useState({ address: venueAddressData?.address })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [regions, setRegions] = useState([])
    const [cities, setCities] = useState([])
    const [regionsError, setRegionsError] = useState(false)
    const [citiesError, setCitiesError] = useState(false)
    const regionsList = useSelector(state => state?.venueSlice?.venueRegistration?.regions)
    const selectedRegion = useSelector(state => state?.authSlice?.signUp?.region)
    const selectedCity = useSelector(state => state?.venueSlice?.venueRegistration?.city)

    const dispatch = useDispatch()
    const onSaveVenueAddressData = (values) => {
        try {
            console.log(values);
            dispatch(addVenueAddress(values))
            setCurrentPosition(2)
        } catch (error) {
            console.log(error);
        }
    }
    // 
    const getRegions = async () => {
        try {
            const { result } = await get("region/getAll")
            setRegions(result)
            getCities()
        } catch (error) {
            console.log(error)
        }
    }
    const getCities = async () => {
        try {
            const { result } = await get(`cities/${regionsList[0]?.regionId}`)
            setCities(result)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getRegions()
        getCities()
    }, [regions])

    return (
        <View style={styles.container}>
            <Formik
                onSubmit={onSaveVenueAddressData}
                initialValues={intialVenueAddressData}
                validationSchema={venueAddressValidation}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
                    return (
                        <>
                            <View style={styles.textFieldsWrapper}>
                                <RegionsList data={regions} err={regionsError} />
                                <CityList
                                    title='Choose City'
                                    data={cities}
                                    err={citiesError}
                                />
                                {/* <SelectList
                                    name="city"
                                    error={(errors?.city && touched.city) ? true : false}
                                    list={["MOGADISHU"]}
                                    value={values.city}
                                    title="Select City"
                                /> */}
                                <TextInput
                                    mode='flat'
                                    label="Detailed Address"
                                    value={values.address}
                                    onChangeText={text => handleChange("address")(text)}
                                    style={{ backgroundColor: "#fff", color: "#000" }}
                                    error={(errors?.address && touched.address) ? true : false}
                                />
                                {/* <TextInput
                                    mode='flat'
                                    label="City"
                                    value={values.city}
                                    onChangeText={text => handleChange("city")(text)}
                                    style={{ backgroundColor: "#fff", color: "#000" }}
                                    error={(errors?.city && touched.city) ? true : false}
                                /> */}
                            </View>
                            <View style={styles.btns}>
                                <Button mode='contained-tonal' style={{ padding: 3 }} onPress={() => setCurrentPosition(0)}>Prev</Button>
                                <Button mode='contained' style={{ padding: 3 }} onPress={() => {
                                    if (regionsList?.length == 0) {
                                        setRegionsError(true)
                                        setTimeout(() => {
                                            setRegionsError(false)
                                        }, 3000)
                                    } else if (selectedCity?.length == 0) {
                                        setCitiesError(true)
                                        setTimeout(() => {
                                            setCitiesError(false)
                                        }, 3000)
                                    } else {
                                        handleSubmit()
                                    }
                                }}>Next</Button>
                            </View>
                        </>
                    )
                }}
            </Formik>
        </View>
    )
}

export default VenueAddressData

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: LAY_OUT.padding,
        rowGap: 25
    },
    textFieldsWrapper: {
        rowGap: 10
    },
    btns: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})