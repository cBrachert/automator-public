
import { IfThisController } from './if-this.controller'

const IfThisModule = angular.module('automator.ifThis', ['ui.router', require('./if-this.html')])
    .controller('IfThisController', IfThisController)

const IfThisState = $stateProvider => {
    $stateProvider.state('ifThis', {
        url: '/if-this',
        templateUrl: 'if-this.html',
        controller: 'IfThisController'
    })
}

export { IfThisState }
export { IfThisModule }
