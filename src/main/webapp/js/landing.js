function setup() {

   $(".button").css('opacity', '1');
      setTimeout(bringInMenu, 0);
      setTimeout(bringInAvo, 0);
}


function bringInMenu() {
   $("#logoHeader").css('opacity', '1');
   $("ul").css('opacity', '1');
   $("li a").css('opacity', '1');
   $(".menu").css('opacity', '1');
}

function bringInAvo() {
   $("#avoLove").css('opacity', '1');
}
















$(document).ready(setup);
