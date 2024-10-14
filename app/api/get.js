import { baseURL } from "./baseURL"

export const get = async (endPoint = "", setError = () => { }, setIsLoading = () => { }, payload) => {

    try {
        const response = await fetch(baseURL + endPoint, {
            body: payload,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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