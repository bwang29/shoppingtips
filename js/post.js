$(document).ready(function() {
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
    })
    $('#tags_wrap').click(function() {
        $('#tags').focus();
    });
    $('#tags').keydown(function(e) {
        if (e.keyCode == 188) { // comma
            var new_tag_str = $(this).text();
            if (!new_tag_str) return;
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
});
