

function build_postings(){
	var posting = $("#site_posting").html();
	var posting_template = Handlebars.compile(posting);
	ws.makeGenericGetRequest(root_url+"projects",function(data){
		console.log(data);
		for(var key in data){
			var posting_html = posting_template({
				user_name:data[key].username,
				description:data[key].description,
				tags:data[key].tags,
				time:jQuery.timeago(data[key].created),
				location:data[key].location,
				user_email:data[key].user_email
			});
			$(".container").append(posting_html);
		}
	});
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
    $('#tags_wrap').unbind().click(function(e) {
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
    $('#submit').unbind().click(function() {
        var targetUrl = root_url + '/projects/project_new';
        var description_unsafe = $('#description').val();
        var location_unsafe = $('#location').val();
        var email_unsafe = $('#email').val();
        var tags_unsafe = [];
        $('#tags_wrap .tag').each(function(t) {
            var str = $(this).text();
            str = str.substring(0, str.length - 1);
            tags_unsafe.push(str);
        });

        var postInstance = {
            description: description_unsafe,
            location: location_unsafe,
            user_id: Math.random() * 50 | 0 + 100,
            username: 'anonymous user',
            user_email: email_unsafe,
            user_image: '/images/joe_mama.jpg',
            tags: tags_unsafe
        }

        ws.makeGenericPOSTRequest(targetUrl, postInstance, function (data) {
            //if (data[0] == 'ok') {
                $('.post_form .form').html('<h1>Submission Succeeded</h1>');
                setTimeout(function() {
                    $('.post_form').slideUp(300, build_post_form.bind());
                }, 2000);
            //}
        })
    });
}
