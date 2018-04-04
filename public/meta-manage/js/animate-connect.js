var META = {
	EndPoint: "controlla/index_db.php",
	Parse: function(server){
		var tableList = this.GetProps(server);
		for (var i = 0;i < tableList.length; i++) {
			var j = i + 1;
			var app = $("nav ul li:first").clone(true);
			app.find("a").attr({"data-nav" : "nav-"+tableList[i]}).html("<span>*</span>"+tableList[i]);
			$("nav ul li:last").before(app);
	
			var block = $("div.block-content:first").clone();
			block.removeClass("poster").addClass("no-display");
			block.attr({"data-id": "a" + j}).attr({"data-nav" : "nav-" + tableList[i]});
			block.find("div.block div").not(".ajax-result").remove();
			block.find("h1").text(tableList[i]);
			form = block.find("form");
			form.find("[data-input], div:has(button)").remove();
			form.attr("role", "data-form").removeClass("dim-opacity");
			form.prepend("<div><a class='btn retrieve'>Retrieve From Database</a></div>");
	
			var m = 1;
			var table = server[tableList[i]]['data_type'];
			var dataDiv = this.GetProps(table).length;
	
			for (var x in table){
				var div = $("<div></div>").attr("data-input", m).attr("data-div", dataDiv);
				var label = $("<label></label>").text(x);
				var deleteLabel = $("<label class='no-display' data-function='delete'>Delete</label>");
				var span = $("<span class='no-display'></span>");
				var updateLabel = $("<label class='no-display' data-function='update'>Update</label>");
				var input = $("<input required />");
				var ext = x.lastIndexOf("_");
				var slice;

				if (table[x] == "text" || table[x] == "varchar") {
					input.attr("type", "text");
				}
				else if (table[x].lastIndexOf('int') !== -1){
					input.attr("type", "number");
				}
				else if (table[x] == "longtext" || table[x] == "mediumtext"){
					input = $("<textarea required rows='5'></textarea>");
				}
				if (ext != -1) {
					slice = x.slice(ext);
					if (slice == "_file") {
						input.attr("type", "file").attr("data-file", "");
					}
					else if(x == "_email" || x.lastIndexOf('email')){
						input.attr("type", "email");
					}
					else if(slice == "_pass"){
						input.attr("type", "password");
					}
					else if (slice == "_area") {
						input = $("<textarea required rows='5'></textarea>");
					}
				}
				if(x.lastIndexOf('Email') !== -1){
					input.attr("type", "email");
				}

				input.attr("name", x).attr("placeholder", "Enter "+x).attr("data-input", m);
				div.append(label).append(updateLabel).append(deleteLabel).append(span).append(input);
				form.append(div);
				m++;
			}
	
			form.append(
				'<div><button type="submit" role="submit">Submit</button><button role="plus">'+
				'<i class="fa fa-plus"></i></button><button role="minus"><i class="fa fa-minus"></i></button></div>'
			);
			$("div.block-content:last").after(block);
			form.append('<div class="ajax-background"><span></span><div class="ajax-progress"></div></div>');
		}
	
		$("button[role='plus']").click(function(e){
			e.preventDefault();
			var html, hr = "<hr>";
			var parent = $("form").has(this);
			var counter = parseInt(parent.find("[data-input]:last").attr("data-input"));
			var data = parseInt(parent.find("[data-input]:last").attr("data-input"));
			var div = parseInt(parent.find("div[data-div]").attr("data-div"));
			var num = (data / div) + 1;
			parent.find("div[data-input]:last").after(hr);
	
			for(var i=div;i>=1; i--){
				var count = counter + i;
				html = parent.find("div[data-input='"+i+"']").clone();
				html.attr("data-input", count);
				html.find("[data-input]").attr("data-input", count);
				html.find("label").not("[data-function]").append(" "+num);
				html.find("input, textarea").val("");
				html.find("textarea").text("");
				parent.find("hr:last").after(html);
			}
			return html;
		})
	
		$("button[role='minus']").click(function(e){
			e.preventDefault();
			var parent = $("form").has(this);
			var data = parseInt(parent.find("div[data-input]:last").attr("data-input"));
			var div = parseInt(parent.find("div[data-div]").attr("data-div"));
			var num = data - div - 1;
			if(num > 0){
				parent.find("div[data-input]:gt("+num+"), hr:last").remove();
			}
		})
	
		$("a.retrieve").click(async function(e){
			e.preventDefault();
			var parent = $("div.block").has(this);
			var form = parent.find("form").has(this);
			var dataDiv = parseInt(form.find("div[data-div]").attr("data-div")) - 1;
			form.find("hr, div[data-input]:gt("+dataDiv+")").remove();
			var buttonText = $(this).text();
			var table = parent.find("h1:first").text();
			var stop = table.indexOf(" ");
			table = stop > 0 ? table.slice(0, stop) : table;
			parent.find("h1:first").text(table);
			if (buttonText == "Retrieve From Database") {
				var server = await META.FetchTableData(table);
				var data = server[table]['data'];
				var column = META.GetProps(server[table]["data_type"]);
				var length = data.length;
				if(length === 0){
					$("form").find("a.retrieve").text("Send To Database").trigger("click");
					return;
				}
				parent.find("h1:first").append("<span> ("+length+"x)</span>");
		
				for (var i = 0; i < length; i++) {
					if (i > 0){
						form.find("button[role='plus']").trigger("click");
					}
					for (var x in data[i]) {
						var j = (dataDiv + 1) * i;
						if (i == 0 && x == column[0]) {
							var label = form.find("div[data-input]:eq("+i+")");	
						}
						else{
							var label = form.find("div[data-input]:eq("+j+"), div[data-input]:gt("+j+")");
						}
						label.find("label").each(function(index){
							var id = data[i].id, value = data[i][x];
							var labelText = $(this).text();
							var n = META.Capitalize(x);
							if(labelText.startsWith(n)){
								$(this).siblings("[data-function]").click(function(e){
									META.AddLabelEventlistener([ table, e.target, id ]);
								}).attr('data-column', x);
								$(this).siblings("[data-function], span").removeClass("no-display");
								$(this).siblings("input, textarea").not("input[type='file']").val(value).attr("data-file", value);
								$(this).siblings("textarea").text(value).attr("data-file", value);
								$(this).siblings("input[type='file']").attr("data-file", value).siblings("span").text(value);
								form.find("button").addClass("no-display");
							}
							else if(labelText === "Delete") {
								var a = parseInt($(this).parent().attr("data-input"));
								var b = parseInt($(this).parent().attr("data-div"));
								if(a % b != 1 && b != 1){
									$(this).remove();
								}
							}
						});
					}
				}
				$(this).text("Send To Database");
				form.find(".ajax-background").addClass("no-display");
			}
			else if(buttonText == "Send To Database"){
				$(this).text("Retrieve From Database");
				$("input, textarea").val("").attr("data-file", "");
				$("textarea").text("");
				form.find("[data-function], span").addClass("no-display");
				form.find("button, .ajax-background, .ajax-background span").removeClass("no-display");
			}
		})
		
		$("form[role='data-form']").submit(function(e){
			e.preventDefault();
			var DataForm = this;
			var i = 0, missile = [], payload = {};
			var Form = new FormData(this);
			var dataInput = $(this).find("[data-input]:last").attr("data-input");
			var limit = parseInt($(this).find("[data-div]").attr("data-div"));
			var table = $(this).siblings("h1").text();
			var column = META.GetProps(server[table]);
			for(var x of Form.keys()){
				var y = META.Capitalize(x, false);
				var o = Math.floor(i / limit);
				missile[o] = typeof missile[o] !== 'object' ? {} : missile[o];
				var input = Form.getAll(x)[o];
				if(x.lastIndexOf('_file') > -1) input = input.name;
				missile[o][y] = input;
				i++;
			}
			Form = new FormData();
			Form.append("missile", JSON.stringify(missile));
			Form.append("type", "insert");
			Form.append("table", table);
			if ($(this).has(":file")[0]) {
				$(this).find("input[type='file']").each(function(i){
					var name = this.name+' '+i;
					Form.append(name, this.files[0]);
				});
			}
			META.QueryDB({
				data: Form, 
				success: function(success){
					setTimeout(function(){
						$(".ajax-prog		ress").css("width", 0+"%");
						$(".ajax-background span").removeClass("white-color").text("Request Completed");
					}, 1000);
					$("div.update-bar").addClass("green");
					setTimeout(function(){
						$("div.ajax-progress, div.update-bar").css("width", "0%");
						$(DataForm).find("a.retrieve").trigger("click");
					}, 2000);
					META.StoreTableData(table, success);
				}
			})
		});
	},
	FetchTableData: async function(table) {
		var Bool = this.Fetch()[table]['done'];
		var result = !Bool ? new Promise(function(res, rej){
			$.ajax({
				url: META.EndPoint, method: "POST",
				data: {type : "fetch", table}, cache: false,
				beforeSend: function(){
					$('header h4 span').text('Loading Data From Server...');
				},
				success: function(data){
					data = JSON.parse(data);
					res(META.StoreTableData(table, data));
					$('header h4 span').text('Data Collection Complete');
				},
				error: function(){
					rej(META.Fetch());
				},
				complete: function(){
					$('header h4 span').text('Navigation Menu');
				}
			})
		}) : this.Fetch();
		return result;
	},
	StoreTableData: function(table, data){
		var server = this.Fetch();
		if(server[table]['done']){
			server[table]['data'] = data.concat(server[table]['data']);
		}
		else{
			server[table]['data'] = data;
			server[table]['done'] = true;
		}
		this.Store(server);
		return server;
	},
	BackupTableData: function(data){
		sessionStorage.history = JSON.stringify(data);
	},
	ClearGarbage: function(){
		sessionStorage.history = null;
	},
	RestoreBackup: function(){
		this.Store(sessionStorage.history);
		sessionStorage.history = null;
	},
	TemporaryUpdate: function(type, table, column, value, id){
		var server = this.Fetch(), unstable = server;
		type === "Update" && unstable[table]['data'].forEach(function(row) {
			row[column] = row.id === id ? value : row[column];
		});
		type === "Delete" && unstable[table]['data'].forEach(function(row, i) {
			row.id === id && unstable[table]['data'].splice(i, 1);
		});
		this.Store(unstable);
		this.BackupTableData(server);
	},
	Response: function(payload, location){
		var check = JSON.stringify(payload);
		if (check.search("Invalid") != -1) {
			location.text("Invalid Access Codes");
		}
		else{
			location.text("DB Connected");
			$("header").removeClass("no-display");
			$("form[role='access-form']").addClass("dim-opacity");
			setTimeout(function(){
				$("form[role='access-form']").addClass("no-display");
				$("div.notification").removeClass("no-display");
			}, 300);
			setTimeout(function(){
				$("div.notification").removeClass("dim-opacity");
			}, 350);
			this.Store(check);
			this.Parse(payload);
		}
	},
	Capitalize: function(word, letterCase = true){
		word.split("");
		if (letterCase) {
			var cap = word[0].toUpperCase();
		}
		else{
			var cap = word[0].toLowerCase();
		}
		for (var i = 1; i < word.length; i++) {
			cap += word[i];
		}
		return cap;
	},
	DeleteButton: function(object){
		var check;
		var dataDivo;
		var dataInput;
		var form = $("form[data-form").has(object);
		form.find("div[data-input]").each(function(){
			dataDivo = parseInt(form.find("[data-div]").attr("data-div"));
			dataInput = parseInt(form.find("div[data-input]").attr("data-input"));
			check = dataInput % dataDivo;
			if (check != 1) {
				$(this).find("label[data-function='delete']").remove();
			}
		});
	},
	GetProps: function(payload){
		var y = [], i = 0;
		for (var x in payload) {
			y[i] = x; i++;
		}
		return y;
	},
	Logout: function(payload, location){
		this.Store(null);
		this.ClearGarbage();
		setTimeout(function(){
			$(".block-content:not(:first)").remove();
			$(".block-content.poster").removeClass("no-display");
			location.text(payload);
			$("div.notification").addClass("dim-opacity");
			setTimeout(function(){
				$("form[role='access-form']").removeClass("no-display");
				$("div.notification").addClass("no-display");
			}, 500);
			setTimeout(function(){
				$("header").addClass("no-display");
				$("form[role='access-form']").removeClass("dim-opacity").find("[role='host']").val(window.location.hostname);
			}, 550);
			$("nav ul li").not("nav ul li:first, nav ul li:last").remove();
		}, 300);
	},
	Store: function(Json){
		Json = typeof Json === 'string' ? Json : JSON.stringify(Json);
		sessionStorage.meta = Json;
	},
	Fetch: function(){
		var store = sessionStorage.meta;
		return store !== null ? JSON.parse(store) : [];
	},
	AddLabelEventlistener: function(params){
		var Form = new FormData(), prev = 0;
		var label = params[1], value = 0, ref;
		var table = params[0], id = params[2];
		var column = $(label).attr('data-column');
		var type = META.Capitalize($(label).text(), false);
		$(label).siblings().each(function(){
			ref = $(this);
			prev = $(this).attr('data-file');
			if($(this).is('[type="file"]')) {
				value = $(this)[0].files[0];
				value && Form.append('file', value);
				value = value ? $(this)[0].files[0].name : prev;
			} 
			else value = $(this).val();
		});
		if(value === prev && type === 'update') return;
		var missile = JSON.stringify([table, column, value, id]);
		Form.append('type', type);
		Form.append('missile', missile);
		type = META.Capitalize($(label).text());
		META.QueryDB({
			data: Form, success: function(data){
				$("header h4 span").text(type+" Complete");
				type === "Delete" && $("form").has(ref).find("a.retrieve").text("Retrieve From Database").trigger("click");
			}, before: function(){
				$("header h4 span").text(+type+"ing Data...");
				META.TemporaryUpdate(type, table, column, value, id);
				!ref.is(":file") ? ref.val(value).text(value) : ref.siblings("span").text(value);
			}, done: function(){
				$("header h4 span").text("Navigation Menu");
				type === "Delete" && $("form").has(ref).find("a.retrieve").text("Send To Database");
				type === "Delete" && $(".ajax-background span").text("Request Completed").removeClass("white-color");
				META.ClearGarbage();
			}, error: function(){
				var text = type+" failed, please reload your browser and try again with better network or contact Lekan";
				ref.siblings("span").text(text).css("color", "red");
				META.RestoreBackup();
			}
		})
	},
	QueryDB: function(M){
		$.ajax({
			xhr: function(){
				var xhr = new XMLHttpRequest()  || new ActiveXObject("Microsoft.XMLHTTP");
				xhr.upload.addEventListener("progress", function(e){
					if(e.lengthComputable){
						var width = e.loaded / e.total * 100;
						width -= width % 1;
						$(".ajax-progress, div.update-bar").css("width", width+"%").text("");
						$(".ajax-background span").text("Sending Data "+width+"%");
						if (width > 45) {
							$(".ajax-background span").addClass("white-color");
						}
						if (width => 100) {
							$(".ajax-background span").text("Processing Data...");
						}
					}
				});
				return xhr;
			}, 
			url: META.EndPoint, method: "POST", beforeSend: M.before, data: M.data,
			contentType : false, processData : false, cache: false, dataType: "json",
			context: M.context, success: M.success, error: M.error, complete: function(){
				$("div.ajax-progress, div.update-bar").css("width", "0%"); M.done && M.done();
			}
		})	
	}
}

$(document).ready(function(){
	$("form[role='access-form']").submit(function(e){
		e.preventDefault();
		if (accessCount == 0){
			accessCount = 1;
			var collect = new FormData(this);
			var length = $(this).find("div[data-input]:last").attr("data-input");
			collect.append("type", "access");
			collect.append("length", length);
			collect.set("input 3", location.hostname);
			META.QueryDB({
				context: $("div.ajax-result"),
				before: function(){
					$("h1:first").text("Connecting...");
				}, data: collect,
				success: function(success){
					META.Response(success, $("h1:first"));
					$(".ajax-background span").text("Request Completed");
					setTimeout(function(){
						$(".ajax-progress").css("width", 0+"%");
						$(".ajax-background span").removeClass("white-color");
					}, 1000);
				},
				done: function(){ accessCount = 0 }
			});
		}		
	});
	
	$("a[data-nav='logout']").click(function(e){
		e.preventDefault();
		$.ajax({
			url: META.EndPoint, method: "POST", 
			data: {type : "recess"}, cache: false,
			success: function(success){
				META.Logout(success, $("h1:first"));
			}
		});
	})
})