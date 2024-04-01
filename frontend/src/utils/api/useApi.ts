import { create } from 'apisauce'
import * as _ from 'lodash'
import storage from '@/utils/storage'
import { store } from '@/stores/store'
import { logout } from '@/stores/authSlice'
import { apiTimeout, apiUrl } from '@/config/config'

const api = create({
    baseURL: apiUrl,
    timeout: apiTimeout
})

api.addRequestTransform(request => {
    const accessToken = _.get(storage.get(), 'user.token')
    if (accessToken && request && request.headers) request.headers.Authorization = accessToken
})

api.addResponseTransform((response: any) => {
    const { data, ok } = response
    if (!ok) {
        let errors = ''

        if (response && response.status === 401) {
            store.dispatch(logout())

            return
        }

        if (data) {
            if (data.errors || (data.form && data.form.errors)) {
                const formErrors = data.errors || data.form.errors
                if (_.isObject(formErrors) && !_.isArray(formErrors)) {
                    const errors: string[] = []
                    _.map(formErrors, (error) => {
                        if (_.isString(error)) errors.push(error)
                    })
                } else if (_.isArray(formErrors)) {
                    errors = formErrors.join('<br/>')
                } else {
                    errors = formErrors
                }
            } else if (data.message) errors = data.message
            else errors = data
        }

        if (!errors || _.isEmpty(errors)) errors = 'apiError'
        if (response.config.method === 'get' && !_.isString(errors)) response.errors = 'apiError'
        else response.errors = errors
    }
})

export default api
