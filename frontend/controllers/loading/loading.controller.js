
const LoadingController = ['$scope', 'loading', '$timeout', function($scope, loading, $timeout) {

    $scope.hidden = true

    loading.listen(status => {
        $scope.hidden = !status
        $timeout(() => {
            $scope.$apply()
        })
    })

}]

export {LoadingController}
