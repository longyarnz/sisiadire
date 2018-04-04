<?php
	namespace DB;
	use mysqli;
	class user_connect
	{
		public $connect;
		public $test;
		
		function __construct($credentials)
		{
			$this->connect = new mysqli(...$credentials);
			if($this->connect->connect_error){
				$this->test = false;
			}
			else{
				$this->test = true;
			}
		}

		function __tostring(){
			return $this->test;
		}
	}
?>