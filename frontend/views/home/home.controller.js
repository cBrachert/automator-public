
const HomeController = ['$scope', '$state', 'Automation', ($scope, $state, Automation) => {

    $scope.automation = automation
    $scope.state = {
        adding: false
    }

    $scope.setOpAndAddCondition = op => {
        automation.op = op
        $state.go('ifThis')
    }

    $scope.activate = async () => {
        if(automation.conditions.length < 1 || automation.actions.length < 1) {
            return
        }
        try {
            const newAutomation = await Automation.create(automation)
            window.automation = {
                title: 'My AUTOmation',
                conditions: [],
                actions: [],
            }
            $state.go('automations')
        } catch(ex) {
            alert('Automation could not be created')
        }
        
    }

    $scope.openAutomations = () => {
        $state.go('automations')
    }

}]
export { HomeController }
