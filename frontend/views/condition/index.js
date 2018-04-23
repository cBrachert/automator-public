
import { ConditionController } from './condition.controller'

const ConditionModule = angular.module('automator.condition', ['ui.router', require('./condition.html')])
    .controller('ConditionController', ConditionController)

const ConditionState = $stateProvider => {
    $stateProvider.state('condition', {
        url: '/condition/:title',
        templateUrl: 'condition.html',
        controller: 'ConditionController'
    })
}

export { ConditionState }
export { ConditionModule }
