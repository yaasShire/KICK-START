//
import React, { useCallback, useState } from 'react';
import { TextInput } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { appLayout, COLORS } from '../../../theme/globalStyle';
import { CustomBtn, CustomInput, Devider, ListHeader, SubHeader } from '../../../components';
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import SelectableCard from './components/SelectableCard';
import { groundCampacity } from '../../../data';
import SortingCard from './components/SortingCards';
import CustomButton from '../../../components/CustomBtn';
//
const FilteringScreen = () => {
    const [errorMsg, setErrorMsg] = useState(false)
    const [filteringData, setfilteringData] = useState({
        minimumPrice: "", maximumPrice: "", distance: "", capacity: "", sortBy: "Price"
    });
    const onChangeMinPrice = (value) => {
        setfilteringData({ ...filteringData, minimumPrice: value })
        // if (value > filteringData.minimumPrice)
        //     setErrorMsg(true)
        // else {
        //     setErrorMsg(false)
        // }
    }
    const onChangeMaxPrice = (value) => {
        setfilteringData({ ...filteringData, maximumPrice: value })
        // if (value < filteringData.minimumPrice)
        //     setErrorMsg(true)
        // else {
        //     setErrorMsg(false)
        // }
    }
    const onChangeDistance = (value) => {
        setfilteringData({ ...filteringData, distance: value })
    }
    const onChangeCapacity = (value) => {
        setfilteringData({ ...filteringData, capacity: value })
    }
    const onChangeSorting = (value) => {
        setfilteringData({ ...filteringData, sortBy: value })
    }
    const onApplyChanges = () => {
        console.log("filteringData", filteringData);
    }
    //
    return (
        <SafeAreaView style={[styles.mainContainer]}>
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                {/* Head */}
                <View style={styles.head}>
                    <SubHeader title="Data Filtering" />
                </View>
                {/* Body */}
                <View style={styles.body}>
                    <Devider height={30} />
                    {/* Price Range Container */}
                    <ListHeader title="Price Range" textButton={`${filteringData.minimumPrice && filteringData.maximumPrice ? "" : `${filteringData.minimumPrice}  ${filteringData.maximumPrice}`}`} />
                    <Devider height={10} />
                    <View style={styles.priceRangeCon}>
                        <CustomInput
                            error={errorMsg}
                            placeholder="0"
                            label="Min Price"
                            keyboardType="numeric"
                            style={styles.textField}
                            onChangeText={onChangeMinPrice}
                            value={filteringData.minimumPrice}
                            right={<TextInput.Icon icon="currency-usd" />}
                        />
                        <CustomInput
                            error={errorMsg}
                            placeholder="0"
                            label="Max Price"
                            keyboardType="numeric"
                            style={styles.textField}
                            onChangeText={onChangeMaxPrice}
                            value={filteringData.maximumPrice}
                            right={<TextInput.Icon icon="currency-usd" />}
                        />
                    </View>
                    <Devider height={30} />
                    {/* distance range container */}
                    <ListHeader title="Distance" textButton={`${filteringData.distance == false ? "null" : `upto - ${filteringData.distance}km`}`} />
                    <Devider height={10} />
                    <CustomInput
                        placeholder="0"
                        label="Distance"
                        keyboardType="numeric"
                        onChangeText={onChangeDistance}
                        value={filteringData.distance}
                        right={<TextInput.Icon icon="social-distance-2-meters" />}
                    />
                    {/* ground type container */}
                    <Devider height={30} />
                    <ListHeader title="Ground Type" textButton={`${filteringData.capacity} vs ${filteringData.capacity} `} />
                    <Devider height={15} />
                    <FlatList
                        numColumns={2}
                        scrollEnabled={false}
                        data={groundCampacity}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.capacityCon}
                        renderItem={({ item }) => <SelectableCard {...item} selectCapacity={filteringData.capacity} onSelectCard={() => onChangeCapacity(item.capacity)} />}
                    />
                    {/* Sorting */}
                    <Devider height={30} />
                    <ListHeader title="Sort By" textButton={`${filteringData.sortBy}`} />
                    <Devider height={15} />
                    <View style={{ flexDirection: "row" }}>
                        <SortingCard
                            label="Price"
                            selectCard={filteringData.sortBy}
                            onSelectCard={() => onChangeSorting("Price")}
                        />
                        <SortingCard
                            label="Distance"
                            selectCard={filteringData.sortBy}
                            onSelectCard={() => onChangeSorting("Distance")}
                        />
                    </View>
                    {/* Submit Button */}
                    <Devider height={30} />
                    <CustomButton
                        title="Apply Filters"
                        onClickHandler={onApplyChanges}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default FilteringScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.primary_color,
    },
    head: {
        zIndex: 0,
        width: '100%',
        paddingBottom: '5%',
        padding: appLayout.padding,
        backgroundColor: COLORS.primary_color
    },
    body: {
        flex: 1,
        zIndex: 1000,
        padding: '4%',
        paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.bg_primary
    },
    priceRangeCon: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"
    },
    textField: {
        width: "47%",
        backgroundColor: COLORS.bg_primary
    },
    capacityCon: {
        rowGap: 20
    }
})
//