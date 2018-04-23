
const IfThisController = ['$scope', '$state', ($scope, $state) => {

    $scope.popular = [
        {
			name: 'Battery',
			icon: 'charge-level-large.svg',
		},
		{
			name: 'Car Location',
			icon: 'poi-car-large.svg',
		},
    ]

    $scope.items = [
		{
			name: 'Air Conditioning',
			icon: 'climate-large.svg',
		},
		{
			name: 'Doors',
			icon: 'lock-large.svg',
		},
		{
			name: 'Dynamics',
			icon: 'top-speed-large.svg',
		},
		{
			name: 'Engine',
			icon: 'engine-large.svg',
		},
		{
			name: 'Home Charger',
			icon: 'charging-station-large.svg',
		},
		{
			name: 'Lights',
			icon: 'lights-dim-large.svg',
		},
		{
			name: 'Navigation',
			icon: 'tour-large.svg',
		},
		{
			name: 'Racing',
			icon: 'velocity-large.svg',
		},
		{
			name: 'Service',
			icon: 'inspection-large.svg',
		},
		{
			name: 'Suspension',
			icon: 'quattro-large.svg',
		},
		{
			name: 'Tank',
			icon: 'fuel-station-large.svg',
		},
		{
			name: 'Time',
			icon: 'time-large.svg',
		},
    ]
    
    $scope.open = item => {
        $state.go('condition', {
            title: item.name
        })
    }

}]
export { IfThisController }
