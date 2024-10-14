import axios from 'axios';
import { useState, useEffect } from 'react';
import { AXIOS_BASE_URL_1 } from './base1';
import * as Location from 'expo-location';

const usePostDataWithOutToken = (endPoint = "", body = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null); // State to store location
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await AXIOS_BASE_URL_1.post(endPoint, JSON.stringify({
                latitude: location?.latitude,
                longitude: location?.longitude
            }));
            setData(response.data);
            setError(null);
        } catch (error) {
            setError(error);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [location]); // Fetch data when the component mounts

    const refetchData = () => {
        fetchData();
    };
    // Function to request location permissions and update location state

    const getLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});
                setLocation(location.coords);
                // console.log('====================================');
                // console.log("location obj--->", location?.coords);
                // console.log('====================================');
            } else {
                // Handle location permission denied case
            }
        } catch (error) {
            console.error('Error getting location:', error);
            // Handle error case
        }
    };

    // Call getLocation to trigger location request when needed
    useEffect(() => {
        getLocation();
    }, []);


    return { data, loading, error, refetchData };
};





export default usePostDataWithOutToken;
