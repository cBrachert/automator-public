
import { ThenThatController } from './then-that.controller'

const ThenThatModule = angular.module('automator.thenThat', ['ui.router', require('./then-that.html')])
    .controller('ThenThatController', ThenThatController)

const ThenThatState = $stateProvider => {
    $stateProvider.state('thenThat', {
        url: '/then-that',
        templateUrl: 'then-that.html',
        controller: 'ThenThatController'
    })
}

export { ThenThatState }
export { ThenThatModule }
