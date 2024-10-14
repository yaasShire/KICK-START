import { baseURL } from "./baseURL"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authorizedPost = async (endPoint = "", setError = () => { }, setIsLoading = () => { }, payload) => {

    try {
        const token = await AsyncStorage.getItem("accessToken")
        const response = await fetch(`${baseURL}${endPoint}`, {
            body: payload,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const result = await response.json()
        return { result }
    } catch (error) {
        setError(true)
    } finally {
        setIsLoading(false)
    }
}