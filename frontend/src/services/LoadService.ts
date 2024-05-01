import api from "@/utils/api/useApi"

const baseUrl = "/load"

export default {
    uploadFile(formData: any) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        return api.post(`${baseUrl}`, formData, config)
    }
}
