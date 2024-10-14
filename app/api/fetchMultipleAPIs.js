import { baseURL } from "./baseURL";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to fetch multiple APIs concurrently
export const fetchMultipleAPIs = async (endPoints = [], setError = () => { }, setLoading = () => { }, payloads = []) => {
    try {
        const token = await AsyncStorage.getItem("providerAccessToken");

        // Create an array of fetch promises for all the provided endpoints
        const fetchPromises = endPoints.map((endPoint, index) =>
            fetch(`${baseURL}${endPoint}`, {
                method: 'GET',  // or 'POST' if needed, adjust as per your requirement
                headers: {
                    // 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // body: JSON.stringify(payloads[index]) // If you need to pass payload, ensure POST method is used
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch from ${endPoint}: ${response.statusText}`);
                }
                return response.json();
            }).catch(error => {
                // Handle individual API call failure
                console.error(`Error fetching ${endPoint}:`, error);
                return { error: error.message };
            })
        );

        // Wait for all the promises to resolve
        const results = await Promise.all(fetchPromises);

        // Ensure that results is always an array and return it
        return { results };
    } catch (error) {
        setError(true);
        console.error("Error in fetchMultipleAPIs:", error);
        return { results: [] }; // Return an empty array on error
    } finally {
        setLoading(false);
    }
};
