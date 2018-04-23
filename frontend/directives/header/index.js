
const Header = angular.module('automator.header', [require('./header.html')])

    .controller('HeaderController', ['$scope', '$state', '$stateParams', ($scope, $state, $stateParams) => {

        $scope.getTitle = () => {
            switch($state.current.name) {
                case 'ifThis':
                case 'condition':
                    return 'If this...'
                case 'thenThat':
                case 'action':
                    return 'Then that...'
                case 'automations':
                    return 'My automations'
                default:
                    return 'automator'
            }
        }

        $scope.hasBack = () => $state.current.name !== 'home'

        $scope.goBack = () => {
            switch($state.current.name) {
                case 'ifThis':
                    $state.go('home')
                    return
                case 'condition':
                    $state.go('ifThis')
                    return
                case 'thenThat':
                    $state.go('home')
                    return
                case 'action':
                    $state.go('thenThat')
                    return
                case 'automations':
                    $state.go('home')
                    break
            }
        }

        $scope.isExpanded = () => $state.current.name === 'condition' || $state.current.name === 'action'
        $scope.getExpandedTitle = () => {
            return $stateParams.title
        }

        $scope.batterySVG = () => $stateParams.title === 'Battery'
        $scope.carLocationSVG = () => $stateParams.title === 'Car Location'
        $scope.gMailImage = () => $stateParams.title === 'Google Mail'

    }])
    .directive('header', [() => {

        return {
            restrict: 'E',
            templateUrl: 'header.html',
            controller: 'HeaderController',
            scope: {}
        }
    
    }])

export {Header}
