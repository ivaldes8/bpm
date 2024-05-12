import api from "@/utils/api/useApi"

const baseUrl = "/incidence-documents"

export default {
    createDocumentIncidence(data: any) {
        return api.post(`${baseUrl}`, data)
    },
    updateDocumentIncidence(id: string | number, data: any) {
        return api.put(`${baseUrl}/${id}`, data)
    }
}
