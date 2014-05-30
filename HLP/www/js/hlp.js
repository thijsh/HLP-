window.onload = function (){
	(function($) {

		$('#requestnewtask').on('click', function() {
			data = {'type': 'request',
			 'name': $("#reqname").val(),
			  'task': $("#reqtask").val(),
			  'uid': app.uinqueID(),
			   'lat': $("#latitude").val(),
				'lon': $("#longitude").val()};
			
			console.log(data);
			$.post('https://noveria.nl/hlp/index.php', data, function(data) {
				document.location='index.html';
			});
			return false;
		});

		$("#sendfeedback").on('click', function() {
			data = {
				type: 'doFeedback',
				id: document.location.hash.replace("#", ""),
				feedback: $("#feedback").val()
			}
			console.log(data);
			$.post('https://noveria.nl/hlp/index.php', data, function(data) {
				document.location='index.html';
			});
			return false;

		});

		$("#accepttask").on('click', function() {
			data = {
				type: 'acceptTask',
				id: document.location.hash.replace("#", ""),
				user: $("#acceptusername").val(),
				acceptUID: app.uinqueID()
			};
			console.log(data);
			$.post('https://noveria.nl/hlp/index.php', data, function(data) {
				document.location='index.html';
			});
		});
	})(jQuery);

};

function getAllRequests() {
		$.get('https://noveria.nl/hlp/index.php', {'type': 'getRequests'}, function(requests) {
			parent = $("#opentasks");
			parent.empty();
			for(r in requests) {
				//do something with
				parent.append('<div class="listrequest" data-taskid="'+ requests[r].id +'">'+
					'task: <b>'+ requests[r].task +'</b><br />'+
					'by: <b>'+ requests[r].name + '</b>'+
					'</div>');
				requests[r];
			}
			$(".listrequest").on('click', function() {
				gotoTask($(this).data('taskid'));
			});
		}, 'json');
	}

function getMyRequests() {
		$.get('https://noveria.nl/hlp/index.php', {'type': 'getMyRequests', 'uid': app.uinqueID()}, function(requests) {
			parent = $("#myrequests");
			parent.empty();
			for(r in requests) {
				//do something with
				f_class = 'no-feedback';
				if(requests[r].feedback != '') {
					f_class = 'has-feedback';
				}
				else if(requests[r].acceptUID != null) {
					f_class = 'acceptedTask';
				}
				if(requests[r].acceptedBy == '' || requests[r].acceptedBy == null) {
					requests[r].acceptedBy = '<i>no-one yet</i>';
				}
				parent.append('<div class="listmyrequests '+ f_class +'" data-taskid="'+ requests[r].id +'">'+
					'task: <b>'+ requests[r].task +'</b><br />'+
					'accepted by: <b>'+ requests[r].acceptedBy + '</b>'+
					'</div>');
				requests[r];
			}
			$(".listmyrequests.acceptedTask").on('click', function() {
				gotoFeedback($(this).data('taskid'));
			});
		}, 'json');
}

function gotoTask(nr) {
	document.location = 'taskdetails.html#' + nr;
}

function showTaskDetails() {
	taskid = document.location.hash.replace("#", "");
	$.get('https://noveria.nl/hlp/index.php', {'type': 'getSingleRequest', 'id': taskid}, function(request) {
		$("#dettask").html(request['task']);
		$("#detname").html(request['name']);
		app.compareLocation(request['latitude'], request['longitude']);
	}, "json");
}

function gotoFeedback(id) {
	document.location = 'taskfeedback.html#' + id;
}

function showFeedbackForm() {
	taskid = document.location.hash.replace("#", "");
	$.get('https://noveria.nl/hlp/index.php', {'type': 'getSingleRequest', 'id': taskid}, function(request) {
		$("#dettask").html(request['task']);
		$("#detname").html(request['acceptedBy']);
		console.log(request);
	}, "json");
}