angular.module('Shopping',[])
  .controller('MainCtrl',[
    '$scope','$http',
    function($scope,$http) {
      $scope.products = []; 
      $scope.create = function(product) {
        return $http.post('/products', product).success(function(data){
          $scope.products.push(data);
        });
      };
      $scope.addProduct = function() {
        if($scope.formContent === '') { return; }
        console.log("Adding "+$scope.productName+" at $"+$scope.productPrice);
        $scope.create({
          name: $scope.productName,
          orders: 0,
	  price: $scope.productPrice,
	  url: $scope.productURL,
	  selected: false
        });
        $scope.formContent = '';
      };
      $scope.updateSelection = function() {
	$scope.$apply();
      }
      $scope.getAll = function() {
        return $http.get('/products').success(function(data){
          angular.copy(data, $scope.products);
        });
      };
      $scope.purchase = function() {
	for(i = 0; i < $scope.products.length; i++) {
	  if($scope.products[i].selected == true) {
	    $scope.order($scope.products[i]);
	    $scope.products[i].selected = false;
	  }
	}
      };
      $scope.getAll(); //create initial list 
      $scope.order = function(product) {
        return $http.put('/products/' + product._id + '/order').success(function(data){
          console.log("order sent");
          product.orders += 1;
        });
      };
      $scope.delete = function(product) {
        $http.delete('/products/' + product._id )
          .success(function(data){
            console.log("delete worked");
          });
        $scope.getAll();
      };      
  }]);
