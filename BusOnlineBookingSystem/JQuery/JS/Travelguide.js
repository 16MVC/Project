$(function () {
    $(".menu").hover(
		function () {
		    $(this).find("div").stop(true, true).animate({ height: 'show' }, 400);
		},
		function () {
		    $(this).find("div").fadeOut(400);
		});
})