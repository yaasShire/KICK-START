//
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES2 } from '../../../../theme/globalStyle';
import Feather from 'react-native-vector-icons/Feather';
import { Avatar } from 'react-native-paper';
//
const NatificationCards = ({ title, description, dateAndTime, data = {} }) => {
    console.log(data);
    return (
        <View style={styles.container}>
            {/* icon container */}
            <View style={styles.iconContainer}>
                {/* <Feather name="bell" size={22} /> */}
                <Avatar.Image source={{ uri: data?.image }} size={45} />
            </View>
            <View style={styles.contentCon}>
                <Text style={styles.content}>
                    <Text style={styles.title}>
                        {data?.venueName + ': '}
                    </Text>
                    {/* {description} */}
                    your order is {data?.status} {data?.status == "Pending" ? "we notified the provider" : data?.status == "Accepted" ? "and placed successfully" : data?.status == "Cancelled" ? "we are sorry about that" : null}
                </Text>
                <Text style={styles.date}>
                    {data?.bookingDate}
                </Text>
            </View>
        </View>
    )
}
//
export default NatificationCards;
//
const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: '3%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 7,
        shadowColor: COLORS.black800,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 3,
        backgroundColor: COLORS.bg_primary,
    },
    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B9C2F0',
    },
    contentCon: {
        flex: 1,
        // flexWrap: 'wrap',
        // flexDirection: 'row',
        alignItems: 'flex-start',
    },
    content: {
        ...SIZES2.text_sm
    },
    title: {
        ...SIZES2.text_md,
        marginRight: 5,
    },
    date: {
        marginTop: 7,
        fontSize: 13,
        fontWeight: '300',
        ...SIZES2.text_sm
    }
})
//