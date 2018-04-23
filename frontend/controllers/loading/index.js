
import {LoadingController} from './loading.controller'
import {LoadingInterceptor} from './loading.interceptor'
import {LoadingService} from './loading.service'

const Loading = angular.module('automator.loading', [])
    .controller('LoadingController', LoadingController)
    .factory('loading', LoadingService)
    .factory('loadingInterceptor',  LoadingInterceptor)

    .config(['$httpProvider', $httpProvider => {

        $httpProvider.interceptors.push('loadingInterceptor')

    }])

export {Loading}
