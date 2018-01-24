angular.module('zuvaSpaceAdminApp',['cloudinary','ngFileUpload','ui.router',
'ngResource','ngDialog'])
.config(function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.config(function ($stateProvider, $urlRouterProvider) {
    'use strict';
    $stateProvider
    /**
     * route for the homepage
     */
    .state('app',{
        url: '/admin/',
        views: {
            'header':{
                templateUrl: 'views/header.html',
                controller: 'HeaderController'
            },
            'content': {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            },
            'footer': {
                templateUrl: 'views/footer.html'
            }
        }
    })
    /**
     * route for the classifieds page
     */
    .state('app.classifieds',{
        url: 'classifieds',
        views: {
            'content@': {
                templateUrl: 'views/classifieds.html',
                controller: 'MenuController'
            }
        }
    })
    /**
     * route for the classifiedDetail page
     */
     .state('app.classifiedDetails',{
         url: 'classifieds/:id',
         views: {
             'content@': {
                 templateUrl: 'views/classifiedDetail.html'
                 //controller: 'classifiedDetailController'
             }
         }
     })
    /**
     * route for the postClassified page
     */
    .state('app.postClassified',{
        url: 'postClassified',
        views: {
            'content@': {
                templateUrl: 'views/postClassified.html',
                controller: 'PostClassifiedController'
            }
        }
    });
    $urlRouterProvider.otherwise('/admin/');
});
