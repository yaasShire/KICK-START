//
import React from 'react';
import { bookedFutsalsData } from '../../../data';
import { appLayout, COLORS } from '../../../theme/globalStyle';
import { BookedFutsalCards, Devider, Header, ListHeader } from '../../../components';
import { FlatList, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, View } from 'react-native';
//
const BookedFutsalsScreen = () => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView nestedScrollEnabled={false} style={styles.scrollCon} showsVerticalScrollIndicator={false}>
                {/* Head */}
                <View style={styles.head}>
                    <Header title="Booked Futsals" />
                    <Devider height={20} />
                    <Text>Explore</Text>
                    {/* <SearchingBtn /> */}
                </View>
                {/* Body */}
                <View style={styles.body}>
                    <Devider height={25} />
                    <FlatList
                        scrollEnabled={false}
                        data={bookedFutsalsData}
                        keyExtractor={(item, index) => item.id}
                        contentContainerStyle={styles.flatListCon}
                        renderItem={({ item }) => <BookedFutsalCards {...item} />}
                        ListHeaderComponent={() => <ListHeader title="Booked Futsals" />}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default BookedFutsalsScreen;
//
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.primary_color,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : StatusBar.currentHeight
    },
    head: {
        width: '100%',
        paddingBottom: '5%',
        zIndex: 0,
        padding: appLayout.padding,
        backgroundColor: COLORS.primary_color
    },
    body: {
        flex: 1,
        zIndex: 1000,
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