// $(function () {
//   $(document).scroll(function () {
//
//     var $nav = $(".navbar");
//     $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
//   });
// });

$(function () {
  $(document).scroll(function () {
    $(".navbar").toggleClass('scrolled', $(this).scrollTop() > $(".navbar").height());

  });
});
// $("h1").css("color", "red");
// $( window ).scroll(function() {
//   if($(this).scrollTop() > $(".navbar").height()){
//       $( ".navbar" ).toggleClass("scrolled")
//   }
//
// });
// $("body").scroll(function(){
//   $(".navbar").toogleClass("scrolled",$(this).scrollTop > $(".navbar").height())
// })
// .navbar {
//   background: transparent !important
// }
// .navbar-brand{
//   color: white;
// }
// .nav.navbar-nav.navbar-right li a {
//     color: white;
// }
