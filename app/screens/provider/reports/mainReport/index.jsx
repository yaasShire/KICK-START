import { View, Text, StyleSheet, ScrollView, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import IosAndroidSafeArea from '../../../../components/iosAndroidSafeArea'
import ReportHeader from '../components/reportHeader/ReportHeader'
import { COLORS, LAY_OUT, SIZES2 } from '../../../../theme/globalStyle'
import DatePickerC from '../components/datePicker/DatePickerC'
import TableComponent from '../components/table'
import ReportTable from '../components/table'
import { bookings, customerDemographics, usageOverview, totals1, totals2, prepareReportData } from '../../../../utilities/data'
import TotalReportCard from '../components/totalsReportCard'
import { fetchMultipleAPIs } from '../../../../api/fetchMultipleAPIs'
import { authorizeProviderGet } from '../../../../api/authorizedProviderGet'
import * as WebBrowser from 'expo-web-browser';
import * as Print from 'expo-print';
import VenueListPicker from '../components/venueListPicker'
import { useSelector } from 'react-redux'
import NoReport from '../components/noReport'
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { FontAwesome5 } from '@expo/vector-icons'


const Reports = () => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date)
    const [venues, setVenues] = useState([]);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [reportData, setReportData] = useState([])
    const [showReport, setShowReport] = useState(false)
    const [highestIncomeRevenue, setHighestIncomeRevenue] = useState({})
    // 
    const venueList = useSelector(state => state?.venueSlice?.report?.venues)
    // 
    const startDateFormattedDate = startDate.getFullYear().toString() + "-" + (startDate.getMonth() + 1).toString().padStart(2, '0') + "-" + startDate.getDate().toString().padStart(2, '0')
    const endDateFormattedDate = endDate.getFullYear().toString() + "-" + (endDate.getMonth() + 1).toString().padStart(2, '0') + "-" + endDate.getDate().toString().padStart(2, '0')
    // 

    const fetchVenues = async () => {
        setLoading(true);
        try {
            const { result: fetchedVenues } = await authorizeProviderGet('venue/get', setError, setLoading);
            if (fetchedVenues) {
                setVenues(fetchedVenues);
            }
        } catch (error) {
            console.error("Error fetching venues:", error);
        } finally {
            setLoading(false);
        }
    };


    // 

    // const fetchReports = async () => {
    //     try {
    //         // Step 1: Fetch all venues
    //         const { result: venues } = await authorizeProviderGet('venue/get', setError, setLoading);

    //         if (venues && Array.isArray(venues)) {
    //             const allReportData = []; // Collect all report data for each venue

    //             // Step 2: Loop through each venue and make API calls
    //             for (const venue of venues) {
    //                 const venueId = venue.id; // Extract venueId from the venue object

    //                 // Step 3: Construct the endpoints dynamically based on the venueId
    //                 const endPoints = [
    //                     `venue/${venueId}/popular-time-slots?startDate=${startDateFormattedDate}&endDate=${endDateFormattedDate}`,
    //                     `venue/${venueId}/revenue?startDate=${startDateFormattedDate}&endDate=${endDateFormattedDate}`,
    //                     `venue/${venueId}/occupancy-rate?startDate=${startDateFormattedDate}&endDate=${endDateFormattedDate}`,
    //                     `venue/${venueId}/bookings/total?startDate=${startDateFormattedDate}&endDate=${endDateFormattedDate}`,
    //                     `customers/profiles?venueId=${venueId}`,
    //                     `customers/returning-customers-percentage?venueId=${venueId}`
    //                 ];

    //                 // Step 4: Fetch data for this venue from all the constructed endpoints
    //                 const { results } = await fetchMultipleAPIs(endPoints, setError, setLoading);
    //                 // Ensure results is defined
    //                 if (results) {
    //                     const reportData = prepareReportData(results, venue); // Pass the current venue
    //                     allReportData.push(reportData); // Collect report data for this venue

    //                     // Optional: Log formatted data for this venue
    //                 } else {
    //                     console.error(`No results for venue ID: ${venueId}`);
    //                 }
    //             }

    //             // If needed, combine all report data for overall reporting
    //             // e.g., setCombinedReportData(allReportData);
    //             setReportData(allReportData); // Set the report data for all venues
    //         } else {
    //             console.error("No venues found");
    //         }
    //     } catch (error) {
    //         console.error("Error in fetching reports:", error);
    //     }
    // };
    const generateHTMLReport = (allReportData) => {
        let reportHtml = `<html><head><style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            table, th, td { border: 1px solid black; padding: 10px; text-align: left; }
            h1, h2 { color: #333; }
            .container {
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .titleWrapper {
                text-align: center;
                margin-bottom: 10px;
            }
            .segmentsWrapper {
                display: flex;
                justify-content: space-between;
            }
            .segment {
                flex: 1;
                padding: 10px;
                text-align: center;
            }
            .verticalBar {
                width: 1px;
                background-color: #cccccc;
                margin: 0 10px;
            }
            .value {
                font-size: 20px;
                font-weight: bold;
            }
            .title {
                font-size: 14px;
                color: #000;
            }
        </style></head><body>`;

        allReportData.forEach((reportData, index) => {
            const { bookings, usageOverview, customerDemographics } = reportData;

            const venueName = reportData?.tableData[0][0];
            console.log('====================================');
            console.log(customerDemographics);
            console.log('====================================');

            // Add Venue Report for Highest Revenue
            const totalRevenue = usageOverview?.totalRevenue || 'N/A';
            const venueAddress = 'Venue Address Here'; // You can replace this with the actual address data if available.

            reportHtml += `
                <h1>Venue Report for ${venueName}</h1>
                <h2>Booking Summary</h2>
                <table>
                    <tr><th>Total Bookings</th><td>${bookings?.total || 'N/A'}</td></tr>
                </table>
                <h2>Usage Overview</h2>
                <table>
                    <tr><th>Occupancy Rate</th><td>${usageOverview?.occupancyRate || 'N/A'}%</td></tr>
                    <tr><th>Total Revenue</th><td>$${totalRevenue}</td></tr>
                    <tr><th>Popular Time Slots</th><td>${usageOverview?.popularSlots.length > 0 ? usageOverview.popularSlots.join(', ') : 'No popular slots'}</td></tr>
                </table>
                <h2>Customer Demographics</h2>
                <table>
                    <tr><th>Customer Profiles</th><td>${customerDemographics?.customerProfiles || 'N/A'}</td></tr>
                    <tr><th>Returning Customers</th><td>${customerDemographics?.returningCustomers || 'N/A'}</td></tr>
                    <tr><th>New Customers</th><td>${customerDemographics?.newCustomerBookings}</td></tr>
                </table>
                <h2>Venue of Highest Revenue</h2>
                <div class="container">
                    <div class="titleWrapper">
                        <h2>Venue Of Highest Revenue</h2>
                    </div>
                    <hr />
                    <div class="segmentsWrapper">
                        <div class="segment">
                            <div class="value">${highestIncomeRevenue?.venue?.name || "No Venue"}</div>
                            <div class="title">Name</div>
                        </div>
                        <div class="verticalBar"></div>
                        <div class="segment">
                            <div class="value">${highestIncomeRevenue?.venue?.address || "No Address"}</div>
                            <div class="title">Address</div>
                        </div>
                        <div class="verticalBar"></div>
                        <div class="segment">
                            <div class="value">$${highestIncomeRevenue?.totalRevenue}</div>
                            <div class="title">Revenue</div>
                        </div>
                    </div>
                </div>
                <hr/>`;
        });

        reportHtml += `</body></html>`;
        return reportHtml;
    };


    // Function to print the report
    const printReport = async (allReportData) => {

        try {
            const html = generateHTMLReport(allReportData);
            await Print.printAsync({ html });
        } catch (error) {
            console.log('Error while printing:', error);
        }
    };
    // 
    const fetchReportsForSelectedVenues = async () => {
        if (venueList.length === 0) {
            alert("Please select at least one venue.");
            return;
        }

        setLoading(true);
        const allReportData = [];

        try {
            for (const venue of venueList) {
                const endPoints = [
                    `venue/${venue?.id}/popular-time-slots?startDate=${startDateFormattedDate}&endDate=${endDateFormattedDate}`,
                    `venue/${venue?.id}/revenue?startDate=${startDateFormattedDate}&endDate=${endDateFormattedDate}`,
                    `venue/${venue?.id}/occupancy-rate?startDate=${startDateFormattedDate}&endDate=${endDateFormattedDate}`,
                    `venue/${venue?.id}/bookings/total?startDate=${startDateFormattedDate}&endDate=${endDateFormattedDate}`,
                    `customers/profiles?venueId=${venue?.id}`,
                    `customers/returning-customers-percentage?venueId=${venue?.id}`
                ];

                const { results } = await fetchMultipleAPIs(endPoints, setError, setLoading);

                if (results) {
                    const reportData = prepareReportData(results, venue);
                    setShowReport(true)
                    allReportData.push(reportData);
                }
            }
            setReportData(allReportData);
        } catch (error) {
            console.error("Error fetching reports:", error);
        } finally {
            setLoading(false);
        }
    };

    // 

    const fetchHighestRevenueIncomeVenue = async () => {
        try {
            const { result } = await authorizeProviderGet(
                `venue/highest-revenue?startDate=${startDateFormattedDate}&endDate=${endDateFormattedDate}`
                , setError, setLoading);
            if (result?.status == "BAD_REQUEST") {
                return
            }
            setHighestIncomeRevenue(result)
        } catch (error) {
            console.log(error)
        }
    }

    // 
    const saveReportAsFile = async (htmlContent) => {
        try {
            // Define the file path where you want to save the HTML file
            const fileName = `${FileSystem.documentDirectory}venueReport.html`;

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


    //
    const saveFile = async () => {
        const htmlContent = generateHTMLReport(reportData);
        saveReportAsFile(htmlContent);

    }

    // 





    // 
    useEffect(() => {
        fetchVenues()
        // fetchReports()
    }, [startDate, endDate])
    // 
    return (
        <View style={styles.container}>
            <IosAndroidSafeArea />
            <ScrollView>
                <View style={styles.reportHeaderWrapper}>
                    <ReportHeader onPress={saveFile} venueList={venueList} showReport={showReport} />
                </View>
                <View style={styles.datePickersHolder}>
                    <View style={styles.datePickersWrapper}>
                        <DatePickerC
                            title='Start Date'
                            selectedDate={startDate}
                            setSelectedDate={setStartDate}
                        />
                        <View style={styles.verticalBar} />
                        <DatePickerC
                            title='End Date'
                            selectedDate={endDate}
                            setSelectedDate={setEndDate}
                        />
                    </View>
                </View>
                <View style={styles.listBtnWrapper}>
                    <VenueListPicker
                        label="Select Venue(s)"
                        venues={venues}
                        onPress={fetchReportsForSelectedVenues}
                        setShowReport={setShowReport}
                    />
                    <Button title='Search' disabled={venueList?.length == 0} onPress={() => {
                        fetchReportsForSelectedVenues()
                        fetchHighestRevenueIncomeVenue()
                    }} />
                </View>
                {
                    (venueList?.length != 0 && showReport) && (
                        "venue" in highestIncomeRevenue ?
                            <View style={styles.totalsWrapper}>
                                {/* <TotalReportCard data={totals1} /> */}
                                <TotalReportCard data={totals2} venueData={highestIncomeRevenue} />
                            </View>
                            : <View style={{ justifyContent: "center", alignItems: "center", rowGap: 5, marginTop: 10, paddingHorizontal: LAY_OUT.paddingX }}>
                                <FontAwesome5 name="money-bill-wave" size={25} />
                                <Text style={[SIZES2.text_md, { textAlign: "center", fontFamily: "popins400", lineHeight: 18 }]}>There is no highest income venue, maybe change the date to see the highest revenue income of a venue</Text>
                            </View>
                    )
                }
                {
                    (venueList?.length != 0 && showReport) ?
                        reportData?.map(report => (
                            <ReportTable
                                data={report?.tableData}
                                customerDemographics={customerDemographics}
                                usageOverview={usageOverview}
                            />
                        ))
                        :
                        <View style={{ height: "100%", flex: 1 }}>
                            <NoReport />
                        </View>
                }
                {
                    (venueList?.length != 0 && showReport) &&
                    <View style={styles.btnsWrapper}>
                        <Button
                            title="Print"
                            onPress={() => printReport(reportData)}
                        />
                        <Button
                            title="Save"
                            onPress={() => {
                                saveFile()
                            }}
                            mode='contained' style={[styles.btn, { backgroundColor: COLORS.linkColor }]} />
                    </View>
                }
            </ScrollView>
        </View>
    )
}

export default Reports

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    reportHeaderWrapper: {
        padding: LAY_OUT.padding
    },
    datePickersHolder: {
        padding: LAY_OUT.padding,
    },
    datePickersWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: LAY_OUT.paddingX,
        backgroundColor: "rgba(0, 0, 0, .05)",
        borderRadius: 50
    },
    verticalBar: {
        width: 1,
        height: 50,
        backgroundColor: COLORS.gray_color,
        marginHorizontal: 15
    },
    totalsWrapper: {
        padding: LAY_OUT.paddingX,
        rowGap: 10
    },
    btnsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: LAY_OUT.padding
    },
    btn: {
        borderRadius: 0,
        padding: 4,
        borderRadius: 5,
        width: 100
    },
    listBtnWrapper: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: LAY_OUT.padding
    }

})