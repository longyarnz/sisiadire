<?php
	namespace DB;
	class user_update
	{
		protected $check;
		protected $bind;
		public $sql;
		public $result;
		public $col;
		protected $row;
		protected $ab;

		function update_batch($credentials, $model, $column, $options){
			$model = validate::escape($model);
			$column = validate::escape($column);
			filter_var_array($options[0], FILTER_SANITIZE_MAGIC_QUOTES);
			filter_var_array($options[1], FILTER_SANITIZE_MAGIC_QUOTES);
			$this->check = new user_connect($credentials);
 			$this->sql = "UPDATE `$model` SET `$column` = ? WHERE `$column` = ?";
 			$this->bind = $this->check->connect->prepare($this->sql);
 			if(!$this->bind){
 		 		$this->result = "Invalid Acess Codes";
 		 	}
 		 	else{
	 			for ($i=0; $i < count($options[1]); $i++) { 
		 			$this->bind->bind_param('ss', $options[$i], $options[$i]);
		 			$this->bind->execute();
					$this->row = $this->check->connect->affected_rows;
				}
				$this->result = $this->row > 0 ? true : false;
	 		}
	 		$this->check->connect->close();
 		}

 		function update_batch_schema($credentials, $model, $column, $options){
			$model = validate::escape($model);
			$column = validate::escape($column);
			$options[0] = validate::escape($options[0]);
			filter_var_array($options[1], FILTER_SANITIZE_MAGIC_QUOTES);
			$this->col = array();
			$num = count($options[1]);
 			$where = "";
 			$sss = "";
 			for ($i = 0; $i < $num; $i++) {
 				if ($i == 0 || $i % 2 == 0) {
 				 	$where = $where."`$options[1][$i]` = ?";
 				 	$sss = $sss.'s';
 				 	$this->col[0] = $sss;
 				 	$this->col[1] = &$options[0];
 				 	$this->col[] = &$options[1][$i + 1]; 
 				}
 				elseif($i % 2 == 1 && $num - $i != 1){
 					$where = $where." AND ";
 				}
 				elseif($num - $i == 1){
 					$sss = $sss.'s';
 					$this->col[0] = $sss;
 				}
 			}
 			$this->check = new user_connect($credentials);
 			$this->sql = "UPDATE `$model` SET `$column` = ? WHERE $where";
 			$this->bind = $this->check->connect->prepare($this->sql);
 			if(!$this->bind){
 		 		$this->result = "false 1"; 		 		
 		 	}
 		 	else{
	 			call_user_func_array(array($this->bind, 'bind_param'), $this->col);
 		 		$this->bind->execute();
	 			$this->result = $this->check->connect->affected_rows;
				$this->result = $this->result > 0 ? true : false;
	 		}
	 		$this->check->connect->close();
 		}

 		function update($credentials, $model, $column, $options){
 			$model = validate::escape($model);
 			filter_var_array($column, FILTER_SANITIZE_MAGIC_QUOTES);
 			filter_var_array($options, FILTER_SANITIZE_MAGIC_QUOTES);
			$this->check = new user_connect($credentials);
			$this->sql = "UPDATE `$model` SET `$column[0]` = ? WHERE `$options[0]`= ?";
 			$this->bind = $this->check->connect->prepare($this->sql);
			if(!$this->bind){
 		 		$this->result = "Invalid Acess Codes";
 		 	}
 		 	else{
	 			$this->bind->bind_param('ss', $column[1], $options[1]);
	 			$this->bind->execute();
				$this->result = $this->bind->affected_rows;
			}
			$this->check->connect->close();
 		}

 		function __tostring() {
 			return json_encode($this->result);
 		}
	}
?>