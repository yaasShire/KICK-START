//
import React, { useState } from 'react';
import { nearByFutsalsData } from '../../../data';
import { appLayout, COLORS } from '../../../theme/globalStyle';
import { Devider, FutsalCards, Header, ListEmptyComponent, ListHeader, SubHeader } from '../../../components';
import { Dimensions, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
//
const { height } = Dimensions.get('window');
//
const FavouriteScreen = () => {
    return (
        <SafeAreaView style={[styles.mainContainer]}>
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                {/* Head */}
                <View style={styles.head}>
                    <SubHeader title="Saved Futsals" />
                </View>
                {/* Body */}
                <View style={styles.body}>
                    <Devider />
                    <FlatList
                        scrollEnabled={false}
                        data={nearByFutsalsData}
                        keyExtractor={(item, index) => item.id}
                        contentContainerStyle={styles.flatListCon}
                        renderItem={({ item }) => <FutsalCards {...item} />}
                        ListEmptyComponent={() => <ListEmptyComponent message="No Saving Data Available" />}
                        ListHeaderComponent={() => <ListHeader title="Saved Futsals" textButton={nearByFutsalsData.length} />}
                    />
                    <Devider />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default FavouriteScreen;
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
        padding: '3%',
        paddingBottom: '7%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.bg_tertiary
    },
    flatListCon: {
        rowGap: 20,
        paddingHorizontal: appLayout.paddingX
    }
})
//