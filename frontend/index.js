
// String.startsWith function for IE11
if (!String.prototype.startsWith) {
    String.prototype.startsWith = (searchString, position) => {
        position = position || 0
        return this.indexOf(searchString, position) === position
    }
}

const angular = require('angular')
window.angular = angular
require('angular-aria/angular-aria.min.js')
require('angular-animate/angular-animate.min.js')
require('angular-ui-router')
require('angular-material/angular-material.min.js')

// views
const ActionModule = require('./views/action/index')
const AutomationsModule = require('./views/automations/index')
const HomeModule = require('./views/home/index')
const IfThisModule = require('./views/if-this/index')
const ThenThatModule = require('./views/then-that/index')
const ConditionModule = require('./views/condition/index')

// other
require('./controllers/loading')
const header = require('./directives/header/index')
const Automation = require('./model/Automation').Automation

window.automation = {
    title: 'My AUTOmation',
    conditions: [],
    actions: [],
}

// automation = JSON.parse('{"title":"My AUTOmation","conditions":[{"op":"less","condition":"battery","value":50,"title":"Battery","description":"Charging percentage is smaller than 50%"},{"condition":"location","title":"Car Location","description":"Is closer than 1000 meters to point on map","op":"less","value":1000,"lat":48.83656203001332,"long":9.157908200586007}],"actions":[{"op":"mail","recipient":"iwan@cdtm.de","subject":"Hallo","message":"Hallooo","title":"Send an email","description":"To iwan@cdtm.de"}],"op":"and"}')

angular.module('automator', [

    // third party
    'ui.router',
    'ngMaterial',

    // views
    'automator.action',
    'automator.automations',
    'automator.home',
    'automator.ifThis',
    'automator.thenThat',
    'automator.condition',

    // other
    'automator.loading',
    'automator.header',

])

    .factory('Automation', Automation)

    .config(['$urlRouterProvider', '$urlMatcherFactoryProvider', '$locationProvider', '$httpProvider',
        '$provide', '$stateProvider',
        ($urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, $httpProvider,
            $provide, $stateProvider) => {

            $urlMatcherFactoryProvider.caseInsensitive(true)
            $urlMatcherFactoryProvider.strictMode(false)
            $urlRouterProvider.otherwise('/')
            $locationProvider.html5Mode({
                enabled: false
            })

            ActionModule.ActionState($stateProvider)
            AutomationsModule.AutomationsState($stateProvider)
            HomeModule.HomeState($stateProvider)
            IfThisModule.IfThisState($stateProvider)
            ThenThatModule.ThenThatState($stateProvider)
            ConditionModule.ConditionState($stateProvider)

            $provide.decorator('$uiViewScroll', () => {
                return () => {
                    window.scrollTo(0, 0)
                }
            })

        }
    ])
