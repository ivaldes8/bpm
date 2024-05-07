import api from "@/utils/api/useApi"

const baseUrl = "/contract-observations"

export default {
    createObservationContract(data: any) {
        return api.post(`${baseUrl}`, data)
    }
}
