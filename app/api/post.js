import { baseURL } from "./baseURL"

export const post = async (endPoint = "", setError = () => { }, setIsLoading = () => { }, payload = {}) => {

    try {
        const response = await fetch(`${baseURL}${endPoint}`, {
            body: payload,
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await response.json()
        return { result }
    } catch (error) {
        setError(true)
    } finally {
        setIsLoading(false)
    }
}