window.onload = function (){
	(function($) {

		$('#requestnewtask')[0].addEventListener('click', function() {
			data = {'name': $("#reqname").val(), 'task': $("reqtask").html()};
			//todo: add location data, user id
			$.post('https://noveria.nl/hlp/index.php', data, function(data) {
				document.location='/index.html';
			});
			return false;
		});

	})(jQuery);
};