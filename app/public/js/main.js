$(function () {
    "use strict";
    $(".preloader").fadeOut();
    $(".sidebar").sideNav({
        edge: "left"
    });
    $(".slider-slide").owlCarousel({
        items: 1,
        slideSpeed: 1000,
        dots: true,
        paginationSpeed: 400,
        singleItem: true,
        loop: true,
        autoplay: true,
        margin: 10
    });
    $(".modal").modal();
    $(".testimonial-slide").owlCarousel({
        items: 1,
        loop: false
    });
});