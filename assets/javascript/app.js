$(document).ready(function(){
 
    // Init Tooltip
    $('.tooltipped').tooltip();
    $(".dropdown-trigger").dropdown();
 
      

    // When button clicked save on favorites
   $(".heart").click(function(){
    M.toast({html: 'Park Saved!', classes:'rounded'});
   });

   
        
    $('.park-content').css({
    display: 'none'
    });

    $("#search-parks, #all-parks").click(function() {
    event.preventDefault()
        $(".main").hide();
        $(".park-content").show()
        $('html,body').animate({
            scrollTop: $(".parks-content").offset().top},
            'slow');
});

// Weather API //
    // This is our API key
    var APIKey = "2e2abb20095913cfcde631825a6e337d";
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      "q=Orlando,Florida&units=imperial&appid=" + APIKey;
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
        // Log the queryURL
        console.log(queryURL);
        // Log the resulting object
        console.log(response);
        // Transfer content to HTML
        $("#weather-name").html(response.name);
        // $(".wind").text("Wind Speed: " + response.wind.speed);
        // $(".humidity").text("Humidity: " + response.main.humidity);
        $("#temperature").text("Temperature: " + response.main.temp);
        // $(".min-temp").text("Temperature (F) " + response.main.min-temp);
        // $(".max-temp").text("Temperature (F) " + response.main.temp);
       
       
        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature: " + response.main.temp);
      });


});

//GOOGLE API GOES HERE//








