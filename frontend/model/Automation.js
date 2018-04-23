
const Automation = ['$http', $http => {

    return {

        query: async () => {

            const automations = (await $http.get('/api/automations')).data
            return automations

        },

        create: async automation => {

            if(!automation.op) {
                automation.op = 'and'
            }
            await $http.post('/api/automations', automation)

        },

        reset: async () => {
            await $http.put('/api/reset')
        },

    }

}]

export {Automation}
