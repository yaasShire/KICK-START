import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

const ReportTable = ({ data = [], usageOverview, customerDemographics }) => {
    const tableHead = ['Venue', 'Report Type', 'Details'];

    // Data structure for venue usage overview
    const tableData = [
        ['Spondias', 'Total data', data.total],
        ['One Play', 'Occupancy Rate', `${usageOverview.occupancyRate}%`],
        ['Bagaac', 'Total Revenue', `$${usageOverview.totalRevenue}`],
        ['Macquul', 'Most Popular Time Slots', usageOverview.popularSlots.join(', ')],
        ['One Play', 'Customer Profiles', customerDemographics.customerProfiles],
        ['Som Sports', 'Returning Customers', `${customerDemographics.returningCustomers}%`],
        ['One Play', 'Feedback Scores', customerDemographics.feedbackScores],
    ];
    const formattedRow = (row) => (
        [
            [[row[0]], row[1], row[2]],
        ]
    )

    return (
        <ScrollView style={styles.container}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
                {
                    data.map(row => (
                        <Rows data={formattedRow(row)} textStyle={styles.text} />
                        // <Text>Hello</Text>
                    ))
                }
            </Table>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff', fontWeight: "bold" },
    text: { margin: 6, },
    headText: { margin: 6, fontWeight: "bold" },
});

export default ReportTable;
