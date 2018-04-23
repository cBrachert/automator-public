
const AutomationsController = ['$scope', '$state', 'Automation', ($scope, $state, Automation) => {

    const setup = async () => {
        $scope.automations = await Automation.query()
    }

    $scope.reset = async () => {
        await Automation.reset()
        await setup()
    }

    setup()

}]
export { AutomationsController }
