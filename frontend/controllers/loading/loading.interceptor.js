
const LoadingInterceptor = ['loading', '$q', (loading, $q) => {

    return {

        request: config => {
            loading.load()
            return config
        },

        requestError: rejection => {
            loading.finish()
            return $q.reject(rejection)
        },

        response: response => {
            loading.finish()
            return response
        },

        responseError: rejection => {
            loading.finish()
            return $q.reject(rejection)
        }

    }

}]

export {LoadingInterceptor}
