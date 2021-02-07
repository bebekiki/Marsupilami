var app = angular.module('CarnetApp', ['ngRoute']);

//Controlleur page index
app.controller('mainCtrl', function ($scope, $location, $http, $window, $rootScope, $timeout) {
    var connect = $window.sessionStorage && $window.sessionStorage.getItem('connect');
    $scope.username = $window.sessionStorage && $window.sessionStorage.getItem('username');
    $scope.connected = false;

    if (connect == "1") {
        $scope.connected = true;
    }
    else if (connect == "0") {
        $scope.connected = false;
    }

    $scope.logout = function () {
        $window.sessionStorage && $window.sessionStorage.setItem('connect', "0");
        $scope.connected = false;
        $location.path('/login');
    }

    //getUser by id
    $scope.getUser = function () {
        var id = $window.sessionStorage.getItem('id');
        $http.get('/api/marsupilami/' + id)
            .success(function (data) {
                if (data.success == false) {
                    console.log(data.message);
                }
                else {
                    $scope.user = data.message;
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    //edit user informations
    $scope.editUser = function (user) {
        var id = $window.sessionStorage.getItem('id');
        $http.patch('/api/' + id, user)
            .success(function (data) {
                if (data.success == false) {
                    console.log(data.message);
                }
                else {
                    $window.sessionStorage && $window.sessionStorage.setItem('username', data.message.username);
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

});

//Controlleur page d'accueil
app.controller('homeCtrl', function ($scope, $location, $http, $window) {

    $scope.allUser = function () {
        $location.path('/friends');
    }
    $scope.allFriends = function () {
        var id = $window.sessionStorage.getItem('id');
        $http.get('/api/friend/' + id)
            .success(function (data) {
                if (data.success == false) {
                    console.log(data.message);
                }
                else {
                    $scope.friends = data.message;
                    if ($scope.friends.length == 0) {
                        $scope.amis = false;
                        $scope.notAmis = true;
                    } else {
                        $scope.amis = true;
                        $scope.notAmis = false;
                    }
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }
    $scope.allFriends();

    $scope.deleteFriends = function (friend) {
        var id = $window.sessionStorage.getItem('id');
        $http.get('/api/' + friend + '/' + id)
            .success(function (data) {
                if (data.success == false) {
                    console.log(data.message);
                    $location.path('/home');
                }
                else {
                    console.log(data.message);
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

});

//Controlleur page de login
app.controller('loginCtrl', function ($scope, $location, $http, $window) {
    $scope.doLogin = function (formData) {
        if (formData == undefined) {
            $scope.field1 = true;
            $scope.field2 = true;
        }
        else if (formData.username == " " || formData.username == undefined) {
            $scope.field1 = true;
            $scope.field2 = false;
        } else if (formData.password == " " || formData.password == undefined) {
            $scope.field2 = true;
            $scope.field1 = false;
        } else {
            $scope.field1 = false;
            $scope.field2 = false;

            $http.post('/api/login', formData)
                .success(function (data) {
                    if (data.success == false) {
                        $scope.message = data.message;
                    }
                    else {
                        $window.sessionStorage && $window.sessionStorage.setItem('connect', "1");
                        $window.sessionStorage && $window.sessionStorage.setItem('username', data.message.username);
                        $window.sessionStorage && $window.sessionStorage.setItem('id', data.message._id);
                        $window.location.href = '/index.html';
                    }
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

        }
    }
});


//Controlleur page de register
app.controller('registerCtrl', function ($scope, $location, $http, $window) {
    $scope.connect = $window.sessionStorage.getItem('connect');
    $scope.doRegister = function (formData) {
        if (formData == undefined) {
            $scope.field1 = true;
            $scope.field2 = true;
        }
        else if (formData.username == " " || formData.username == undefined) {
            $scope.field1 = true;
            $scope.field2 = false;
        } else if (formData.password == " " || formData.password == undefined) {
            $scope.field2 = true;
            $scope.field1 = false;
        } else {
            $scope.field1 = false;
            $scope.field2 = false;

            $http.post('/api/register', formData)
                .success(function (data) {
                    if (data.success == false) {
                        $scope.message = data.message;
                    }
                    else {
                        $location.path('/login');
                    }
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });

        }
    }
});


//Controlleur page de amis
app.controller('friendsCtrl', function ($scope, $location, $http, $window) {
    var id = $window.sessionStorage.getItem('id');
    $scope.getAllUser = function () {
        $http.get('/api/all/' + id)
            .success(function (data) {
                if (data.success == false) {
                    $scope.message = data.message;
                }
                else {
                    $scope.allFriends = data.message;
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }
    $scope.getAllUser();

    $scope.addFriends = function (friend) {
        var id = $window.sessionStorage.getItem('id');
        $http.get('/api/add/' + id + '/' + friend)
            .success(function (data) {
                if (data.success == false) {
                    $scope.message = data.message;
                    $location.path('/home');
                }
                else {
                    $scope.allFriends = data.message;
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

})

