import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../../../theme/globalStyle'
import uploadImg from '../../../../../../../assets/images/upload.png'
import VenueImageItem from '../../venueImgItem'
import { nearByFutsalsData } from '../../../../../../data'
import { Button } from 'react-native-paper'

const CourtImages = ({ setCurrentPosition = () => { }, courtRegistrationRef }) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text style={[SIZES2.text_md, { fontFamily: "poppins400", color: "rgba(0, 0, 0, .7)" }]}>Uplod Court Images by clicking upload Button</Text>
                </View>
                <TouchableOpacity style={styles.uploadImgsWrapper}>
                    <View style={styles.uploadImgs}>
                        <Image source={uploadImg} style={styles.uploadImg} />
                        <Text style={[SIZES2.text_sm, { fontFamily: "poppins400", color: "rgba(0, 0, 0, 1" }]}>Uplod Court Images</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.imgsWrapper}>
                    <VenueImageItem img={nearByFutsalsData[0].imageUrl} />
                    <VenueImageItem img={nearByFutsalsData[1].imageUrl} />
                    <VenueImageItem img={nearByFutsalsData[2].imageUrl} />
                    <VenueImageItem img={nearByFutsalsData[3].imageUrl} />
                    <VenueImageItem img={nearByFutsalsData[3].imageUrl} />
                    <VenueImageItem img={nearByFutsalsData[3].imageUrl} />
                </View>
                <View style={styles.btns}>
                    <Button mode='contained-tonal' style={{ padding: 3 }} onPress={() => setCurrentPosition(1)}>Prev</Button>
                    <Button mode='contained' style={{ padding: 3, backgroundColor: COLORS.primary_color }} onPress={() => courtRegistrationRef?.current?.close()}>Upload</Button>
                </View>
            </View>
        </ScrollView>
    )
}

export default CourtImages

const styles = StyleSheet.create({
    container: {
        flex: 1,
        rowGap: 25,
        paddingBottom: 15
    },
    uploadImgsWrapper: {
        justifyContent: "center",
        alignItems: "center",
    },
    titleWrapper: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: LAY_OUT.paddingX,
    },
    uploadImgs: {
        backgroundColor: "rgba(0, 0, 0, .06)",
        width: "90%",
        height: 140,
        padding: LAY_OUT.padding,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
        rowGap: 3
    },
    uploadImg: {
        width: 80,
        height: 70,
        resizeMode: "contain"
    },
    imgsWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: LAY_OUT.padding,
        rowGap: 2
    },
    btns: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: LAY_OUT.paddingX
    }
})