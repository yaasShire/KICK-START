const bookings = {
    total: 50, // Total number of bookings
};

const usageOverview = {
    occupancyRate: 85, // Percentage of occupied time slots
    totalRevenue: 12000, // Total revenue from bookings
    popularSlots: ['5:00 PM - 6:00 PM', '7:00 PM - 8:00 PM'], // Most popular time slots
};

const customerDemographics = {
    customerProfiles: 'Age: 25-35, Location: NYC',
    returningCustomers: 60, // Percentage of returning customers
    // feedbackScores: 'Average rating: 4.5/5', // Feedback and satisfaction scores
};

const totals1 = [
    {
        id: 1,
        title: "Revenue",
        value: 100
    },
    {
        id: 2,
        title: "Booking",
        value: 100
    },
    {
        id: 3,
        title: "Revenue",
        value: 120
    },
]
const totals2 = [
    {
        id: 1,
        title: "Booking",
        value: 100
    },
    {
        id: 2,
        title: "Return Customer Booking",
        value: 100
    },
    {
        id: 3,
        title: "Total Booking",
        value: 20
    },
]

const prepareReportData = (apiResults, venue) => {
    const bookings = {
        total: apiResults[3]?.data || 0, // Total bookings
    };

    const usageOverview = {
        occupancyRate: apiResults[2]?.data || 0, // Occupancy rate
        totalRevenue: apiResults[1]?.data || 0, // Total revenue
        popularSlots: (apiResults[0]?.data || []).map(slot => `${slot.startTime} - ${slot.endTime}`) || [], // Most popular time slots
    };


    // const customerDemographics = {
    //     customerProfiles: apiResults[4]?.data || "No Data", // Customer profiles
    //     returningCustomers: apiResults[5]?.returningCustomerPercentage || 0, // Percentage of returning customers
    //     // feedbackScores: "N/A", // Placeholder for feedback scores if applicable
    // };

    const customerProfilesData = apiResults[4] || [];
    const customerProfiles = customerProfilesData?.map(profile =>
        `${profile.fullName} (Email: ${profile.email}) (Age: ${profile.age})`
    ).join(', '); // Format customer profiles

    const customerDemographics = {
        customerProfiles: customerProfiles || "No Data", // Formatted customer profiles
        returningCustomers: apiResults[5]?.returningCustomerBookings || 0, // Percentage of returning customers
        newCustomerBookings: apiResults[5]?.newCustomerBookings || 0, // Percentage of returning customers
        // feedbackScores: "N/A", // Placeholder for feedback scores if applicable
    };
    console.log('====================================');
    console.log(apiResults[5]);
    console.log('====================================');



    const tableData = [
        [venue.name, 'Total Bookings', bookings.total],
        [venue.name, 'Occupancy Rate', `${usageOverview.occupancyRate}%`],
        [venue.name, 'Total Revenue', `$${usageOverview.totalRevenue}`],
        [venue.name, 'Most Popular Time Slots', usageOverview.popularSlots.join(', ') || "None"],
        [venue.name, 'Customer Profiles', customerDemographics.customerProfiles],
        [venue.name, 'New Customers', `${customerDemographics.newCustomerBookings}` || 0],
        [venue.name, 'Returning Customers', `${customerDemographics.returningCustomers}`],
        // [venue.name, 'Feedback Scores', customerDemographics.feedbackScores],
    ];

    return {
        bookings,
        usageOverview,
        customerDemographics,
        tableData,
    };
};


export function formatReadableDate(dateString) {
    // Convert the input string to a Date object
    const date = new Date(dateString);

    // Use toLocaleDateString to get a human-readable date format
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long', // Full day name (e.g., "Wednesday")
        year: 'numeric', // Full year (e.g., "2024")
        month: 'long',   // Full month name (e.g., "October")
        day: 'numeric'   // Day of the month (e.g., "9")
    });

    return formattedDate;
}



export { bookings, usageOverview, customerDemographics, totals1, totals2, prepareReportData }