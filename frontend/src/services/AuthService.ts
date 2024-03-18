import api from "@/utils/api/useApi"

const baseUrl = "/auth"

export default {
    loginUser(data: any) {
        return api.post(`${baseUrl}/login`, {
            ...data,
        })
    },

    getUserProfile() {
        return api.get(`${baseUrl}/me`)
    },
}
