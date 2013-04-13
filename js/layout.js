$(document).ready(function(){
	init_layout();
})

function init_layout(){
	var layout = $("#site_frame").html();
	var layout_template = Handlebars.compile(layout);
	var layout_html = layout_template({site_name:"Hack with me"});
	$("body").append(layout_html);
	setTimeout(build_postings.bind(),0);
	setTimeout(function(){
		$(".post_new").click(function(){
			$(".post_form").slideDown();
		});
	},0);
	setTimeout(build_post_form.bind(),0);
}