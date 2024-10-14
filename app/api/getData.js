import axios from 'axios';
import { useState, useEffect } from 'react';
import { AXIOS_BASE_URL_1 } from './base1';

const useFechtDataWithOutToken = (endPoint = "") => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await AXIOS_BASE_URL_1.get(endPoint);
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
    }, []); // Fetch data when the component mounts

    const refetchData = () => {
        fetchData();
    };

    return { data, loading, error, refetchData };
};

export default useFechtDataWithOutToken;
