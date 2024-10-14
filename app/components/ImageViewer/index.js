//
import React from 'react';
import { COLORS, LAY_OUT, SIZES2 } from '../../theme/globalStyle';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//
const ImageViewer = ({ image = null, iconColor = COLORS.black900, style = {}, onSignIn = () => { }, isLoggedIn = false }) => {
    console.log(image);
    return (
        <View style={styles.imgReviewerWrapper}>
            <View style={[styles.imageContainer, style]}>
                {
                    image ?
                        <Image
                            resizeMode="cover"
                            source={{ uri: image }}
                            style={{ width: '100%', height: '100%' }}
                        />
                        :
                        <FontAwesome5 name="user-alt" size={30} color={iconColor} />
                }
            </View>
            {
                !isLoggedIn &&
                <TouchableOpacity style={styles.signInBtn} onPress={onSignIn}>
                    <Text style={[SIZES2.text_sm, { color: "#fff" }]}>Sig In</Text>
                </TouchableOpacity>
            }
        </View>
    )
}
//
export default ImageViewer;
//
const styles = StyleSheet.create({
    imgReviewerWrapper: {
        alignItems: "center",
        rowGap: 7
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 60,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg_tertiary
    },
    signInBtn: {
        backgroundColor: COLORS.primary_color,
        padding: 6,
        paddingHorizontal: 10,
        borderRadius: 50
    }
})
//