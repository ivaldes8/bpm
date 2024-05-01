import api from "@/utils/api/useApi"

const baseUrl = "/contracts"

export default {
    getContracts() {
        return api.get(`${baseUrl}`)
    },
    getContractById(id: string) {
        return api.get(`${baseUrl}/${id}`)
    },
    createContract(data: any) {
        return api.post(`${baseUrl}`, data)
    },
    updateContract(id: any, data: any) {
        return api.put(`${baseUrl}/${id}`, data)
    },
    deleteContract(id: any) {
        return api.delete(`${baseUrl}/${id}`)
    }
}
