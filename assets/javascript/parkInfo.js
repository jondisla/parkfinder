//National park ACTIVE API

$(document).ready(function(){
    console.log('ready');

const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
    const url = 'api.amp.active.com/v2/search/?near=FL&current_page=1&per_page=10&sort=distance&exclude_children=true&api_key=dp6wcjbjmw2ce2tee4xxm2kp';
        
        $.ajax({
            type: 'GET',
            url: corsAnywhere + url,
            success: function(response) {
            console.log(response);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
            },
        });
});