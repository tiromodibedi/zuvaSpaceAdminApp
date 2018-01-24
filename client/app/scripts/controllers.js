angular.module('zuvaSpaceAdminApp')
    .controller('HomeController',['$scope','classifiedsFactory',
    function ($scope, classifiedsFactory) {
      'use strict';
      classifiedsFactory.query(
        function (response) {
          $scope.classifieds = response;
        },
        function (response) {
          $scope.message = "Error: "+response.status+" "+response.statusText;
        }
      );
      /**
       * Show 5 Recent classifieds (order by Date - most recent)
       */
       $scope.limit = 5;
       $scope.recentClassifieds = "-createdAt";
    }])
    .controller('MenuController',['$scope','$state','classifiedsFactory',
    function ($scope, $state, classifiedsFactory) {
      'use strict';
      classifiedsFactory.query(
        function (response) {
          $scope.classifieds = response;
        },
        function (response) {
          $scope.message = "Error: "+response.status+" "+response.statusText;
        }
      );

      /**
       * Function: Perform a basic search Function
       */
       $scope.search = function (searchKeyword) {
         if (searchKeyword) {
           if (searchKeyword.length > 0) {
             $scope.searchFilter = searchKeyword;
           } else {
             $scope.searchFilter = undefined;
           }
         } else {
           $scope.searchFilter = undefined;
         }
       };
       /**
        * Function: Clear the search Field
        */
        $scope.clear = function () {
          $scope.searchKeyword = undefined;
          $scope.searchFilter = undefined;
        };
        /**
         * Function: Delete a classified
         */
         $scope.deleteClassified = function (classifiedId) {
           classifiedsFactory.delete({id: classifiedId});
           $state.go($state.current, {}, {reload: true});
         };
    }])
    .controller('PostClassifiedController',['$scope','$state','Upload','cloudinary',
    'classifiedsFactory', function ($scope,$state,$upload,cloudinary,classifiedsFactory) {
      classifiedsFactory.query(
        function (response) {
          $scope.classifieds = response;
        },
        function (response) {
          $scope.message = "Error: "+response.status+" "+response.statusText;
        }
      );

      $scope.classifiedCategories = [
        {value: "real estate", label: "Real Estate"},
        {value: "services", label: "Services"},
        {value: "jobs", label: "Jobs"}
      ];

      $scope.classifiedSubCategories = [
        {value: "residential", label: "Residential"},
        {value: "commercial", label: "Commercial"},
        {value: "farm", label: "Farm"}
      ];

      $scope.classifiedTypes = [
        {value: "house", label: "Standalone House"},
        {value: "apartment", label: "Apartment"},
        {value: "plot", label: "Plot"},
        {value: "office space", label: "Office Space"},
        {value: "retail space", label: "Retail Space"},
        {value: "warehouse", label: "Warehouse"},
        {value: "business", label: "Business"},
        {value: "cattle ranch", label: "Cattle Ranch"},
        {value: "poultry", label: "Poultry"},
        {value: "fish", label: "Fish"},
        {value: "horticulture", label: "Horticulture"},
        {value: "tshimo", label: "Tshimo"}
      ];

      $scope.listingTypes = [
        {value: "rent", label: "Rent"},
        {value: "sale", label: "Sale"}
      ];

      $scope.listingDurations = [
        {value: 1, label: "1 week"},
        {value: 2, label: "2 weeks"},
        {value: 3, label: "3 weeks"}
      ];

      $scope.premiumListingOptions = [
        {value: true, label: "yes"},
        {value: false, label: "no"}
      ];

      $scope.myimage = {
        public_id: "",
        url: ""
      };
      $scope.newClassified = {
        classifiedCategory: "",
        classifiedSubCategory: "",
        classifiedType: "",
        listingType: "",
        listingDuration: 1,
        premiumListing: false,
        description: "",
        location: "",
        cost: "",
        images: [],
        author: {
          fullname: "",
          phone: "",
          email: ""
        }
      };

      $scope.hideSubmitButton = false;

      $scope.uploadFiles = function (files) {
        $scope.files = files;
        if(!$scope.files) return;
        angular.forEach(files, function (file) {
          if (file && !file.$error) {
            file.upload = $upload.upload({
              url: "https://api.cloudinary.com/v1_1/" + cloudinary.config().cloud_name + "/upload",
              data: {
                upload_preset: cloudinary.config().upload_preset,
                tags: 'zuvaSpaceAdmin',
                file: file
              },
              headers: {
                'x-access-token': undefined
              }
            }).progress(function (e) {
              file.progress = Math.round((e.loaded*100.0)/e.total);
              file.status = "Uploading... " + file.progress + "%";
            }).success(function (data, status, headers, config) {
              file.result = data;
              $scope.hideSubmitButton = true;
              console.log(data);
              $scope.myimage.public_id = data.public_id;
              $scope.myimage.url = data.secure_url;
              $scope.newClassified.images.push($scope.myimage);
            }).error(function (data, status, headers, config) {
              file.result = data;
              console.log(data);
            });
          }
        });
      };

      $scope.postNewClassified = function () {
        classifiedsFactory.save($scope.newClassified);
        $scope.myimage = {
          public_id: "",
          url: ""
        };
        $scope.newClassified = {
          classifiedCategory: "",
          classifiedSubCategory: "",
          classifiedType: "",
          listingType: "",
          listingDuration: 1,
          premiumListing: false,
          description: "",
          location: "",
          cost: "",
          images: [],
          author: {
            fullname: "",
            phone: "",
            email: ""
          }
        };
        $state.go($state.current, {}, {reload: true});
        $scope.postClassifiedForm.$setPristine();
      };
    }])
    .controller('classifiedDetailController',['$scope','$stateParams',
    'classifiedsFactory', function ($scope, $stateParams, classifiedsFactory) {
      'use strict';
      $scope.classified = classifiedsFactory
      .get({id:$stateParams.id})
      .$promise.then(
        function (response) {
          $scope.classified = response;
        },
        function (response) {
          $scope.message = "Error: "+response.status+" "+response.statusText;
        }
      );

      $scope.showEditForm = false;
      $scope.editClassified = function () {
        $scope.showEditForm = !$scope.showEditForm;
      };

      $scope.classifiedCategories = [
        {value: "real estate", label: "Real Estate"},
        {value: "services", label: "Services"},
        {value: "jobs", label: "Jobs"}
      ];

      $scope.classifiedSubCategories = [
        {value: "residential", label: "Residential"},
        {value: "commercial", label: "Commercial"},
        {value: "farm", label: "Farm"}
      ];

      $scope.classifiedTypes = [
        {value: "house", label: "Standalone House"},
        {value: "apartment", label: "Apartment"},
        {value: "plot", label: "Plot"},
        {value: "office space", label: "Office Space"},
        {value: "retail space", label: "Retail Space"},
        {value: "warehouse", label: "Warehouse"},
        {value: "business", label: "Business"},
        {value: "cattle ranch", label: "Cattle Ranch"},
        {value: "poultry", label: "Poultry"},
        {value: "fish", label: "Fish"},
        {value: "horticulture", label: "Horticulture"},
        {value: "tshimo", label: "Tshimo"}
      ];

      $scope.listingTypes = [
        {value: "rent", label: "Rent"},
        {value: "sale", label: "Sale"}
      ];

      $scope.listingDurations = [
        {value: 1, label: "1 week"},
        {value: 2, label: "2 weeks"},
        {value: 3, label: "3 weeks"}
      ];

      $scope.premiumListingOptions = [
        {value: true, label: "yes"},
        {value: false, label: "no"}
      ];

      $scope.updateClassified = function () {
        classifiedsFactory.update({id:$stateParams.id}, $scope.classified);
      };
    }])
    .controller('DashboardController',['$scope','classifiedsFactory','usersFactory',
    function ($scope, classifiedsFactory, usersFactory) {
        $scope.classifieds = classifiedsFactory.query(
          function (response) {
            $scope.classifieds = response;
            $scope.numOfClassifieds = response.length;
            $scope.numOfVisitors = 2322;
          },
          function (response) {
            $scope.message = "Error: "+response.status+" "+response.statusText;
          }
        );
        $scope.users = usersFactory.query(
          function (response) {
            $scope.users = response;
            $scope.numOfUsers = response.length;
          },
          function (response) {
            $scope.message = "Error: "+response.status+" "+response.statusText;
          }
        );
        $scope.adminUsers = usersFactory.query({
          "admin": true
        }).$promise.then(
          function (response) {
            $scope.adminUsers = response;
            $scope.numOfAdmins = response.length;
          },
          function (response) {
            $scope.message = "Error: "+response.status+" "+response.statusText;
          }
        );
    }])
    .controller('ServerSpecsController',['$scope',
    function ($scope) {
        var diskSpaceUsed = 30;
        var bandwidthUsed = 25;

        $scope.diskSpaceUsed = diskSpaceUsed;
        $scope.bandwidthUsed = bandwidthUsed;
    }])
    .controller('HeaderController',['$scope','$state','$rootScope','ngDialog',
    'AuthFactory',function ($scope, $state, $rootScope, ngDialog, AuthFactory) {
      $scope.loggedIn = false;
      $scope.username = '';

      if (AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
      }

      $scope.openLogin = function () {
        ngDialog.open({
          template: 'views/login.html',
          scope: $scope,
          className: 'ngdialog-theme-default',
          controller: "LoginController"
        });
      };

      $scope.logout = function () {
        AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
        $state.go('app', null, {reload: true});
      };

      $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
        $state.go('app', null, {reload: true});
      });

      $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
      });

      $scope.stateis = function (curstate) {
        return $state.is(curstate);
      };
    }])
    .controller('LoginController',['$scope','$state','ngDialog','$localStorage',
    'AuthFactory',function ($scope, $state, ngDialog, $localStorage, AuthFactory) {
      $scope.loginData = $localStorage.getObject('userinfo','{}');

      $scope.doLogin = function () {
        if ($scope.rememberMe) {
          $localStorage.storeObject('userinfo',$scope.loginData);
        }
        AuthFactory.login($scope.loginData);
        ngDialog.close();
      };

      $scope.openRegister = function () {
        ngDialog.open({
          template: 'views/register.html',
          scope: $scope,
          className: 'ngdialog-theme-default',
          controller: "RegisterController"
        });
      };
    }])
    .controller('RegisterController',['$scope','ngDialog','$localStorage','AuthFactory',
    function ($scope, ngDialog, $localStorage, AuthFactory) {
      $scope.register = {};
      $scope.loginData = {};

      $scope.doRegister = function () {
        console.log('Doing registration',$scope.registration);
        AuthFactory.register($scope.registration);
        ngDialog.close();
      };
    }])
;
