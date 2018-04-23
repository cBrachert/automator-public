
const ThenThatController = ['$scope', '$state', ($scope, $state) => {

	$scope.popular = [
		{
			name: 'Google Mail',
			icon: 'Gmail.png',
		},
		{
			name: 'Philipps Hue',
			icon: 'Philipps_hue.png',
		},
		{
			name: 'Wechat',
			icon: 'Wechat.png',
		},
		{
			name: 'Spotify',
			icon: 'Spotify.png',
		},
		{
			name: 'My Vehicle',
			icon: 'car.png',
		},
	]

    $scope.items = [
		{
			name: 'Giphy',
			icon: 'Giphy.png',
		},
		{
			name: 'Google Mail',
			icon: 'Gmail.png',
		},
		{
			name: 'Google Calendar',
			icon: 'Google_Calendar.png',
		},
		{
			name: 'Google Assistant',
			icon: 'Google_assistant.png',
		},
		{
			name: 'Google Drive',
			icon: 'Google_drive.png',
		},
		{
			name: 'Google Docs',
			icon: 'Google_Docs.png',
		},
		{
			name: 'Google Sheets',
			icon: 'Google_Sheets.png',
		},
		{
			name: 'Homey',
			icon: 'Homey.png',
		},
		{
			name: 'My Vehicle',
			icon: 'car.png',
		},
		{
			name: 'My Smartphone',
			icon: 'mobile-phone-large.svg',
		},
		{
			name: 'Nest',
			icon: 'Nest.png',
		},
		{
			name: 'Nexx',
			icon: 'Nexx_garage.png',
		},
		{
			name: 'Philipps Hue',
			icon: 'Philipps_hue.png',
		},
		{
			name: 'Samsung Smart Things',
			icon: 'Samsung_smart_things.png',
		},
		{
			name: 'Spotify',
			icon: 'Spotify.png',
		},
		{
			name: 'Soundcloud',
			icon: 'Soundcloud.png',
		},
		{
			name: 'Tado',
			icon: 'Tado.png',
		},
		{
			name: 'Wechat',
			icon: 'Wechat.png',
		},
		{
			name: 'Youtube',
			icon: 'Youtube.png',
		},
	]
    
    $scope.open = item => {
        $state.go('action', {
            title: item.name
        })
    }

}]
export { ThenThatController }
