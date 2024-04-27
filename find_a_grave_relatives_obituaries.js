// ==UserScript==
// @name        FindAGrave Relatives Obituaries
// @description When a persons relatives have obituaries listed in there memorial, this scrip will pull that information onto the page of the person you are currently looking at.
// @include     /^https://www.findagrave.com/memorial/*
// @run-at      document-idle
// @require https://code.jquery.com/jquery-3.7.1.min.js
// @updateURL https://raw.githubusercontent.com/builder35/tamper_monkey/main/find_a_grave_relatives_obituaries.js
// ==/UserScript==

function grab_realitive_hrefs(){
    // Grabs the hrefs from all the relative cards on the page.
    var hrefValues = $('.member-item[data-href]').map(function() {
        return $(this).attr('data-href');
    }).get();

    return hrefValues
}
function grab_relatives_info(href){
    // Grabs the bio information and inscription info from relatives
    $.ajax({
          url: `https://www.findagrave.com/${href}`, // Replace 'your_url_here' with the actual URL
          method: 'GET',
          success: function(response) {
                // Filter the response to only include elements with classes ".data-bio" and ".data-inscription"
                var biography = $(response).find('.data-bio #fullBio').text().trim();
                var headstone_inscription = $(response).find('.data-inscription').text().trim();
                var gravesite_details = $(response).find('#gravesite-details').text().trim();
                var realative = $(`.member-item[data-href="${href}"] .flex-grow-1`)

                // Add any data that was found to the realatives tile on the page and modify its css to make it stand out
                if(biography !== ''){
                    realative.append(`<div id="obituary"><label><strong>Biography</strong><p class="realative_info">${biography}</p></div>`)
                    realative.css('background-color', 'rgb(204, 255, 204)');
                }
                if(headstone_inscription !== ''){
                    realative.append(`<div id="headstone_inscription"><label><strong>Headstone Inscription</strong></label><p class="realative_info">${headstone_inscription}</p></div>`)
                    realative.css('background-color', 'rgb(204, 255, 204)');
                }
               if(gravesite_details !== ''){
                    realative.append(`<div id="gravesite_data"><label><strong>Gravesite Details</strong></label><p class="realative_info">${gravesite_details}</p></div>`)
                    realative.css('background-color', 'rgb(204, 255, 204)');
               }


          },
          error: function(xhr, status, error) {
                // Handle errors
                console.error('Error:', error);
          }
    });

}



(function() {
    'use-strict';
    var relative_hrefs = grab_realitive_hrefs();

    // Grab each family members bio and inscription
    relative_hrefs.forEach(function(href) {
        // Perform some action for each href
        grab_relatives_info(href);

    });

    // Your code here...
})();
