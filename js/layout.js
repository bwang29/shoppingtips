$(document).ready(function(){
	init_layout();
})

function init_layout(){
	var layout = $("#site_frame").html();
	layout_template = Handlebars.compile(layout);
	layout_html = layout_template({site_name:"Hack with me"});
	$("body").append(layout_html);
}