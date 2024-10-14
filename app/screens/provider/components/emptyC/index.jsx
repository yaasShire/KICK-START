import { View, Text, Image } from 'react-native'
import React from 'react'
import noVenueFoundImg from '../../../../../assets/images/Futsals/venue_not_found.png'
import { SIZES2 } from '../../../../theme/globalStyle'

const EmptyC = ({ title = "" }) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image source={noVenueFoundImg} style={{ width: 150, height: 150, resizeMode: "cover" }} />
            <Text style={[SIZES2.text_sm]}>{title}</Text>
        </View>
    )
}

export default EmptyC