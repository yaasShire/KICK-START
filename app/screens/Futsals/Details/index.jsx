//
import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { Devider, ListHeader } from '../../../components';
import { amenities, nearByFutsalsData } from '../../../data';
import { appLayout, COLORS } from '../../../theme/globalStyle';
import { AmenitiesCard, CourtsCard, FutsalInfoCard, ImageCarousel } from './components';
import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
//
const DetailsScreen = ({ route }) => {
    const futsalInfo = route.params;
    const [mapRegion, setMapRegion] = useState({
        latitude: "37.78825",
        longitude: "-122.4324",
        latitudeDelta: "0.0922",
        longitudeDelta: "0.0421",
    })
    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.black_color} />
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
                {/* Head */}
                <View style={styles.head}>
                    <ImageCarousel />
                </View>
                {/* Body */}
                <View style={styles.body}>
                    {/* Futsal Information Card */}
                    <FutsalInfoCard {...futsalInfo} />
                    <Devider />
                    {/* Amenities  */}
                    <ListHeader title="Amenities" />
                    <Devider height={15} />
                    <FlatList
                        horizontal
                        data={amenities}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.FlatListCon}
                        renderItem={({ item }) => <AmenitiesCard {...item} />}
                    />
                    <Devider height={20} />
                    {/* Futsal daily working Time Card */}
                    <View style={styles.futsalOpensTimeCon}>
                        <Text style={styles.timeTxt}>
                            Opening Time
                        </Text>
                        <Text style={styles.timeTxt}>
                            Opens 6:30AM to 12:00PM
                        </Text>
                    </View>
                    <Devider height={20} />
                    {/* Futsal Grounds Card */}
                    <FlatList
                        scrollEnabled={false}
                        data={nearByFutsalsData}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.courtsFlatListCon}
                        renderItem={({ item }) => <CourtsCard {...item} />}
                        ListHeaderComponent={() => <ListHeader title={`${futsalInfo.futsalName} Grounds`} />}
                    />
                    {/* Map View */}
                    <Devider />
                    <ListHeader title="Location" textButton="1km is away for you" />
                    <Devider height={12} />
                    <MapView
                        region={mapRegion}
                        style={styles.map}
                    />
                </View>
            </ScrollView>
        </View >
    )
}
//
export default DetailsScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.bg_tertiary
    },
    head: {
        zIndex: 0,
        width: '100%',
        backgroundColor: COLORS.bg_tertiary
    },
    body: {
        flex: 1,
        zIndex: 1000,
        paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: appLayout.padding,
        backgroundColor: COLORS.bg_primary
    },
    FlatListCon: {
        columnGap: 20,
        paddingVertical: '3%',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: COLORS.gray_color
    },
    futsalOpensTimeCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        paddingVertical: '3%',
        paddingHorizontal: '4%',
        backgroundColor: COLORS.black900
    },
    timeTxt: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff'
    },
    courtsFlatListCon: {
        rowGap: 20
    },
    map: {
        height: 180,
        borderRadius: 7
    }
})
//