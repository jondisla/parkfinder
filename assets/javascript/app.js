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

//Log in testing//
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
var btnLogout = $('#navLogout')
var btnLogin = $('#navLogin')

//Add login event
btnLogin.click(function(){
//   //get email and password
var email = txtEmail.val();
var password = txtPassword.val();
var auth = firebase.auth();
    //sign in
var promise = auth.signInWithEmailAndPassword(email, password);
promise.catch(event => console.log(event.message))
})

btnRegister.click(function(event){
//get email and password
var email = txtEmail.val();
var password = txtPassword.val();
var auth = firebase.auth();
    //sign in
var promise = auth.createUserWithEmailAndPassword(email, password);
promise.catch(event => console.log(event.message));
});

//log out

btnLogout.click(function(event) {
  firebase.auth().signOut();
  btnLogout.hide()
})

btnLogin.click(function() {
  console.log('clicked')
  $('.park-content').hide();
  $('#login-page').show();
})
//change state when user is registered
firebase.auth().onAuthStateChanged(firebaseUser=> {
  if (firebaseUser) {
    console.log('User Created')
    btnLogout.removeAttr( 'style' );
    btnLogin.attr("css", { display: "none" });
    
  }else{
    console.log('Unable to Register');
    btnLogout.attr("css", { display: "none" });
  }
})
// hide the form
$('#login-page').hide();

//grab the id and change form to sign in form

$('#login').click(function(event){
  event.preventDefault();
  $('#parks-form').hide()
  $('#login-page').show();
})

//Revert back to search on cancel

$('#cancel').click(function(){
  $('#login-page').hide();
  $('#parks-form').show();
})

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


    //GOOGLE API GOES HERE//




    //Contact page firebase//


if ($('#newContact').length > 0 ) {
    contactScript('forcontact');
}

//firebase
function contactScript(value) {
var a = {
  apiKey: "AIzaSyDR72NQLjCvgSFslE3ZiZVgTfgNUZAVEc4",
  authDomain: "contactform-2e332.firebaseapp.com",
  databaseURL: "https://contactform-2e332.firebaseio.com",
  projectId: "contactform-2e332",
  storageBucket: "contactform-2e332.appspot.com",
  messagingSenderId: "937912320174"
};
firebase.initializeApp(a);

var b = firebase.database().ref("Messages");
    $("#newContact").submit(function(a) { $(this), $('#submitMessage').text("Thanks for contacting us!");
    $('#submitMessage').css({
      color:'green',
      fontSize:'30px'
    });
    var c = $("#name").val(),
        d = $("#email").val(),
        e = $('#message').val(),
        f = { name: c, email: d, e: message};
    return b.push(f).then(function(a) { 
        $(".sucess").css("display", "block"), 
        $(".sucess-none").css("display", "none") }), !1 })   
}


});