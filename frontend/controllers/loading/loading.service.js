
const LoadingService = [function() {

    let loading = 0
    let callbacks = []

    return {

        load: () => {
            loading++
            callbacks.forEach(cb => {
                cb(loading > 0)
            })
        },
        finish: () => {
            loading--
            callbacks.forEach(cb => {
                cb(loading > 0)
            })
        },
        listen: cb => {
            callbacks.push(cb)
        },
        loading: () => {
            return loading > 0
        }

    }

}]

export {LoadingService}
