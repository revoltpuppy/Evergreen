var rem = 16;  //value of 1 root em
var bWidth = document.documentElement.clientWidth; //browser width
var illusRotationRange = 2;  //how far in either direction an illustration can rotate, in degrees

/**
 * Simple Accordion
 *
 * Simple accordion without all the jQuery UI problems.
 */
var allPanels = $('.accordion > dd').hide();  //Hide all accordion panels, but...
//console.log("Panels hidden.");
var defaultPanel = $(".is-expanded").parent().next().show();  //Show default accordion panel
$('.accordion > dt > a').click(function(event) {
    event.preventDefault();
    allPanels.slideUp();
    if($(this).hasClass("is-expanded")){
        allPanels.prev().children("a").removeClass("is-expanded");
    } else {
        allPanels.prev().children("a").removeClass("is-expanded");
        $(this).addClass("is-expanded").parent().next().slideDown();
    }
    return false;
});

/**
 * Fluid Media
 * 
 * Fluid multimedia with default embed codes (makes things easy for content owners)
 * Adapted from Chris Coyier’s Fluid Width Video script
 * See: http://css-tricks.com/NetMag/FluidWidthVideo/demo.php
 */
function fluidMedia(media){
  media.each(function(){
	  //Get the width of the containing element
    $dataWidth = $(this).parent().width();
    $(this)
      //jQuery .data does not work on object/embed elements
      .attr('data-width', $dataWidth)  //Set the target width
      .attr('data-aspectRatio', this.height / this.width);  //Set the video's aspect ratio
    fluidMediaResize(media);
  });
}
function fluidMediaResize(media){
  media.each(function(){
    var $el = $(this);
    $el  //Set the height and width of the element
			.attr('data-width', $(this).parent().width())
			.width($el.attr('data-width'))
			.height($el.attr('data-width') * $el.attr('data-aspectRatio'));
  });
}


/**
 * Lazy Loading
 * 
 * Don’t load embedded YouTube content until user clicks on it.
 */
$(".lazy-load").click(function(e){
	e.preventDefault();  //Disable the link
	var src = $(this).attr("href").split("="),  //Get the unique video ID from the URL
      width = $(this).width(),  //Get the dimensions of the current block for a seamless replacement
      height = $(this).height(),
      embededMedia = $("<iframe width='" + width + "' height='" + height + "' src='//www.youtube-nocookie.com/embed/" + src[1] + "?autohide=1&autoplay=1&rel=0' frameborder='0' allowfullscreen></iframe>");
      //autohide hides the player controls, autoplay allows one-click video access, rel disables related content
	$(this).replaceWith(embededMedia);  //Replace the link with the video
  $allVideos = $("iframe[src*='//player.vimeo'], iframe[src*='//www.youtube'], object, embed");  //Get all videos again (with new video added in)
  fluidMedia(embededMedia);  //Make it fluid for responsiveness!
});

/**
 * Document is fully loaded
 */
$(document).ready(function(){
	/**
	 * Random Rotation
	 * 
	 * Randomly rotate illustrations within a range.
	 */
	$("img[class|='image'], img[class|='illus']").each(function(index){
	  var degN = Math.random() * (illusRotationRange * 2) - illusRotationRange;
	  //console.log(index + ": " + degN + " degrees");
	  $(this).css("transform", "rotate(" + degN + "deg)");
	});
	
	/**
	 * Alert
	 *
	 * Show timely and important information.
	 */
	var alertURL = "/_inc/js/alert.txt";
	$.get(alertURL, function(message){
		if(message !== ""){
		  $("#sitewide-alert").addClass("alert").append(message);
		}
	});
	
  /**
   * Run the fluidMedia function on all embeded content
   */
  window.$allVideos = $("iframe[src*='//player.vimeo'], iframe[src*='//www.youtube'], object, embed");  //Get all videos
  fluidMedia($allVideos);
	
	/**
	 * Window Resizing
	 */
	$(window).resize(function(){
		//setTertiaryNav();
		//Maintain aspect ratio during screen resizing
		fluidMediaResize($allVideos);
	});
});