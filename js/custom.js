(function($) {
  $(document).ready(function() {
    // get a random post and append content to the dom

    let lastPage = '';
    $('#new-quote-button').on('click', function(event) {
      event.preventDefault();

      //ajax request
      getQuote();
    });

    function getQuote() {

        lastPage = document.URL;


      $.ajax({
        method: 'GET',
        url:
          qod_vars.rest_url +
          'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'
      })
        .done(function(data) {
          // append content to the DOM
          const quote = data[0];
          
          $(`.entry-content`).empty();
          $(`.entry-content`).append(quote.content.rendered);


          
          $(`.entry-title`).empty();
          $(`.entry-title`).text('— '+quote.title.rendered);

          $(`.source`).empty();

          if (quote._qod_quote_source_url.length > 0) {
            
            $(`.source`).append(`,<a href="${quote._qod_quote_source_url}">&nbsp;${quote._qod_quote_source}</a>`
            );
          }
            else {
               
                $(`.source`).append(quote._qod_quote_source);
            }

            
           

            history.pushState(null, null, qod_vars.home_url + '/' + quote.slug);

          
        })
        .fail(function(err) {
            $(`.content-area`).append("Sorry, something went wrong");
        //   throw err;
          
        });
    }//end of get quote



    //make sure this is outside of any functions or statements
    $(window).on('popstate', function(){
        window.location.replace(lastPage)
    })


//submit the form

$('#quote-submission-form').on('submit', function(event){
    event.preventDefault();
    postQuote();

    });
    function postQuote(){

        //get values of form inputs

        const quoteTitle = $('#quote-author').val();
        const quoteContent = $('#quote-content').val();
        const source = $('#quote-source').val();
        const source_url = $('#quote-source-url').val();


        $.ajax({
            method: 'POST',
            url: qod_vars.rest_url + 'wp/v2/posts',
            data: {
                
                title: quoteTitle,
                content: quoteContent,               
                _qod_quote_source: source,
                _qod_quote_source_url: source_url,
                status: 'publish',
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader( 'X-WP-Nonce', qod_vars.nonce );
             }

        }).done(function(){
            

            
            $(".quote-submission-wrapper").slideUp("1800");
            $(".quote-submission").append("<p>Your Quote Was Succesfully Submitted</p>");
            
           

//slide the form
//appends success message, thank you for submitting a quote

         }).fail(function(){
            $(".quote-submission").alert("Something went wrong, please try again")

//output fail message
        });
    }








  });  //end of document ready
})(jQuery);
