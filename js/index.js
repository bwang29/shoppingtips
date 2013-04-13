

function build_postings(){
	var posting = $("#site_posting").html();
	var posting_template = Handlebars.compile(posting);
	for(var i=0; i<20; i++){
		var posting_html = posting_template({
			user_name:"Borui Wang",
			description:"Let's hack smoething really cool tonight! I want  to buld a search engine like google and a social platform like facebook",
			tags:["nodejs","rails","hot girls"],
			time:jQuery.timeago(new Date())
		});
		$(".container").append(posting_html);
	}
}

function build_post_form(){
	var post_form = $("#site_post").html();
	var post_form_template = Handlebars.compile(post_form);
	var post_form_html = post_form_template();
	$(".post_form .form").html(post_form_html);
	setTimeout(bind_post_form.bind(),0);
}

function bind_post_form(){
	var make_tag = function(text) {
        var d = $('<div class="tag">'+text+'<div class="remove_tag" onclick="$(this).parent().remove();">x</div></div>');
        return d;
    }
    $(document).keydown(function(e) {
        if (e.keyCode == 8) { // backspace
            if (!$('input, textarea, #tags').is(':focus')) {
                e.preventDefault();
            }
        }
    });
    $('#tags_wrap').click(function() {
        $('#tags').focus();
        e.preventDefault();
    });
    $('#tags').keydown(function(e) {
        if (e.keyCode == 188) { // comma
            var new_tag_str = $(this).text();
            if (!new_tag_str) {
                e.preventDefault();
                return;
            }
            $(this).text('');
            var new_tag = make_tag(new_tag_str);
            $(this).before(new_tag);
            e.preventDefault();
        } else if (e.keyCode == 8) { // Backspace
            if ($(this).text() == '') {
                $(this).prev().remove();
            }
        }
    });
    $('#submit').click(function() {
        var obj = {
        };
    });
}
