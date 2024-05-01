import api from "@/utils/api/useApi"

const baseUrl = "/companies"

export default {
    createCompany(data: any) {
        return api.post(`${baseUrl}`, data)
    },
    updateCompany(id: any, data: any) {
        return api.put(`${baseUrl}/${id}`, data)
    },
    deleteCompany(id: any) {
        return api.delete(`${baseUrl}/${id}`)
    },
    getCompanyList() {
        return api.get(`${baseUrl}/list/simplified`)
    }
}
