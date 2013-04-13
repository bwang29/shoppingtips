

function build_postings(){
	var posting = $("#site_posting").html();
	var posting_template = Handlebars.compile(posting);
	for(var i=0; i<20; i++){
		var posting_html = posting_template({
			user_name:"Borui Wang",
			description:"Let's hack smoething really cool tonight! I want  to buld a search engine like google and a social platform like facebook",
			tags:["nodejs","rails","hot girls"]
		});
		$(".container").append(posting_html);
	}
}