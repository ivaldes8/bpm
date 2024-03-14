import api from "@/utils/api/useApi"

const baseUrl = "/auth"

export default {
    loginUser(data: any) {
        return api.post('/login', {
            ...data,
        })
    },

    getUserProfile() {
        return api.get('/me')
    },
}
