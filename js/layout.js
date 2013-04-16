var data_loves, data_loves_limited, data_products;
var data_products_buildable;
$(document).ready(function(){
	init_data(30); // limit to 30 messages
	init_layout();
})

function init_data(limit){
	data_loves = new Firebase('https://shopwithme.firebaseIO.com/loves');
	data_products = new Firebase('https://shopwithme.firebaseIO.com/products');
	data_loves_limited = data_loves.limit(limit);
}

function init_layout(){
	var layout = $("#site_frame").html();
	var layout_template = Handlebars.compile(layout);
	var layout_html = layout_template({site_name:"Shopping Tips!"});
	$("body").append(layout_html);
	setTimeout(attach_data_listeners.bind(),0);
	setTimeout(attach_ui_listeners.bind(),0);
}

function attach_data_listeners(){
	data_loves_limited.on('value', function(snapshot) {
		var loves = snapshot.val();
		$(".user_loves").empty();
		for(key in loves){
			build_loves(loves[key]);
		}
	});
	data_products.once('value', function(snapshot) {
		data_products_buildable = snapshot.val();
		$(".search_loves").attr({"placeholder":"Search..","disabled":false}).focus();
	});
}

function build_loves(love_data){
	//console.log(love_data);
	var love = $("#love").html();
	var love_template = Handlebars.compile(love);
	var love_html = love_template(love_data);
	$(".user_loves").prepend(love_html);
}

function attach_ui_listeners(){
	$(".submit_btn").click(function(){
		$(".submit_error").slideUp();
		var d = {
			user_name: $(".my_name").val().trim(),
			user_product_attribute: $(".product_attribute").val().trim(),
			user_product_better: $(".product_better").val().trim(),
			user_product_worse: $(".product_worse").val().trim(),
			user_product_reason: $(".product_reason").val().trim()
		};
		for(key in d){
			if(d[key] == ""){
				$(".submit_error").html("All fields above are required...").slideDown();
				return;
			}
		}
		var p = data_loves.push(d,function(){
			data_products.child(d.user_product_worse).push(p.path.m[1]);
			data_products.child(d.user_product_better).push(p.path.m[1]);
		});
		$(".submit_love input").val("");
		$(".submit_love textarea").val("");
	});

	$(".search_loves").keydown(function(e){
		if(e.which == 13){
			show_search_res($(".search_res")[0]);
			return;
		}
		$(".search_results").empty();
		var query = $(".search_loves").val();
		if(query.length < 1) return;
		var search_matches = [];
		for(key in data_products_buildable){
			if((key.toLowerCase()).indexOf(query.toLowerCase())!= -1){
				search_matches.push(key)
			}
		}
		for(var i=0; i< search_matches.length; i++ ){
			$(".search_results").append("<div class='search_res'>"+search_matches[i]+"</div>");
		}
		$(".search_res").unbind().click(function(){
			show_search_res(this);
		});
	});
}

function show_search_res(context){
	$(".search_results").empty();
	$(".user_loves").empty();
	var d = data_products_buildable[$(context).text()];
	for(var key in d){
		var dataRef = (new Firebase('https://shopwithme.firebaseIO.com/loves/'+d[key])).once('value', function(snapshot) {
		  		build_loves(snapshot.val());
		});
	}
}
