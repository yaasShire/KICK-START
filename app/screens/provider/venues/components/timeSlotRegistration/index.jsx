import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { COLORS, LAY_OUT } from '../../../../../theme/globalStyle';
import PickTimeCalendar from '../pickTimeCalendar';
import { Formik } from 'formik';
import { timeSlotRegistrationValidation } from '../../../../../validation/timeSlotRegistration';
import { authorizedProviderPost } from '../../../../../api/authorizedProviderPost';
import { useSelector } from 'react-redux';
import { authorizedProviderUpdate } from '../../../../../api/authorizedProviderUpdate';

const TimeSlotRegistration = ({ timeSlotRegistrationRef, courtId = 0, onRefresh = () => { }, updateTimeSlot = false }) => {
    const timeSlotUpdateValue = useSelector(state => state?.venueSlice?.timeSlotUpdateData);
    const [openTime, setOpenTime] = useState(new Date());
    const [closeTime, setCloseTime] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [initialValues, setInitialValues] = useState({ price: timeSlotUpdateValue?.price || '' });

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let amPm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours from 24-hour to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // If hours is 0, set it to 12

        // Add leading zero to minutes if needed
        minutes = minutes < 10 ? '0' + minutes : minutes;
        hours = hours < 10 ? '0' + hours : hours;

        return `${hours}:${minutes} ${amPm}`;
    }

    let formattedStartTime = formatTime(startTime);
    let formattedEndTime = formatTime(endTime);

    const registerTimeSlot = async (values = {}) => {
        try {
            const data = {
                courtId: Number(courtId),
                startTime: formattedStartTime,
                endTime: formattedEndTime,
                available: true,
                price: Number(values?.price) * 1.0
            };

            if (!updateTimeSlot) {
                console.log(data);

                const { result } = await authorizedProviderPost("timeslot/create", setError, setLoading, JSON.stringify(data));
                if (result?.message == "Time Slot Created Successfully") {
                    timeSlotRegistrationRef?.current?.close();
                    onRefresh();
                }
                if (result?.message == "Invalid Time Slot, Time Slot Already Exists") {
                    setVisible(true);
                    setError(result);
                }
                if (result?.status == "BAD_REQUEST") {
                    setVisible(true);
                    setError(result);
                }
                console.log(result);
            } else {
                const { result } = await authorizedProviderUpdate(`timeslot/update/${timeSlotUpdateValue?.id}`, setError, setLoading, JSON.stringify(data));
                if (result?.message == "Time Slot Updated Successfully") {
                    timeSlotRegistrationRef?.current?.close();
                    onRefresh();
                }
                if (result?.message == "Invalid Time Slot, Time Slot Already Exists") {
                    setVisible(true);
                    setError(result);
                }
                if (result?.status == "BAD_REQUEST") {
                    setVisible(true);
                    setError(result);
                }
                // console.log(result?.message);
            }
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setInitialValues({
            price: timeSlotUpdateValue?.price || ''
        });
    }, [timeSlotUpdateValue]);

    // console.log(timeSlotUpdateValue?.price);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1 }}
                keyboardVerticalOffset={15}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ backgroundColor: "#fff" }}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={registerTimeSlot}
                        validationSchema={timeSlotRegistrationValidation}
                        enableReinitialize
                    >
                        {({ errors, values, handleChange, handleSubmit, touched }) => (
                            <View style={styles.fieldBtnWrapper}>
                                <View style={styles.textFieldsWrapper}>
                                    <TextInput
                                        mode='flat'
                                        style={{ backgroundColor: "#fff" }}
                                        label={"Price"}
                                        value={values.price}
                                        placeholder='$20'
                                        textColor='#000'
                                        onChangeText={handleChange("price")}
                                        error={(errors.price && touched.price) ? true : false}
                                        keyboardType='decimal-pad'
                                    />
                                    <PickTimeCalendar title='Select Start Time:' setTime={setStartTime} time={startTime} />
                                    <PickTimeCalendar title='Select End Time:' setTime={setEndTime} time={endTime} />
                                </View>
                                <Button loading={loading} mode='contained' style={{ padding: 3, backgroundColor: COLORS.primary_color }} onPress={handleSubmit}>{updateTimeSlot ? 'Update' : "Register"}</Button>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                style={{ width: "100%" }}
                action={{
                    label: 'Verification Failed',
                    onPress: () => {
                        // Do something
                    },
                }}
            >
                {error?.message}
            </Snackbar>
        </View>
    );
};

export default TimeSlotRegistration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: LAY_OUT.padding,
        backgroundColor: "#fff"
    },
    textFieldsWrapper: {
        rowGap: 10
    },
    fieldBtnWrapper: {
        rowGap: 20
    }
});
