progman.directive('autoTabTo', [function () {
	return {
		restrict: "A",
		link: function (scope, el, attrs) {
			el.bind('keydown', function(event) {
				if(event.shiftKey && event.keyCode == 9) {
					focusElement(document.getElementById(attrs.autoTabFrom));
				} else if(event.which === 9) {
					focusElement(document.getElementById(attrs.autoTabTo));
				}
			});
			
			function focusElement(element) {
				if (element) {
					element.focus();
				}
				event.preventDefault();
			}
		}
	}
}]);