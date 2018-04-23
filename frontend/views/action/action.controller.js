
const ActionController = ['$scope', '$state', '$stateParams', '$timeout', ($scope, $state, $stateParams, $timeout) => {

    const mailActions = [
        {
            title: 'Send an email',
        },
        {
            title: 'Send yourself an email',
        },
        {
            title: 'Create draft',
        },
    ]

    $scope.actions = mailActions

    $scope.toggle = action => {
        action.active = !action.active
    }

    $scope.addAction = action => {
        automation.actions.push({
            op: 'mail',
            recipient: action.recipient,
            cc: action.cc,
            subject: action.subject,
            message: action.message,
            title: 'Send an email',
            description: `To ${action.recipient}`,
        })
        $state.go('home')
    }

}]
export { ActionController }
