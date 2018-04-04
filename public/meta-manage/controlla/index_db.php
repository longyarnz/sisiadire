<?php 
	namespace controlla;
	require_once 'autoload.php';
	
	use DB\Models;
	use DB\user_upload;
	use DB\console;
	session_start();
	
	try{
		['type' => $type] = $_REQUEST;
		['database' => $db, 'uploads' => $path] = parse_ini_file('../config/config.ini');
	}
	catch(\Exception $e){
		console::append($e.date("Y/m/d h:i:sa").'\r\n', 'error.log');
		echo "Error: Invalid Access Codes";
		exit();		
	}
	
	if ($type == "access") {
		try{
			$_SESSION['connect'] = null;
			$url = $_REQUEST["input_3"];
			$user = $_REQUEST["input_1"];
			$pass = $_REQUEST["input_2"];
			$credentials = array($url, $user, $pass, $db);
			$DB = new Models($credentials);
			$_SESSION['connect'] = $credentials;
			echo json_encode($DB->store);
		}
		catch(\Exception $e){
			console::append($e.date("Y/m/d h:i:sa").'\r\n', 'error.log');
			echo "Error: Invalid Access Codes";
			exit();		
		}
	}
	elseif($type == "insert"){
		$table = $_REQUEST['table'];
		$missile = json_decode($_REQUEST['missile']);
		$DB = new Models($_SESSION['connect']);
		$result = $DB->$table->create($missile);
		foreach ($_FILES as $key => $value) {
			$upload = new user_upload($value, $path);
		}
		echo json_encode(array_reverse($result));
	}
	elseif($type == "recess"){
		$_SESSION['connect'] = null;
		session_destroy();
		echo "Enter Access Codes";
	}
	elseif($type == "update"){
		$missile = json_decode($_REQUEST['missile']);
		$table = $missile[0];
		$column = $missile[1];
		$value = $missile[2];
		$id = $missile[3];
		$DB = new Models($_SESSION['connect']);
		$result = $DB->$table->update([$column, $value], ['id', $id]);
		foreach ($_FILES as $key => $value) {
			$upload = new user_upload($value, $path);
		}
		echo json_encode($result);
	}
	elseif($type == "delete"){
		$missile = json_decode($_REQUEST['missile']);
		$table = $missile[0];
		$id = $missile[3];
		$DB = new Models($_SESSION['connect']);
		$result = $DB->$table->delete('id', $id);
		echo json_encode($result);
	}
	elseif($type == "fetch"){
		$table = $_REQUEST["table"];
		$DB = new Models($_SESSION['connect']);
		$result = $DB->$table->findAll();
		$result = is_null($result) ? [] : $result;
		echo json_encode(array_reverse($result));
	}
?>