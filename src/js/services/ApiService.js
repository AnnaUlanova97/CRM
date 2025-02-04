import axios from 'axios'

export default class ApiService {
    static async get(endpoint, params, headers) {
        try {
            const response = await axios.get(endpoint, params, headers)
            return response.data
        } catch (error) {
            console.error(`GET request failed: ${error}`)
            throw error
        }
    }

    static async post(endpoint, data, headers) {
        try {
            const response = await axios.post(endpoint, data, headers)
            return response.data
        } catch (error) {
            console.error(`POST request failed: ${error}`)
            throw error
        }
    }

    static async put(endpoint, data, headers) {
        try {
            const response = await axios.put(endpoint, data, headers)
            return response.data
        } catch (error) {
            console.error(`PUT request failed: ${error}`)
            throw error
        }
    }

    static async delete(endpoint, params, headers) {
        try {
            const response = await axios.delete(endpoint, params, headers)
            return response.data
        } catch (error) {
            console.error(`DELETE request failed: ${error}`)
            throw error
        }
    }
}
