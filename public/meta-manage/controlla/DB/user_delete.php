<?php
	namespace DB;
	class user_delete
	{
		protected $check;
		protected $bind;
		public $sql;
		public $result;

		function __construct($credentials, $model, $column, $value){
			$column = validate::escape($column);
			$value = validate::escape($value);
 			$this->check = new user_connect($credentials);
			$this->sql = "DELETE FROM $model WHERE `$column` = ?";
 			$this->bind = $this->check->connect->prepare($this->sql);
			$this->bind->bind_param('s', $value);
			$this->bind->execute();
			$this->result = $this->check->connect->affected_rows;
		}

 		function delete($credentials, $model, $options){
			$model = validate::escape($model);
			filter_var_array($options, FILTER_SANITIZE_MAGIC_QUOTES);
			$length = count($options);
 			$where = "";
 			for ($i = 0; $i < $length; $i++) {
 				if ($i == 0 || $i % 2 == 0) {
 				 	$where = $where."`$options[$i]` = '".$options[$i + 1]."'";
 				}
 				elseif($i % 2 == 1 && $length - $i != 1){
 					$where = $where." AND ";
 				}
 			}
 			$this->check = new user_connect($credentials);
 			$this->sql = "DELETE FROM `$model` WHERE $where";
 			$this->bind = $this->check->connect->prepare($this->sql);
 			if(!$this->bind){
 		 		$this->result = false; 		 		
 		 	}
 		 	else{
	 			$this->bind->execute();
	 			$this->result = $this->check->connect->affected_rows;
				$this->result = $this->result > 0 ? true : false;
	 		}
	 		$this->check->connect->close();
		}
		 
		function __tostring() {
			return json_encode($this->result);
		}
	}
?>