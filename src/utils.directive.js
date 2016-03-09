angular.module("bdt-angular-utils")

.directive("bdtMatch", function(){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, ele, attrs, ctrl){
      ctrl.$parsers.unshift(function(val){
        var cmpVal = scope.$eval(attrs.bdtMatch)
        var isValid = val == cmpVal
        ctrl.$setValidity('match', isValid)
        if(isValid) return val
      })
    }
  }
})

.directive("bdtNotIn", function(){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, ele, attrs, ctrl){
      ctrl.$parsers.unshift(function(val){
        var cmpVal = scope.$eval(attrs.bdtNotIn)
        var isValid = cmpVal.indexOf(val) < 0
        ctrl.$setValidity('notIn', isValid)
        if(isValid) return val
      })
    }
  }
})
