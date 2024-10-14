import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { COLORS, SIZES2 } from '../../../../theme/globalStyle';
import { useNavigation } from '@react-navigation/native';
import { hideBottomTabs } from '../../../../utilities';
import IosAndroidSafeArea from '../../../../components/iosAndroidSafeArea';

const PrivacyAndPolicy = ({ navigation }) => {
    const [checked, setChecked] = useState(false);
    const { getParent } = useNavigation()
    const handleAccept = () => {
        if (checked) {
            navigation.goBack(); // Replace 'NextScreen' with the actual screen name
        } else {
            alert('Please accept the privacy policy to proceed.');
        }
    };

    useEffect(() => {
        return hideBottomTabs(getParent)
    }, [])

    return (
        <View style={styles.container}>
            <IosAndroidSafeArea />
            <ScrollView style={styles.scrollView}>
                <Text style={styles.header}>Privacy Policy</Text>
                <Text style={styles.text}>
                    {/* Replace the following text with your actual privacy policy */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </ScrollView>
            {/* <View style={styles.checkboxContainer}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(!checked)}
                />
                <Text style={styles.checkboxLabel}>I accept the privacy policy</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleAccept}>
                <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity> */}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        paddingBottom: 30
    },
    scrollView: {
        marginBottom: 20,
    },
    header: {
        ...SIZES2.text_base,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkboxLabel: {
        fontSize: 16,
    },
    button: {
        backgroundColor: COLORS.primary_color,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PrivacyAndPolicy;
