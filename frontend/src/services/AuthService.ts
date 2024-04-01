import api from "@/utils/api/useApi"

const baseUrl = "/auth"

export default {
    loginUser(data: any) {
        return api.post(`${baseUrl}/login`, data)
    },
    getUserProfile() {
        return api.get(`${baseUrl}/me`)
    },
    updateProfile(data: any) {
        return api.put(`${baseUrl}/`, data)
    },
    changePassword(data: any) {
        return api.post(`${baseUrl}/change-password`, data)
    }
}
