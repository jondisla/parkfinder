$(document).ready(function(){
    // Init Tooltip
    $('.tooltipped').tooltip();

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



//GOOGLE API GOES HERE//








});