//
import React from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Devider, ListEmptyComponent, ListHeader, SubHeader } from '../../../components';
import { notifigations } from '../../../data';
import { appLayout, COLORS } from '../../../theme/globalStyle';
import { NotificationCards } from './components';
//
const NotificationScreen = () => {
    return (
        <SafeAreaView style={[styles.mainContainer]}>
            <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', }}>
                {/* Head */}
                <View style={styles.head}>
                    <SubHeader title="Notifications" />
                </View>
                {/* Body */}
                <View style={styles.body}>
                    <Devider />
                    <FlatList
                        scrollEnabled={false}
                        data={notifigations}
                        keyExtractor={(item, index) => item.id}
                        contentContainerStyle={styles.flatListCon}
                        renderItem={({ item }) => <NotificationCards {...item} />}
                        ListEmptyComponent={() => <ListEmptyComponent message="No Saving Data Available" />}
                        ListHeaderComponent={() => <ListHeader title="New" textButton={notifigations.length} />}
                    />
                    <Devider height={25} />
                    <FlatList
                        scrollEnabled={false}
                        data={notifigations}
                        keyExtractor={(item, index) => item.id}
                        contentContainerStyle={styles.flatListCon}
                        renderItem={({ item }) => <NotificationCards {...item} />}
                        ListEmptyComponent={() => <ListEmptyComponent message="No Saving Data Available" />}
                        ListHeaderComponent={() => <ListHeader title="Earlier" textButton={notifigations.length} />}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default NotificationScreen;
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