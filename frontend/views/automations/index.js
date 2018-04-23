
import { AutomationsController } from './automations.controller'

const AutomationsModule = angular.module('automator.automations', ['ui.router', require('./automations.html')])
    .controller('AutomationsController', AutomationsController)

const AutomationsState = $stateProvider => {
    $stateProvider.state('automations', {
        url: '/automations',
        templateUrl: 'automations.html',
        controller: 'AutomationsController'
    })
}

export { AutomationsState }
export { AutomationsModule }
