import { View, FlatList, Pressable, StyleSheet, Image } from 'react-native'
import { Avatar, Text } from 'react-native-ui-lib';
import { Checkbox, RadioButton } from 'react-native-paper';
import React, { useState } from 'react'
import { Picker } from "react-native-ui-lib/src/components/picker";
// import { regions } from '../../../../data';
import { Feather, Ionicons } from '@expo/vector-icons';
// import { COLORS, colors } from '../../../../../../theme/constants';
import { Colors } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
// import { addRegion, removeRegion } from '../../../../../../redux/selectedRegions';
import { useFormikContext } from 'formik';
import { COLORS, LAY_OUT } from '../../../../../theme/globalStyle';
import { addCity, addFacility, addRegion, removeCity, removeFacility, removeRegion } from '../../../../../redux/venue';
// import { addProductRegistrationSubCategory } from '../../../../../../redux/productRegistration';
const CityList = ({ data = [], title = "Select Region", err = false }) => {
    const cities = useSelector(state => state?.venueSlice?.venueRegistration?.city)

    const dispatch = useDispatch();
    const selectedSubCategory = []

    const checkIfSelected = (city) => {
        const result = cities.find(c => c?.id == city?.id)
        return result;
    }


    const { setFieldValue } = useFormikContext();
    const handleChange = (city) => {
        // if (regions.length != 0) {
        !checkIfSelected(city) ?
            dispatch(addCity(city)) : removeCityFromTheList(city)
        // }

    };
    const removeCityFromTheList = (city) => {
        // const filteredRegions = ""
        const filteredCities = cities?.filter(c => c?.id != city?.id)
        dispatch(removeCity(filteredCities))
    }
    console.log(cities.length);

    return (
        <Picker
            useSafeArea
            fieldType='form'
            style={styles.container}
            placeholderTextColor="#000"
            enableModalBlur={false}
            topBarProps={{ title }}
            searchPlaceholder="Search region"
            selectionLimit={3}
            floatingPlaceholder
            // mode={Picker.modes.MULTI}
            renderPicker={(value = "hello") => {
                return (
                    <View style={[styles.wrapperStyle, { borderBottomWidth: err ? 2 : 1, borderColor: err ? "#ad2111" : "rgba(0, 0, 0, .2)" }]}>
                        <View style={styles.select}>
                            {
                                cities?.length == 0 ?
                                    <Text style={[{ color: "#000" }]}>{title}</Text>
                                    : <Text style={[{ color: "#000", textTransform: "capitalize" }]}>{cities[0]?.name}</Text>
                            }
                            <Feather name='chevron-down' size={20} color={COLORS.gray_font_color} />
                        </View>
                    </View>
                );
            }}
        >
            <FlatList
                data={data}
                renderItem={({ item, index }) => (
                    <Picker.Item
                        key={item?.id}
                        label={item?.name}
                        onChange={item => console.warn(item)}
                        disabled={true}
                        renderItem={(contactValue, props) => {
                            return (
                                <Pressable
                                    style={{
                                        height: 56,
                                        borderBottomWidth: 1,
                                        borderColor: Colors.$backgroundNeutral,
                                        flexDirection: "row"
                                    }}
                                    paddingH-15
                                    row
                                    centerV
                                    spread
                                    onPress={() => handleChange(item)}
                                >
                                    <View row centerV style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", paddingHorizontal: "3%" }}>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            {/* <Image source={{ uri: item?.iconUrl }} style={{ width: 30, height: 30, resizeMode: "contain" }} /> */}
                                            <Text marginL-10 text70 $textDefault>
                                                {item?.name}
                                            </Text>
                                        </View>
                                        <Checkbox status={checkIfSelected(item) ? 'checked' : 'unchecked'} onPress={() => handleChange(item)} />
                                        {/* <RadioButton status={checkIfSelected(item) ? 'checked' : 'unchecked'} onPress={() => handleChange(item)} /> */}
                                    </View>
                                </Pressable>
                            );
                        }}
                    />
                )}
            />
        </Picker>
    )
}

export default CityList

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bg_primary
    },
    wrapperStyle: {
        backgroundColor: COLORS.bg_primary,
        height: 52,
        // borderWidth: 1,
        borderColor: "rgba(0, 0, 0, .5)",
        justifyContent: "center",
        padding: LAY_OUT.padding
    },
    select: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    selectText: {
        fontSize: 14,
        fontWeight: "400",
    }
})