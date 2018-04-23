
const ConditionController = ['$scope', '$state', '$stateParams', '$timeout', ($scope, $state, $stateParams, $timeout) => {

    const batteryTriggers = [
        {
            title: 'Charge',
            value: 50,
        },
        {
            title: 'Estimated Range',
            value: 50,
        },
        {
            title: 'Voltage',
            value: 50,
        },
        {
            title: 'Charging Time',
            value: 50,
        },
    ]

    const carLocationTriggers = [
        {
            title: 'Select on Map',
            value: 1000,
        },
        {
            title: 'Address',
            value: 1000,
        },
        {
            title: 'Coordinates',
            value: 1000,
        },
    ]

    switch($stateParams.title) {
        case 'Battery':
            $scope.triggers = batteryTriggers
            break
        case 'Car Location':
            $scope.triggers = carLocationTriggers
            break
    }

    $scope.batteryForm = () => $stateParams.title === 'Battery'
    $scope.locationForm = () => $stateParams.title === 'Car Location'

    $scope.toggle = trigger => {
        trigger.active = !trigger.active
        if($scope.locationForm()) {
            $timeout(() => {
                if($scope.locationForm()) {
                    $scope.setupMaps()
                }
            })
        }
    }

    const markers = []

    $scope.setupMaps = () => {

        const porsche = {lat: 48.8342457, lng: 9.1503551}
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: porsche,
            mapTypeId: 'roadmap',
        })

        const initialMarker = new google.maps.Marker({
            map: map,
            title: 'Porsche',
            position: porsche,
            draggable: true,
        })
        markers.push(initialMarker)

        const input = document.createElement('input')
        input.classList.add('condition--search')
        const searchBox = new google.maps.places.SearchBox(input)
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)

        searchBox.addListener('places_changed', () => {

            const places = searchBox.getPlaces()
            if(!places.length) {
                return
            }
            const place = places[0]
            const bounds = new google.maps.LatLngBounds()

            markers.forEach(marker => marker.setMap(null))
            const newMarker = new google.maps.Marker({
                map: map,
                title: place.name,
                position: place.geometry.location,
                draggable: true,
            })
            markers.push(newMarker)
            if(place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
            map.fitBounds(bounds)
        })
        
    }

    $scope.updateSearch = trigger => {
        const query = trigger.search
    }

    $scope.addCondition = trigger => {
        const condition = {}
        if($scope.batteryForm()) {
            condition.op = trigger.operator
            condition.condition = 'battery'
            condition.value = trigger.value
            condition.title = 'Battery'
            switch(trigger.operator) {
                case 'less':
                    condition.description = `Charging percentage is smaller than ${trigger.value}%`
                    break
                case 'equal':
                    condition.description = `Charging percentage is exactly ${trigger.value}%`
                    break
                case 'greater':
                    condition.description = `Charging percentage is more than ${trigger.value}%`
                    break
            }
        } else if($scope.locationForm()) {
            condition.condition = 'location'
            condition.title = 'Car Location'
            condition.op = trigger.operator
            condition.value = trigger.value
            condition.lat = markers[0].position.lat()
            condition.long = markers[0].position.lng()
            switch(trigger.operator) {
                case 'less':
                    condition.description = `Is closer than ${trigger.value} meters to point on map`
                    break
                case 'equal':
                    condition.description = `Is exactly at point on map`
                    // hard coded values for story
                    condition.op = 'less'
                    condition.value = 200
                    break
                case 'greater':
                    condition.description = `Is more than ${trigger.value} meters away from point on map`
                    break
            }
            
        }
        window.automation.conditions.push(condition)
        $state.go('home')
    }

}]
export { ConditionController }
