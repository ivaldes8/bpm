import api from "@/utils/api/useApi"

const baseUrl = "/mediators"

export default {
    createMediator(data: any) {
        return api.post(`${baseUrl}`, data)
    },
    updateMediator(id: any, data: any) {
        return api.put(`${baseUrl}/${id}`, data)
    },
    deleteMediator(id: any) {
        return api.delete(`${baseUrl}/${id}`)
    },
    getMediatorById(id: string) {
        return api.get(`${baseUrl}/${id}`)
    }
}