// Weather API Data
var APIKey = "2e2abb20095913cfcde631825a6e337d";

var locationLoop = ["q=okeechobee,Florida","q=Biscayne,Florida","q=Cape Canaveral","q=Saint Augustine,Florida","q=Bradenton,Florida","q=Stock Island","q=Biscayne,Florida","q=Saint Augustine,Florida","q=Gulf Breeze,Florida","q=Jacksonville,Florida"]; 

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
        var moreInfo = parkInfo;// parkInfo var is coming from park-info.js file / All information are on other file 
        var parkCode = park[i].parkCode; //Getting Park Code to use on next AJAX/ Park Code separates each park (ex.casa, bicy) from the array
        var images = moreInfo[parkCode].mainImage;
      
  
        var parkBlock = `
          <div class="card small hoverable">
              <a href="content.html?parkCode=${ parkCode }"><div class="card-image">
                  <img id="park-image" src="${images}">
                  <span id="park-name" class="card-title">${fullName}</span>
              </div></a>
              <div id="park-description" class="card-content">
                  <p>${description}</p>
              </div>
              <div class="card-action">
                  <a href="content.html?parkCode=${ parkCode }">More +</a>
                 <a id="temperature" class="right"> <span data-temperature="${ parkCode }"></span> ºF</a>   
              </div>
          </div>
        `;
        //data-temperature= add parkCode(Parks Ids loop)
        // Building the parks.html/ ES6
        $('#parks-page').append(parkBlock); //Append the whole block
  
        
      
        var dropdownContent = `<li><a href="content.html?parkCode=${parkCode}">${fullName}</a></li>`; //Dropdown on main Page / shows the Name of the parks in <li> tag


        $('#parks-list').append(dropdownContent);
        fillTemperature(parkCode);//It is a function because the ajax was being executed before the element been created
        
      } //Building the dropwdown on the index.html/ Also directing to correct page when the park is chose
  
 

    }); // then
    
    function fillTemperature(parkCode) {
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + parkInfo[parkCode].weather + "&units=imperial&appid="+ APIKey;
        //parkInfo[parkCode].weather= displays the weather on park-info.js in each specific park.
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .then(function(res) {
          $('[data-temperature="'+ parkCode +'"]').text( res.main.temp );//display the temperature on html / parkCode is the loop
        });
    }
    
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
        var moreInfo = parkInfo;// parkInfo var is coming from park-info.js file / All information are on other file 
      
        
        
        
        //Adding data on the html 
        $('#park-name').text(park.fullName); // Park Name
        $('#park-description').text(park.description);
        
        $('#phone-input').text(moreInfo[parkCode].phone); //Phone Number
        $('#hours-input').text(moreInfo[parkCode].hours); //Operating Hours
        $('#address-input').text(moreInfo[parkCode].address); //Address
        
        // Images
        $('#google-input img').attr('src', moreInfo[parkCode].googleImage); //Google Pin
        $('#park-image').attr('src', moreInfo[parkCode].mainImage); //Main Image
        
        
        // Fill Weather
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + parkInfo[parkCode].weather + "&units=imperial&appid="+ APIKey;
        
        $.ajax({
          url: queryURL,
          method: "GET"
        })
        .then(function(res) {
          $('#temperature').text( res.main.temp + ' ºF' );
        });
        
        console.log(park);
        console.log(moreInfo[parkCode]);
        //same explanation as above 
        
        
      });
    } 
    
    


$('#favorites').hide()
  
  
//modal

  $('.modal').modal();

                    //Log in

var config = {
  apiKey: "AIzaSyAKclrngrWoi9mPYbc821PlWrljn22nrAI",
  authDomain: "parkfinderauth.firebaseapp.com",
  databaseURL: "https://parkfinderauth.firebaseio.com",
  projectId: "parkfinderauth",
  storageBucket: "parkfinderauth.appspot.com",
  messagingSenderId: "132724982492"
};
firebase.initializeApp(config);

//Get ID elements
var txtEmail = $('#email');
var txtPassword = $('#password');
var btnLogin = $('#btnLogin')
var btnCancelbtn = $('#cancel')
var btnRegister = $('#register')
var btnLogout = $('#indexLogout')
var btnindexLogin = $('#indexLogin')
var navLogout = $('#navLogout')
var navLogin = $('#navLogin')

//Add login event
btnLogin.click(function(){

//get email and password
  var email = txtEmail.val();
  var password = txtPassword.val();
  var auth = firebase.auth();

//sign in
  var promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch(event => console.log(event.message))
  $('#wrongPassword').css({
    display:'block'
  })
  })

  btnRegister.click(function(event){

  //get email and password
  var email = txtEmail.val();
  var password = txtPassword.val();
  var auth = firebase.auth();

  //sign in
  var promise = auth.createUserWithEmailAndPassword(email, password);
  promise.catch(event => console.log(event.message));
    $('#wrongRegister').css({
      display:'block'
    })
  });

  //log out buttons

  btnLogout.click(function(event) {
    firebase.auth().signOut();
    btnLogout.hide()
    location.replace("https://jondisla.github.io/parkfinder")
    $('#logmessage').show();
  })

  navLogout.click(function(){
    location.replace("https://jondisla.github.io/parkfinder")
    $('#logmessage').show();
  })
  
  navLogout.click(function(event) {
    firebase.auth().signOut();
    location.replace("https://jondisla.github.io/parkfinder")
    btnLogout.hide()
  })

  $('#dropLogout').click(function(event) {
    firebase.auth().signOut();
    location.replace("https://jondisla.github.io/parkfinder")
    $('#dropLogout').hide()
  })
  //change state when user is registered

  var email = txtEmail.val();

  firebase.auth().onAuthStateChanged(firebaseUser=> {

    if (firebaseUser) {
      console.log('User Logged in')
      $('#modal1').html('User Logged in')
      btnLogout.show();
      navLogout.show()
      $('#dropLogout').show();
      $('#favorites').show()
      btnindexLogin.hide();
      navLogin.hide();
      $('#dropLogin').hide();
      

      
    }else{
      $('#favorites').hide()
      console.log('Logged out');
      btnLogout.hide();
      navLogout.hide();
      $('#dropLogout').hide();
      btnindexLogin.show();
      navLogin.show()
      $('#dropLogin').show();
      
      
    }
  })


btnindexLogin.click(function() {
  $('.modal').modal();
});

navLogin.click(function() {
  $('.modal').modal();
});

  
  
    //GOOGLE API GOES HERE//



//Open Weather, Add photos on park-info.js, google directions, add favorites and also append on Favorites.html and local storage 


//GOOGLE API GOES HERE//








});
  

