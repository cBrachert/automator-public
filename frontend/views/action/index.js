
import { ActionController } from './action.controller'

const ActionModule = angular.module('automator.action', ['ui.router', require('./action.html')])
    .controller('ActionController', ActionController)

const ActionState = $stateProvider => {
    $stateProvider.state('action', {
        url: '/action/:title',
        templateUrl: 'action.html',
        controller: 'ActionController'
    })
}

export { ActionState }
export { ActionModule }
