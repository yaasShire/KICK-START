import { View, Text, StyleSheet, Pressable, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo, Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Avatar, Divider } from 'react-native-paper'
import { COLORS, LAY_OUT, SIZES2 } from '../../theme/globalStyle'
import * as FileSystem from 'expo-file-system';
import generateHTMLContent from './HtmlContent'
import * as Sharing from 'expo-sharing';
import { formatReadableDate } from '../../utilities/data'


const BookedFutsalCards = ({ data = {} }) => {

    const downloadHTMLReport = async (data) => {
        const htmlContent = generateHTMLContent(data);
        const fileUri = FileSystem.documentDirectory + `${data?.venueName + "-" + data?.id}.html`;

        await FileSystem.writeAsStringAsync(fileUri, htmlContent, {
            encoding: FileSystem.EncodingType.UTF8
        });

        console.log('HTML file saved to:', fileUri);
    };
    const saveReportAsFile = async (htmlContent) => {
        try {
            // Define the file path where you want to save the HTML file
            const fileName = `${FileSystem.documentDirectory}invoice-${data?.venueName + "-" + data?.id}.html`;

            // html content

            // Write the HTML content to the file
            await FileSystem.writeAsStringAsync(fileName, htmlContent);

            // Check if sharing is available and share the file
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileName);
            } else {
                console.log("Sharing is not available on this device");
            }

            console.log('File saved successfully at:', fileName);
        } catch (error) {
            console.error('Error saving file:', error);
        }
    };
    const saveFile = async () => {
        const htmlContent = generateHTMLContent(data);
        saveReportAsFile(htmlContent);

    }

    // 

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name='football' size={18} />
                <View style={styles.venueCourtNamesWrapper}>
                    <Text style={[SIZES2.text_sm]}>{data?.venueName}</Text>
                    <View style={styles.dot} />
                    <Text style={[SIZES2.text_sm]}>{(formatReadableDate(data?.matchDate))}</Text>
                </View>
            </View>
            <View style={styles.cardContent}>
                <View style={styles.row1}>
                    <View style={styles.imagesInfoWrapper}>
                        <Avatar.Image size={50} source={{ uri: data?.image }} />
                        <View>
                            <Text style={[SIZES2.text_sm]}>{data?.venueName}</Text>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={[SIZES2.text_sm, { color: COLORS.gray_font_color }]}>Booked:</Text>
                                <Text style={[SIZES2.text_sm, { color: COLORS.gray_font_color }]}>{data?.bookingDate}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={[{ ...SIZES2.text_sm, color: COLORS.linkColor }]}>{data?.status}</Text>
                    </View>
                    <View>
                        <Text style={[SIZES2.text_md]}>${data?.totalPrice}</Text>
                    </View>
                </View>
                <Divider />
                <View style={styles.row2}>
                    <View style={styles.dateWrapper}>
                        <Text style={[SIZES2.text_sm, { color: "#000" }]}>{data?.matchDate}</Text>
                    </View>
                    <View style={styles.matchTimeWrapper}>
                        <Text style={[SIZES2.text_sm, { color: "#fff" }]}>{data?.startTime} - {data?.endTime}</Text>
                    </View>
                    <View style={styles.actionsWrapper}>
                        <TouchableOpacity
                            onPress={() => {
                                saveFile()
                            }}
                            style={[]}>
                            <MaterialCommunityIcons name='download-circle' size={23} color={"#556B2F"} />
                        </TouchableOpacity>
                        {
                            data?.status == "Pending" &&
                            <TouchableOpacity
                                onPress={() => {
                                    Linking.openURL(`tel:*712*612518368*${data?.totalPrice}#`)
                                }}
                                style={[]}>
                                <Entypo name='wallet' size={23} color={COLORS.linkColor} />
                            </TouchableOpacity>
                        }
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL(`tel:${data?.venuePhoneNumber}`)
                            }}
                            style={[]}>
                            <Feather name='phone-call' size={20} color={"#000"} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL(
                                    `http://api.whatsapp.com/send?phone=252${data?.venuePhoneNumber}`
                                )
                            }}
                            style={[]}>
                            <FontAwesome name='whatsapp' size={24} color={"#47c355"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default BookedFutsalCards

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.bg_secondary
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        columnGap: 4,
        padding: LAY_OUT.padding,
        backgroundColor: COLORS.bg_tertiary,
        borderBottomWidth: 1,
        borderColor: COLORS.bg_secondary
    },
    dot: {
        width: 5,
        height: 5,
        backgroundColor: COLORS.gray_font_color,
        borderRadius: 50
    },
    venueCourtNamesWrapper: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 5
    },
    row1: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: LAY_OUT.padding
    },
    row2: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: LAY_OUT.padding
    },
    imagesInfoWrapper: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 5
    },
    btnsWrapper: {
        flexDirection: "row",
        columnGap: 10
    },
    cardContent: {
        // padding: LAY_OUT.padding,
        // rowGap: 1
    },
    matchTimeWrapper: {
        backgroundColor: "#000",
        borderRadius: 10,
        padding: 2,
        paddingHorizontal: 9
    },
    dateWrapper: {
        backgroundColor: COLORS.bg_secondary,
        borderRadius: 10,
        padding: 2,
        paddingHorizontal: 9
    },
    actionsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        columnGap: 10
    },
    actionBtn: {
        backgroundColor: "blue",
        height: 30,
        width: 30,
        flexDirection: "row",
        justifyContent: "center",
        columnGap: 5,
        alignItems: "center",
        borderRadius: 50
    },
    callBtn: {
        backgroundColor: "#5fc993"
    },
    messageBtn: {
        backgroundColor: "#47c355"
    }
})