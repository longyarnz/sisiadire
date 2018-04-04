<?php
	function __autoload($class){
		$class = str_replace('\\', '/', $class);
		$class = $_SERVER["DOCUMENT_ROOT"]."/controlla/".$class.".php";
		require_once($class);
	}
?>