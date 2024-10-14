import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, LAY_OUT, SIZES, SIZES2 } from '../../../../../theme/globalStyle'
import { Avatar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
const HomeHeader = ({ user = {} }) => {
    console.log(user?.profileImage);

    return (
        <View style={styles.container}>
            <View>
                <Text style={SIZES2.text_sm}>Welcome</Text>
                <Text style={[SIZES2.text_md, { fontFamily: "poppins600" }]}>{user?.fullName}</Text>
            </View>
            <View>
                {
                    user?.profileImage != null ?
                        <Avatar.Image size={40} source={{ uri: user?.profileImage }} />
                        :
                        <Avatar.Icon size={40} icon={() => <AntDesign name='user' color={"#fff"} size={15} />} />
                }
                {/* <Avatar.Image size={40} source={{ uri: user?.profileImage ? user?.profileImage : "https://dudewipes.com/cdn/shop/articles/gigachad.jpg?v=1667928905&width=1024" }} /> */}
            </View>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.bg_primary,
        padding: LAY_OUT.padding,
        borderRadius: 5,
        shadowColor: 'rgba(0, 0, 0, .3)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        borderColor: "#d4d5d6",
    }
})