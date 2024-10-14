import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

const PrivacyAndPolicy = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Privacy Policy</Text>

                <Text style={styles.sectionHeader}>1. Information We Collect</Text>
                <Text style={styles.text}>
                    We collect personal information that you provide when registering for an account, booking venues, or interacting with the app, including name, email address, phone number, and payment information. We may also collect non-personal data such as device info, IP address, and app usage history.
                </Text>

                <Text style={styles.sectionHeader}>2. How We Use Your Information</Text>
                <Text style={styles.text}>
                    Your information is used to create and manage accounts, provide services, support, and enhance user experience, ensure security, and personalize content. We may also use it for fraud detection and compliance with legal obligations.
                </Text>

                <Text style={styles.sectionHeader}>3. Sharing of Information</Text>
                <Text style={styles.text}>
                    Your information may be shared with third-party service providers for payment processing, legal requirements, or during business transactions like mergers or acquisitions.
                </Text>

                <Text style={styles.sectionHeader}>4. Data Security</Text>
                <Text style={styles.text}>
                    We implement security measures to protect your data, though no internet transmission is fully secure. Please be aware of the potential risks.
                </Text>

                <Text style={styles.sectionHeader}>5. Your Rights</Text>
                <Text style={styles.text}>
                    You can access, update, or delete your personal data via account settings. You can also opt-out of marketing emails or restrict data processing under applicable laws.
                </Text>

                <Text style={styles.sectionHeader}>6. Cookies and Tracking</Text>
                <Text style={styles.text}>
                    We use cookies and similar technologies to enhance user experience and collect analytics. You can control cookies via browser settings, though disabling them may affect app functionality.
                </Text>

                <Text style={styles.sectionHeader}>7. Children’s Privacy</Text>
                <Text style={styles.text}>
                    Our services are not directed to children under 16. If you believe we have collected data from children, please contact us for its removal.
                </Text>

                <Text style={styles.sectionHeader}>8. Changes to this Privacy Policy</Text>
                <Text style={styles.text}>
                    We may update this policy periodically. Please check this page for updates.
                </Text>

                <Text style={styles.sectionHeader}>9. Contact Us</Text>
                <Text style={styles.text}>
                    If you have any questions or concerns about this Privacy Policy, please contact us at support@sporton.com or call [612518368].
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 22,
    },
});

export default PrivacyAndPolicy;
