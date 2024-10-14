import { View, FlatList, Pressable, StyleSheet } from 'react-native'
import { Avatar, Text } from 'react-native-ui-lib';
import { Checkbox } from 'react-native-paper';
import React, { useState } from 'react'
import { Picker } from "react-native-ui-lib/src/components/picker";
// import { regions } from '../../../../data';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Colors } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
// import { addRegion, removeRegion } from '../../../redux/selectedRegions';
// import { setSignUpRegion } from '../../../redux/uploadSlice';
import { COLORS, SIZES2 } from '../../../theme/globalStyle';
import { addRegion } from '../../../redux/auth';
const RegionListPicker = ({ regions, cardStyle = {}, label = "" }) => {
    const [regionsList, setRegionsList] = useState(regions)
    const dropdownIcon = <Feather name='chevron-down' color={COLORS.black600} size={20} />;
    const dispatch = useDispatch();
    // const selectedRegionsList = useSelector(state => state?.selectedRegions?.regions)
    const selectedRegion = useSelector(state => state?.authSlice?.signUp?.region)
    const handleAddRegion = (region) => {
        dispatch(addRegion(region))
    }
    const checkIfSelected = (region) => {
        return Number(selectedRegion?.regionId) == Number(region?.regionId)
    }
    // const removeRegionFromStore = (region) => {
    //     const filteredRegions = selectedRegionsList.filter(r => r?.regionId != region?.regionId)
    //     // dispatch(removeRegion(filteredRegions))
    // }


    return (
        <Picker
            useSafeArea
            fieldType='form'
            style={styles.container}
            placeholder={label}
            placeholderTextColor="#000"
            enableModalBlur={false}
            topBarProps={{ title: "Choose Region" }}
            searchPlaceholder="Search region"
            selectionLimit={3}
            floatingPlaceholder
            // mode={Picker.modes.MULTI}
            renderPicker={(value = "hello") => {
                return (
                    <View style={cardStyle.wrapperStyle}>
                        {/* <Ionicons name='location-outline' size={22} color={COLORS.black600} /> */}
                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 6 }} >
                            {
                                // selectedRegionsList?.length > 0 ?
                                //     <FlatList
                                //         scrollEnabled={false}
                                //         data={selectedRegionsList}
                                //         contentContainerStyle={{ flexDirection: "row", height: "100%", alignItems: "center", columnGap: 6 }}
                                //         renderItem={({ item }) => (
                                //             <Text style={{ fontSize: 15, fontFamily: "Poppins-Medium.ttf", opacity: .79 }}>{item?.regionName},</Text>
                                //         )}
                                //     />
                                //     :
                                // <Text style={{ fontSize: 15, fontFamily: "Poppins-Medium.ttf", opacity: .79 }}>{selectedRegion?.regionName}</Text>
                                <Text style={[SIZES2.text_md]}>{selectedRegion?.name ? selectedRegion?.name : label}</Text>
                            }
                            <Feather name='chevron-down' size={20} color={COLORS.gray_font_color} />
                            {/* <View style={cardStyle.barStyle} /> */}
                        </View>
                    </View >
                );
            }}
        >
            <FlatList
                data={regions}
                renderItem={({ item, index }) => (
                    <Picker.Item
                        key={item?.regionId}
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
                                    onPress={() => handleAddRegion(item)}
                                >
                                    <View row centerV style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", paddingHorizontal: "3%" }}>
                                        <Text marginL-10 text70 $textDefault>
                                            {props.label}
                                        </Text>
                                        <Checkbox status={checkIfSelected(item) ? 'checked' : 'unchecked'} onPress={() => handleAddRegion(item)} />
                                    </View>
                                </Pressable>
                            );
                        }}
                    />
                )}
            />
        </Picker >
    )
}

export default RegionListPicker

const styles = StyleSheet.create({
    container: {

    }
})