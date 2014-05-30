window.onload = function (){
	(function($) {

		$('#requestnewtask').on('click', function() {
			data = {'type': 'request',
			 'name': $("#reqname").val(),
			  'task': $("reqtask").html(),
			  'uid': '123',
			   'lat': 53.345,
				'lon': 5.156};
			
			console.log(data);
			$.post('https://noveria.nl/hlp/index.php', data, function(data) {
				document.location='/index.html';
			});
			return false;
		});

	})(jQuery);

};
global_requests = [];
function getAllRequests() {
		$.get('https://noveria.nl/hlp/index.php', {'type': 'getRequests'}, function(requests) {
			global_requets = requests;
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

function gotoTask(nr) {
	document.location = '/taskdetails.html#' + nr;
}

function showTaskDetails() {
	taskid = document.location.hash.replace("#", "");
	$.get('https://noveria.nl/hlp/index.php', {'type': 'getSingleRequest', 'id': taskid}, function(request) {
		$("#dettask").html(request['task']);
		$("#detname").html(request['name']);
	}, "json");
}