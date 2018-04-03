
// Array holding all Florida Parks Code
var Parks_IDs = ['drto', 'casa', 'bicy', 'bisc', 'cana', 'deso', 'ever', 'timu', 'foma', 'guis'];

// This is the Parks API Key
var Parks_APIKey = 'EDBeZOIgUpZ6soM0x0qAzkKbaBVDiZiYJBGgMkkm';

// Here we are building the URL we need to query the database
var Parks_queryURL = 'https://developer.nps.gov/api/v1/parks?api_key=' + Parks_APIKey;

jQuery(document).ready(function($){
 
    // Init Tooltip
    $(".dropdown-trigger").dropdown();
 
      

    // When button clicked save on favorites
   $(".heart").click(function(){
    M.toast({html: 'Park Saved!', classes:'rounded'});
   });


    // Here we run our AJAX call to the NPS API
    // This AJAX is getting the array Parks_IDs
    $.ajax({
      url: Parks_queryURL + '&parkCode=' + Parks_IDs,
      method: "GET"
    })

    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
      var park = response.data;
  // Lopping through all the parks code
      for(var i = 0; i < park.length; i++) {
        var fullName = park[i].fullName; //Getting the Park Name 
        var description = park[i].description; // Getting Park Description
        var parkCode = park[i].parkCode; //Getting Park Code to use on next AJAX/ Park Code separates each park (ex.casa, bicy) from the array
  
        var parkBlock = `
          <div class="card small hoverable">
              <a href="content.html?parkCode=${ parkCode }"><div class="card-image">
                  <img id="park-image" src="assets/images/test2.png">
                  <span id="park-name" class="card-title">${fullName}</span>
              </div></a>
              <div id="park-description" class="card-content">
                  <p>${description}</p>
              </div>
              <div class="card-action">
                  <a href="content.html?parkCode=${ parkCode }">More +</a>
                 <a id="temperature" class="right">[NO TEMP] ºF</a>    
              </div>
          </div>
        `;
        // Building the parks.html/ ES6
        $('#parks-page').append(parkBlock); //Append the whole block
        
      
        var dropdownContent = `<li><a href="content.html?parkCode=${ parkCode}">${fullName}</a></li>`;
        $('#parks-list').append(dropdownContent);
        
      } //Building the dropwdown on the index.html/ Also directing to correct page when the park is chose
  
 

    }); // then
    
    //Creating an hidden input, so when the function only executed on the content.html page/ park_detail is the value on the html
    if( $('#PAGE_NAME').val() == 'park_detail' ) {
      
      var url_string = window.location.href; //getting the current URL (parkCode)/This is only a string / How JS interpreted
      var url = new URL(url_string);  //converted the above url into a way JS understand
      var parkCode = url.searchParams.get("parkCode"); //searc.Params is the function from JS that only work when is an url / get parameter parkCode
      
      
      // GET PARK INFO
      $.ajax({
        url: Parks_queryURL + '&parkCode=' + parkCode, //This ajax only gets one park at each time 
        method: "GET"
      })
      .then(function(res){
        var park = res.data[0]; 
        var moreInfo = parkInfo; // parkInfo var is coming from park-info.js file / All information are on other file 
        
        
        
        //Adding data on the html 
        $('#park-name').text(park.fullName); // Park Name
        $('#park-description').text(park.description);
        
        $('#phone-input').text(moreInfo[parkCode].phone); //Phone Number
        $('#hours-input').text(moreInfo[parkCode].hours); //Operating Hours
        $('#address-input').text(moreInfo[parkCode].address); //Address
        
        // Images
        $('#google-input img').attr('src', moreInfo[parkCode].googleImage); //Google Pin
        $('#park-image').attr('src', moreInfo[parkCode].mainImage); //Main Image
        
        console.log(park);
        console.log(moreInfo[parkCode]);
        
        
      });
    
      
    } 
    

});

//Open Weather, Add photos on park-info.js, google directions, add favorites and also append on Favorites.html and local storage, Fix logo on desktop 














// // Weather API //
//     // This is our API key
//     var APIKey = "2e2abb20095913cfcde631825a6e337d";
//     // Here we are building the URL we need to query the database
//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
//       "q=Orlando,Florida&units=imperial&appid=" + APIKey;
//     // Here we run our AJAX call to the OpenWeatherMap API
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//       // We store all of the retrieved data inside of an object called "response"
//       .then(function(response) {
//         // Log the queryURL
//         console.log(queryURL);
//         // Log the resulting object
//         console.log(response);
//         // Transfer content to HTML
//         $("#weather-name").html(response.name);
//         // $(".wind").text("Wind Speed: " + response.wind.speed);
//         // $(".humidity").text("Humidity: " + response.main.humidity);
//         $("#temperature").text("Temperature: " + response.main.temp);
//         // $(".min-temp").text("Temperature (F) " + response.main.min-temp);
//         // $(".max-temp").text("Temperature (F) " + response.main.temp);
       
       
//         // Log the data in the console as well
//         console.log("Wind Speed: " + response.wind.speed);
//         console.log("Humidity: " + response.main.humidity);
//         console.log("Temperature: " + response.main.temp);
//       });



//GOOGLE API GOES HERE//








