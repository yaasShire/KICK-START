import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import onboarding1 from '../../../assets/onboarding/onboarding-1.png'
import onboarding2 from '../../../assets/onboarding/onboarding-2.png'
import onboarding3 from '../../../assets/onboarding/onboarding-3.png'
import onboarding4 from '../../../assets/onboarding/onboarding-4.png'

const OnboardingScreen = ({ navigation, onComplete }) => {
    return (
        <View style={styles.container}>
            <Onboarding
                onSkip={onComplete}  // Skip to Home
                onDone={onComplete}  // Finish and go to Home
                pages={[
                    {
                        backgroundColor: '#fdeb93',
                        image: <Image source={onboarding1} style={styles.image} />,
                        title: 'Welcome to SportOn!',
                        subtitle: 'Book venues easily with our app!',
                    },
                    {
                        backgroundColor: '#FF6F61',
                        image: <Image source={onboarding4} style={styles.image} />,
                        title: 'Easy Booking',
                        subtitle: 'Select time slots and book venues effortlessly.',
                    },
                    {
                        backgroundColor: '#e9bcbe',
                        image: <Image source={onboarding3} style={styles.image} />,
                        title: 'Booking',
                        subtitle: 'Track and manage your booking orders with ease.',
                    },
                    {
                        backgroundColor: '#e9bcbe',
                        image: <Image source={onboarding2} style={styles.image} />,
                        title: 'Book Neariest Venues',
                        subtitle: 'You can easily see venues that are near you book them as you want.',
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

export default OnboardingScreen;
