<?php
header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
$PDO = new PDO('mysql:host=localhost;dbname=sketchscreen', 'sketch', 'sketchpass123');

if(isset($_POST['type']) && $_POST['type'] == 'request') {
	$stmt = $PDO->prepare("INSERT INTO requests (uid, name, task, latitude, longitude, timestamp) VALUES (:uid, :name, :task, :lat, :lon, UNIX_TIMESTAMP())");
	$stmt->execute(array('uid' => $_POST['uid'], 'name' => $_POST['name'], 'task' => $_POST['task'], 'lat' => $_POST['lat'], 'lon' => $_POST['lon']));
}

else if(isset($_REQUEST['type']) && $_REQUEST['type'] == 'getRequests') {
	$stmt = $PDO-> prepare("SELECT * FROM requests where acceptUID IS NULL OR acceptUID = '' ORDER BY timestamp DESC");
	$stmt->execute();

	$res = $stmt->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode($res);
}
else if(isset($_REQUEST['type']) && $_REQUEST['type'] == 'getMyRequests') {
	$stmt = $PDO-> prepare("SELECT * FROM requests WHERE uid=:uid ORDER BY timestamp DESC");
	$stmt->execute(array('uid' => $_REQUEST['uid']));

	$res = $stmt->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode($res);
}
else if(isset($_REQUEST['type']) && $_REQUEST['type'] == 'doFeedback') {
	$stmt = $PDO->prepare("UPDATE requests SET feedback = :feedback WHERE id=:id");
	$stmt->execute(array('id' => $_REQUEST['id'], 'feedback' => $_REQUEST['feedback']));
}
else if(isset($_REQUEST['type']) && $_REQUEST['type'] == 'getSingleRequest') {
	$stmt = $PDO-> prepare("SELECT * FROM requests WHERE id=:id ");
	$stmt->execute(array('id' => $_REQUEST['id']));

	$res = $stmt->fetch(PDO::FETCH_ASSOC);

	echo json_encode($res);
}
else if(isset($_REQUEST['type']) && $_REQUEST['type'] == 'acceptTask') {
	$stmt = $PDO-> prepare("UPDATE requests SET acceptedBy =:user, acceptUID=:acceptUID WHERE id=:id ");
	$stmt->execute(array('id' => $_REQUEST['id'], 'user' => $_POST['user'], 'acceptUID' => $_POST['acceptUID']));

	$res = $stmt->fetch(PDO::FETCH_ASSOC);

	echo json_encode($res);
}
?>