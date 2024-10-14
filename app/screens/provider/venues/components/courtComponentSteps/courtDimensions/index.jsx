import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Snackbar, TextInput } from 'react-native-paper'
import { COLORS, LAY_OUT } from '../../../../../../theme/globalStyle'
import { Formik } from 'formik'
import { courtDimensionsValidation } from '../../../../../../validation/courtRegistration/courtDimensionsValidation'
import { useDispatch, useSelector } from 'react-redux'
import { addBasicCourtData, addCourtDimensions } from '../../../../../../redux/venue'
import { authorizedProviderPost } from '../../../../../../api/authorizedProviderPost'
import { authorizedProviderUpdate } from '../../../../../../api/authorizedProviderUpdate'

const CourtDimensions = ({ courtId = "", setCurrentPosition = () => { }, venueId = "", getVenueCourts = () => { }, courtRegistrationRef, updateCourt = false }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [visible, setVisible] = useState(false)
    const courtDimensionsData = useSelector(state => state?.venueSlice?.courtRegistration?.dimensitions)
    const basicCourtData = useSelector(state => state?.venueSlice?.courtRegistration?.basicCourtData)
    const dispatch = useDispatch()

    const onToggleSnackBar = () => setVisible(!visible)
    const onDismissSnackBar = () => setVisible(false)

    const clearCourtRegistration = () => {
        try {
            dispatch(addCourtDimensions({}))
            dispatch(addBasicCourtData({}))
        } catch (error) {
            console.log(error)
        }
    }

    const [courtDimensionsInitialValues, setCourtDimensionsInitialValues] = useState({
        width: courtDimensionsData?.width || '',
        height: courtDimensionsData?.height || '',
        additionalInfo: courtDimensionsData?.additionalInfo || ''
    })

    useEffect(() => {
        setCourtDimensionsInitialValues({
            width: courtDimensionsData?.width || '',
            height: courtDimensionsData?.height || '',
            additionalInfo: courtDimensionsData?.additionalInfo || ''
        })
    }, [courtDimensionsData])

    const onUpload = async (values = {}) => {
        try {
            // alert("h")
            dispatch(addCourtDimensions(values))
            const data = {
                venueId,
                name: basicCourtData?.name,
                surface: basicCourtData?.surface,
                width: Number(values.width) * 1.0,
                height: Number(values.height) * 1.0,
                activePlayersPerTeam: Number(basicCourtData?.activePlayersPerTeam),
                basePrice: Number(basicCourtData?.basePrice) * 1.0,
                additionalInfo: values.additionalInfo
            }
            const updateData = {
                name: basicCourtData?.name,
                surface: basicCourtData?.surface,
                width: Number(values.width) * 1.0,
                height: Number(values.height) * 1.0,
                activePlayersPerTeam: Number(basicCourtData?.activePlayersPerTeam),
                basePrice: Number(basicCourtData?.basePrice) * 1.0,
                additionalInfo: values.additionalInfo
            }
            if (updateCourt) {
                const { result } = await authorizedProviderUpdate(`court/update/${courtId}`, setError, setLoading, JSON.stringify(data))
                if (result?.message == "Court Updated Successfully") {
                    clearCourtRegistration()
                    setCurrentPosition(0)
                    getVenueCourts()
                    courtRegistrationRef?.current?.close()
                }
            }
            else {
                const { result } = await authorizedProviderPost("court/create", setError, setLoading, JSON.stringify(data))
                console.log(result);
                if (result?.status === "CREATED") {
                    clearCourtRegistration()
                    setCurrentPosition(0)
                    getVenueCourts()
                    courtRegistrationRef?.current?.close()
                } else if (result?.message === `Court With Name '${basicCourtData?.name}' Already Exists`) {
                    setError(result)
                    setVisible(true)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(courtDimensionsData, updateCourt);

    return (
        <>
            <View style={styles.container}>
                <Formik
                    validationSchema={courtDimensionsValidation}
                    initialValues={courtDimensionsInitialValues}
                    onSubmit={onUpload}
                    enableReinitialize
                >
                    {({ errors, values, handleChange, handleSubmit, touched }) => (
                        <>
                            <View style={styles.textFieldsWrapper}>
                                <TextInput
                                    mode='flat'
                                    label="Width"
                                    value={String(values.width)}
                                    style={{ backgroundColor: "#fff" }}
                                    onChangeText={handleChange("width")}
                                    error={(errors?.width && touched.width) ? true : false}
                                    keyboardType='numeric'
                                />
                                <TextInput
                                    mode='flat'
                                    label="Height"
                                    value={String(values.height)}
                                    style={{ backgroundColor: "#fff" }}
                                    onChangeText={handleChange("height")}
                                    error={(errors?.height && touched.height) ? true : false}
                                    keyboardType='numeric'
                                />
                                <TextInput
                                    mode='flat'
                                    label="Description"
                                    multiline
                                    numberOfLines={10}
                                    value={values.additionalInfo}
                                    style={{ backgroundColor: "#fff" }}
                                    onChangeText={handleChange("additionalInfo")}
                                    error={(errors?.additionalInfo && touched.additionalInfo) ? true : false}
                                />
                            </View>
                            <View style={styles.btns}>
                                <Button mode='contained-tonal' style={{ padding: 4 }} onPress={() => setCurrentPosition(0)}>Prev</Button>
                                <Button mode='contained' style={{ padding: 4, backgroundColor: COLORS.primary_color }} onPress={handleSubmit}>{updateCourt ? "Update Court" : "Upload"}</Button>
                            </View>
                        </>
                    )}
                </Formik>
            </View>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Verification Failed',
                    onPress: () => { },
                }}
            >
                {error?.message}
            </Snackbar>
        </>
    )
}

export default CourtDimensions

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
