import { View, FlatList, Pressable, StyleSheet } from 'react-native'
import { Avatar, Text } from 'react-native-ui-lib';
import { Checkbox } from 'react-native-paper';
import React, { useState } from 'react'
import { Picker } from "react-native-ui-lib/src/components/picker";
// import { regions } from '../../../../data';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { addVenue, removeVenue } from '../../../../../redux/venue'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../../theme/globalStyle';
const VenueListPicker = ({ venues = [], cardStyle = {}, label = "", onPress = () => { }, setShowReport = () => { } }) => {
    const dropdownIcon = <Feather name='chevron-down' color={COLORS.gray_color} size={20} />;
    const dispatch = useDispatch();
    const venueList = useSelector(state => state?.venueSlice?.report?.venues)
    const handleAddVenue = (venue) => {
        !checkIfSelected(venue) ?
            dispatch(addVenue(venue)) : removeVenueFromStore(venue)

    }
    const checkIfSelected = (venue = {}) => {
        const result = venueList.find(v => v?.name == venue?.name)
        return result;
    }
    const removeVenueFromStore = (venue = {}) => {
        const filteredVenues = venueList.filter(v => v?.name != venue?.name)
        dispatch(removeVenue(filteredVenues))
        if (filteredVenues?.length == 0) {
            setShowReport(false)
        }
    }

    return (
        <Picker
            useSafeArea
            fieldType='form'
            style={styles.container}
            placeholder={label}
            placeholderTextColor="#000"
            enableModalBlur={false}
            topBarProps={{ title: "Choose Venues" }}
            searchPlaceholder="Search Venue"
            selectionLimit={3}
            floatingPlaceholder
            mode={Picker.modes.MULTI}
            renderPicker={(value = "hello") => {
                return (
                    <View style={styles.wrapperStyle}>
                        {
                            venueList?.length > 0 ?
                                <FlatList
                                    scrollEnabled={false}
                                    data={venueList}
                                    contentContainerStyle={{ flexDirection: "row", alignItems: "center", columnGap: 3 }}
                                    renderItem={({ item, index }) => (
                                        <Text style={[SIZES2.text_md]}>{item?.name}{index != venueList?.length - 1 ? ',' : null}</Text>
                                    )}
                                />
                                :
                                <Text style={[SIZES2.text_md]}>{label}</Text>
                        }
                        <Feather name='chevron-down' size={20} color={COLORS.gray_color} />
                        {/* <View style={cardStyle.barStyle} /> */}
                    </View>
                );
            }}
        >
            <FlatList
                data={venues}
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
                                    onPress={() => handleAddVenue(item)}
                                >
                                    <View row centerV style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", paddingHorizontal: "3%" }}>
                                        <Text marginL-10 text70 $textDefault>
                                            {props.label}
                                        </Text>
                                        <Checkbox status={checkIfSelected(item) ? 'checked' : 'unchecked'} onPress={() => handleAddVenue(item)} />
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

export default VenueListPicker


const styles = StyleSheet.create({
    container: {
    },
    wrapperStyle: {
        // backgroundColor: "pink",
        width: 265,
        height: 40,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: LAY_OUT.padding,
        borderWidth: 1,
        borderColor: COLORS.gray_color,
        borderRadius: 5

    }
})