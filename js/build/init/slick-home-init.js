$(document).ready(function(){
    $('#upcoming-events-list').slick({
        accessibility: true,
        arrows: true,
        dots: true,
        infinite: false,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 511,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 687,
                settings: {
                    slidesToShow: 5
                }
            },
            {
                breakpoint: 1119,
                settings: "unslick"
            }
        ]
    });
});