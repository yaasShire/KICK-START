import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { Formik } from 'formik'
import { basicCourtDataValidation } from '../../../../../../validation/courtRegistration/basicCourtDataValidation'
import { useDispatch, useSelector } from 'react-redux'
import { addBasicCourtData } from '../../../../../../redux/venue'
import SelectList from '../../../../components/selectList'

const BasicCourtData = ({ setCurrentPosition = () => { } }) => {
    const basicCourtData = useSelector(state => state?.venueSlice?.courtRegistration?.basicCourtData)
    const [courtInitialValues, setCourtInitialValues] = useState({
        name: basicCourtData?.name || '',
        surface: basicCourtData?.surface || '',
        activePlayersPerTeam: basicCourtData?.activePlayersPerTeam || '',
        basePrice: basicCourtData?.basePrice || ''
    })
    const dispatch = useDispatch()

    const onNext = async (values = {}) => {
        try {
            dispatch(addBasicCourtData(values))
            setCurrentPosition(1)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setCourtInitialValues({
            name: basicCourtData?.name || '',
            surface: basicCourtData?.surface || '',
            activePlayersPerTeam: basicCourtData?.activePlayersPerTeam || '',
            basePrice: basicCourtData?.basePrice || ''
        })
    }, [basicCourtData])

    return (
        <View style={styles.container}>
            <Formik
                validationSchema={basicCourtDataValidation}
                initialValues={courtInitialValues}
                onSubmit={onNext}
                enableReinitialize
            >
                {({ errors, values, touched, handleChange, handleSubmit }) => (
                    <>
                        <View style={styles.textFieldsWrapper}>
                            <TextInput
                                mode='flat'
                                label="Name"
                                value={values.name}
                                style={{ backgroundColor: "#fff" }}
                                onChangeText={handleChange("name")}
                                error={(errors?.name && touched.name) ? true : false}
                            />
                            <TextInput
                                mode='flat'
                                label="Active Players Per Team"
                                value={String(values.activePlayersPerTeam)}
                                style={{ backgroundColor: "#fff" }}
                                onChangeText={handleChange("activePlayersPerTeam")}
                                error={(errors?.activePlayersPerTeam && touched.activePlayersPerTeam) ? true : false}
                                keyboardType='number-pad'
                            />
                            <SelectList
                                name="surface"
                                error={(errors?.surface && touched?.surface) ? true : false}
                                list={["WOOD", "ARTIFICIAL_TURF"]}
                                value={values.surface}
                            />
                            <TextInput
                                mode="flat"
                                label="Base Price"
                                value={String(values.basePrice)}
                                style={{ backgroundColor: "#fff" }}
                                onChangeText={handleChange("basePrice")}
                                error={(errors?.basePrice && touched?.basePrice) ? true : false}
                                keyboardType='numeric'
                            />
                        </View>
                        <Button mode='contained' style={{ padding: 4 }} onPress={handleSubmit}>Next</Button>
                    </>
                )}
            </Formik>
        </View>
    )
}

export default BasicCourtData

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        rowGap: 25
    },
    textFieldsWrapper: {
        rowGap: 10
    },
})
