import api from "@/utils/api/useApi"

const baseUrl = "/type-conciliations"

export default {
    getTypeConciliation() {
        return api.get(`${baseUrl}`)
    },
    createTypeConciliation(data: any) {
        return api.post(`${baseUrl}`, data)
    },
    updateTypeConciliation(id: string | number, data: any) {
        return api.put(`${baseUrl}/${id}`, data)
    },
    deleteTypeConciliation(id: string | number) {
        return api.delete(`${baseUrl}/${id}`)
    },
    getTypeConciliationById(id: string) {
        return api.get(`${baseUrl}/${id}`)
    }
}
