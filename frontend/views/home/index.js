
import { HomeController } from './home.controller'

const HomeModule = angular.module('automator.home', ['ui.router', require('./home.html')])
    .controller('HomeController', HomeController)

const HomeState = $stateProvider => {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'HomeController'
    })
}

export { HomeState }
export { HomeModule }
