import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import aiImg from '../../../../../../assets/images/ai.jpg'
import soccerImg1 from '../../../../../../assets/balls/img1.png'
import soccerImg2 from '../../../../../../assets/balls/img2.png'
import soccerImg3 from '../../../../../../assets/balls/img3.png'
import soccerImg4 from '../../../../../../assets/balls/img4.png'
import { COLORS, SIZES2, screenWidth } from '../../../../../theme/globalStyle';


//
const VenueRegistrationOnBoarding = ({ setShowSteps = () => { } }) => {
    const DoneBtn = ({ ...props }) => (
        <TouchableOpacity {...props} style={styles.doneBtn}>
            <Text style={[SIZES2.text_md]}>Start</Text>
        </TouchableOpacity>
    )
    return (
        <Onboarding
            DoneButtonComponent={DoneBtn}
            bottomBarHighlight={false}
            containerStyles={{ paddingHorizontal: 15, justifyContent: "flex-start", alignItems: "center" }}
            onDone={() => setShowSteps(true)}
            onSkip={() => setShowSteps(true)}
            pages={[
                {
                    backgroundColor: "#fff",
                    image: (
                        <View style={styles.imgWrapper}>
                            <Image source={soccerImg1} style={styles.img} />
                        </View>
                    ),
                    title: 'Create Venue',
                    subtitle: 'You can create venues in our platform and get customers faster than any other way.',
                },
                {
                    backgroundColor: '#b345e6',
                    image: (<View style={styles.imgWrapper}>
                        <Image source={soccerImg2} style={styles.img} />
                    </View>),
                    title: 'Courts In a Venue',
                    subtitle: 'Once you create a venue you can add courts into that venue so users can book specific court.',
                },
                {
                    backgroundColor: '#f59dec',
                    image: (<View style={styles.imgWrapper}>
                        <Image source={soccerImg3} style={styles.img} />
                    </View>),
                    title: 'Time Slot',
                    subtitle: 'So you created a Venue and Court then you need to add Time Slots four your courts so users can book courts at a specific Time Slot',
                },
                {
                    backgroundColor: '#f5f29d',
                    image: (<View style={styles.imgWrapper}>
                        <Image source={soccerImg4} style={styles.img} />
                    </View>),
                    title: 'Ready To Publish',
                    subtitle: 'Right now you can upload you venue to the public and wait for orders to come in.',
                },
            ]}
        />
    )
}

export default VenueRegistrationOnBoarding

const styles = StyleSheet.create({
    imgWrapper: {
        width: screenWidth * 0.9,
        height: screenWidth,
        // flex: 1
    },
    img: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    doneBtn: {
        padding: 15,
        backgroundColor: "#fff",
        borderTopLeftRadius: "100%",
        borderBottomLeftRadius: "100%"
    }
})