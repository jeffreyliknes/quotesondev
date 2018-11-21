(function($){
    $(document).ready(function() {

        
        $('.main-navigation .icon-search').on('click', function(event) {
            
            event.preventDefault();
          
          $(".search-form .search-field").addClass("show");
          $(".search-form .search-field").focus();
        });
    
        $('.search-form .search-field').on('blur', function(event) {
          $('.search-form .search-field').removeClass('show');
        });
      });
    $(document).ready(function(){
        $('header').append('');

});

})(jQuery);