/*js*/
$(function(){
	$('.slider-arrow').click(function(){
        if($(this).hasClass('show')){
	    $( ".slider-arrow, .secondary .nav" ).animate({
          left: "+=220"
		  }, 700, function() {
            // Animation complete.
          });
		
		
		  $(".secContent").animate({'margin-left': "240px"}, 700, function(){});
		
		$(this).html('&laquo;').removeClass('show').addClass('hide');
        }
        else {   	
	    $( ".slider-arrow, .secondary .nav" ).animate({
          left: "-=220"
		  }, 700, function() {
            // Animation complete.
          });
		  
		  $(".secContent").animate({'margin-left': "0px"}, 700, function(){});
		  
		  $(this).html('&raquo;').removeClass('hide').addClass('show');    
        }
    });

});