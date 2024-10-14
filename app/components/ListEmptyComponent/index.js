//
import React from 'react';
import Devider from '../Devider';
import CustomButton from '../CustomBtn';
import img from '../../../assets/images/noData.png';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../theme/globalStyle';
//
const ListEmptyComponent = ({ title = "Opps!", message = 'message' }) => {
    return (
        <View style={styles.container}>
            {/* Image Container */}
            <View style={styles.imageCon}>
                <Image
                    source={img}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                />
            </View>
            <Devider />
            <Text style={styles.titleTxt}>
                {title}
            </Text>
            <Devider height={10} />
            <Text style={styles.messageTxt}>
                {message}
            </Text>
            <Devider height={30} />
            {/* <CustomButton title="Find Futsal" style={styles.button} /> */}
        </View>
    )
}
//
export default ListEmptyComponent;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    imageCon: {
        height: 200,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    titleTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 0.3,
        color: COLORS.primary_color
    },
    messageTxt: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.5,
        color: COLORS.black800
    },
    button: {
        width: '80%',
    }
})
//