import api from "@/utils/api/useApi"

const baseUrl = "/family-documents"

export default {
    getFamilyDocument() {
        return api.get(`${baseUrl}`)
    },
    createFamilyDocument(data: any) {
        return api.post(`${baseUrl}`, data)
    },
    updateFamilyDocument(id: string | number, data: any) {
        return api.put(`${baseUrl}/${id}`, data)
    },
    deleteFamilyDocument(id: string | number) {
        return api.delete(`${baseUrl}/${id}`)
    },
    getFamilyDocumentById(id: string) {
        return api.get(`${baseUrl}/${id}`)
    }
}
