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
          // append content to the DOM e.g. replace quote content with the rest api content
          

          $(`.entry-content`).empty();
          $(`.entry-content`).append(data[0].content.rendered);

          $(`.entry-meta`).empty();
          $(`.entry-meta`).append(data[0].title.rendered);

          $(`.source`).empty();

          if (data[0]._qod_quote_source_url.length > 0) {
              console.log("working");
            $(`.source`).append(`<a href="${data[0]._qod_quote_source_url}">&nbsp;${data[0]._qod_quote_source}</a>`
            );
          }
            else {
                console.log("fail");
                $(`.source`).append(data[0]._qod_quote_source);
            }

            const quote = data[0];
            console.log(quote.slug);
            // figure out the post slug
            history.pushState(null, null, qod_vars.home_url + '/' + quote.slug);

          
        })
        .fail(function(err) {
            $(`.content-area`).append("Sorry, something went wrong");
        //   throw err;
          


          //Append a message for the user or alert a message saying something went wrong
        });
    }//end of get quote



    //make sure this is outside of any functions or statements
    $(window).on('popstate', function(){
        window.location.replace(lastPage)
    })


//submit the form and 

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
                
            },
            beforeSend: function(xhr) {
                xhr.setRequestHeader( 'X-WP-Nonce', qod_vars.nonce );
             }

        }).done(function(){
            

            
            $(".quote-submission-wrapper").slideUp("1800");
            $(".quote-submission").append("<p>Your Quote Was Succesfully Submitted</p>");
            
           

//slide the form
//append success message, thank you for submitting a quote

         }).fail(function(){
            console.log('something else');

//output fail message
        });
    }








  });  //end of document ready
})(jQuery);
