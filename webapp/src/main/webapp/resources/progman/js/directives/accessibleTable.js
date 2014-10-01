
progman.directive('accessibleTable', function() {
	return {
		restrict: 'A',
		scope: true,
		link: function(scope, el) {
			
			var isMenu = false;
			var keys = {left: 37, up: 38, right: 39, down: 40};
			var parentTypes = [];
			
			var siblingIndex = 0;
			
			var firstVisibleField = function(node, tdIndex, leftNav) {
				if (tdIndex !== undefined) {
					node = node.children[tdIndex];
				}
				if (node) {
					var descendants = node.getElementsByTagName('*');
					if(leftNav) {
						for (var i = descendants.length - 1; i >= 0; i--) {
							if ((descendants[i].nodeName === 'INPUT' || descendants[i].nodeName === 'BUTTON' || descendants[i].nodeName === 'SELECT')
									&& descendants[i].offsetHeight > 0 && descendants[i].offsetWidth > 0 && !descendants[i].disabled) {
								siblingIndex = i;
								return descendants[i];
							}
						}
					} else {
						for (var i = 0; i < descendants.length; i++) {
							if ((descendants[i].nodeName === 'INPUT' || descendants[i].nodeName === 'BUTTON' || descendants[i].nodeName === 'SELECT')
									&& descendants[i].offsetHeight > 0 && descendants[i].offsetWidth > 0 && !descendants[i].disabled) {
								siblingIndex = i;
								return descendants[i];
							}
						}
					}
				}
				return undefined;
			}
			
			scope.focusNext = function(event, node, startInput) {
				var key = event.which;
				event.preventDefault();
			
				// check for siblings
				var sibling = startInput;
				var fieldFound = false;
				do {
					sibling = (key === keys.left || key === keys.up ? sibling.previousElementSibling : sibling.nextElementSibling);
					
					angular.forEach(parentTypes, function(parentType) {
						if(sibling != null && sibling.nodeName === parentType && sibling.offsetHeight > 0 && sibling.offsetWidth > 0 && !sibling.disabled) {
							fieldFound = true;
						}
					});
				} while(sibling != null && !fieldFound);
				
				if(sibling != null) {
					destinationInput = sibling;
					
				} else {
					//walk along the TDs until we find one that has a visible input within it
					var parentNodeName = 'TD';
					if(isMenu) {
						parentNodeName = 'DIV';
					}
					do {
						node = (key === keys.left ? node.previousElementSibling : node.nextElementSibling);
						if (node && node.nodeName === parentNodeName) {
							siblingIndex = 0;
							destinationInput = firstVisibleField(node, undefined, key === keys.left);
						} else {
							return;  //no more TDs available - we're done here
						}
					} while (!destinationInput);
				}
				return destinationInput;
			};
		  
			el.bind('keydown', function(event) {
				var key = event.which;
			  
				//start at the currently focused element, must be an input for this to continue
				var startInput = document.activeElement;
				if(startInput.nodeName == 'LI') {
					parentTypes = ["DIV", "LI"];
					isMenu = true;
				} else if (startInput.nodeName !== 'INPUT' && startInput.nodeName !== 'BUTTON' && startInput.nodeName !== 'SELECT') {
					return;
				} else {
					parentTypes = ["INPUT", "BUTTON", "SELECT"];
				}
				
				var destinationInput;
				var node = startInput;
				var count = 0;
				var parentNodeName = 'TD';
				if(isMenu) {
					parentNodeName = 'DIV';
				}
			  
				//look for the startInput's TD
				do {
					node = node.parentNode;
					count++;
				} while (node && node.nodeName !== parentNodeName || count == 10);
				
				if (!node) {
					return;  //ill-formed html
				}

				// keys.left, keys.right
				if (key === keys.left || key === keys.right) {				  				  		
					destinationInput = scope.focusNext(event, node, startInput);
					
				// keys.down, keys.up
				} else if (key === keys.up || key === keys.down) {
					if(isMenu) {
						destinationInput = scope.focusNext(event, node, startInput);
					} else {
						event.preventDefault();
						
						var tdIndex = node.cellIndex;
						var count = 0;
	
						do { //find the TR
							node = node.parentNode;
							count++;
						} while (node && node.nodeName !== 'TR' || count == 10);
						
						if (!node) {
							return;  //ill-formed html
						}
	
						do {
							node = (key === keys.up ? node.previousElementSibling : node.nextElementSibling);
							if (node && node.nodeName === 'TR') {
								destinationInput = firstVisibleField(node, tdIndex);
							} else {
								return;  //no more rows or ill-formed html
							}
						} while (!destinationInput);
					}
				}

				if (destinationInput) {
					destinationInput.focus();
					if(!isMenu) {
						startInput.setAttribute("tabindex", "-1");
						destinationInput.setAttribute("tabindex", "0");
					}
				}
			})
		}
	}
})