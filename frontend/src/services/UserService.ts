import api from "@/utils/api/useApi"

const baseUrl = "/users"

export default {
    createUser(data: any) {
        return api.post(`${baseUrl}`, data)
    },
    updateUser(id: any, data: any) {
        return api.put(`${baseUrl}/${id}`, data)
    },
    deleteUser(id: any) {
        return api.delete(`${baseUrl}/${id}`)
    },
}
