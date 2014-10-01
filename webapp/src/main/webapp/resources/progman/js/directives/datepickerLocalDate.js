progman.directive('datepickerLocalDate', ['$parse', function ($parse) {
    var directive = {
            restrict: 'A',
            require: ['ngModel'],
            link: link
    };
    return directive;
 
    function link(scope, element, attr, ctrls) {
        var ngModelController = ctrls[0];
         
        // called with a JavaScript Date object when picked from the datepicker
        ngModelController.$parsers.push(function (viewValue) {
            if (!viewValue) {
                return viewValue;
            }
            
            // convert to utc date with empty time fields
            return new Date(viewValue.getUTCFullYear(), viewValue.getUTCMonth(), viewValue.getUTCDate(),0, 0, 0, 0); 
        });
        
    }
}]);