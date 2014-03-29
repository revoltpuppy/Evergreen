var rem = 16;  //value of 1 root em
var bWidth = document.documentElement.clientWidth; //browser width
var illusRotationRange = 2;  //how far in either direction an illustration can rotate, in degrees

/**
 * Slide components down from the top
 *
 * Fiddle with this: http://jsfiddle.net/Rtezs/2/
 */
/*$(function(){
	var $search = $("[role='search']"),
	$internalUsers = $(".internal-users"),
	$searchH = $search.outerHeight();
	$iuH = $internalUsers.outerHeight();
    //console.log("Search height: " + $searchH + ", Internal Users height: " + $iuH);
    
    $internalUsers.css("top", "-" + $iuH + "px");
    $search.css("top", "-" + $searchH + "px");
    
    function resetSearch(){
        $("body").removeClass("active-search");
        //console.log("Body classes: " + $("body").attr("class"));
        $search.css("top", "-" + $searchH + "px");
        $(".page-header").css("margin-top", $iuH + "px");
        //console.log("Search reset.");
    }
    function resetIU(){
        $("body").removeClass("active-internal-users");
        //console.log("Body classes: " + $("body").attr("class"));
        $internalUsers.css("top", "-" + $iuH + "px");
        $(".page-header").css("margin-top", $searchH + "px");
        //console.log("Internal Users reset.");
    }
    
    $('.search-toggle').click(function(e){
        e.preventDefault();
        if($("body").hasClass("active-search")){
        	resetSearch();
	        $(".page-header").css("margin-top", 0);
        } else{
	        $("body").removeClass("active-internal-users").addClass("active-search");
            //console.log("Body classes: " + $("body").attr("class"));
	        $search.css("top", 0);
            resetIU();
	    }
    });
    $('.student-toggle').click(function(e){
        e.preventDefault();
        if($("body").hasClass("active-internal-users")){
        	resetIU();
	        $(".page-header").css("margin-top", 0);
        } else{
	        $("body").removeClass("active-search").addClass("active-internal-users");
            //console.log("Body classes: " + $("body").attr("class"));
	        $internalUsers.css("top", 0);
            resetSearch();
	    }
    });
    $(window).resize(function(){
        resetSearch();
        resetIU();
        $(".page-header").css("margin-top", "");
    });
});*/

/**
 * setTertiaryNav
 *
 * Style the tertiary nav according to screen size.
 */
/*function setTertiaryNav(){
	var $tertiaryNavDls = $("#tertiary-nav").children("dl");
	console.log(bWidth);
	if(bWidth <= 69*rem){
		//if there is not an accordion, make one
		if(!$tertiaryNavDls.hasClass("accordion")){
			console.log(!$tertiaryNavDls.hasClass("accordion"));
		    $(".tertiary-nav-h").each(function(){
		         var text = $(this).contents().wrap("<a href='#'>");  //Wrap tertiary-nav-headers in links for accordion action.
		    });
		    $tertiaryNavDls.addClass("accordion");
		    console.log("Ready for accordion.");
		}
	} else{  //If the screen size is not small enough, be rid of the accordion
		$tertiaryNavDls.removeClass("accordion");
	    $("#tertiary-nav-toggle").addClass("tertiary-nav-h");
	}
};
setTertiaryNav();*/

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
 * pushFooter
 *
 * Push footer to the bottom when necessary.
 */
/*var wrapper = $(".wrapper");
var pageFooter = $(".page-footer");
var dh = $("body").height() - $(document).height();
function pushFooter(){
	if(dh > 0){
    	wrapper.css("margin-bottom", (dh + pageFooter.height()) + "px");
    }
}*/

/**
 * Fluid Multimedia
 * 
 * Fluid multimedia with default embed codes (makes things easy for content owners)
 * See: http://css-tricks.com/NetMag/FluidWidthVideo/demo.php
 */
/*$(function(){
	var $allVideos = $("iframe[src*='//player.vimeo'], iframe[src*='//www.youtube'], object, embed");  //Get all videos
	//$fluidEl = $("figure");
    
	$allVideos.each(function(){
		//Get the width of the containing element
        $dataWidth = $(this).parent().width();
		$(this)
			//jQuery .data does not work on object/embed elements
			.attr('data-width', $dataWidth)  //Set the target width
			.attr('data-aspectRatio', this.height / this.width)  //Set the video's aspect ratio
			.removeAttr('height')  //Remove any explicitly specified height and width attributes
			.removeAttr('width');
	});
	$(window).resize(function(){
		$allVideos.each(function(){
			var $el = $(this);
			//console.log($el.attr('data-width'));
			$el  //Set the height and width of the element
				.attr('data-width', $(this).parent().width())
				.width($el.attr('data-width'))
				.height($el.attr('data-width') * $el.attr('data-aspectRatio'));
		});
	}).resize();
});*/

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
};
function fluidMediaResize(media){
  media.each(function(){
    var $el = $(this);
    $el  //Set the height and width of the element
			.attr('data-width', $(this).parent().width())
			.width($el.attr('data-width'))
			.height($el.attr('data-width') * $el.attr('data-aspectRatio'));
  });
};


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
	//pushFooter();  //Push the footer when the page loads.
	/*$(window).resize(pushFooter);*/  //Also if the browser window is resized.
    
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
		if(message != ""){
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