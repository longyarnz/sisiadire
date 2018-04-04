<?php
	namespace DB;
	use mysqli_stmt;
	use ReflectionClass;
	class user_insert
	{
		protected $check;
		protected $bind;
		protected $sql;
		public $result = 0;
		public $row;

		function __construct($credentials, $model, $fields, $values){
			try{
				$values = $this->mutate($values);
				$IsValuesArray = is_array($values);
				$model = validate::escape($model);
				$this->check = new user_connect($credentials);
				filter_var_array($fields, FILTER_SANITIZE_MAGIC_QUOTES);
				filter_var_array($values, FILTER_SANITIZE_MAGIC_QUOTES);					
				$FieldLength = count($fields);
				$ValuesArrayLength = $IsValuesArray ? count($values) : 1;
				for ($i=0; $i < $ValuesArrayLength; $i++) { 
					$arr = array(); $e = ""; $f = "";
					for ($j=0; $j < $FieldLength; $j++) { 
						$e = $e."?, "; $f = $f."s";
						$k = ($FieldLength * $i) + $j;
						if($IsValuesArray) $arr[$j] = &$values[$i][$j];
						else {
							$store = array_values($values[$i]);
							$arr[$j] = &$store[$j];
						}
					}
					$e = chop($e, ", ");
					$l = implode(", ", $fields);
					array_unshift($arr, $f);
					$this->sql = "INSERT INTO `$model` ($l) VALUES($e)";
					$this->bind = $this->check->connect->prepare($this->sql);
					if(!$this->bind) $this->result = "e99";
		 		 	else{
						$ref = new ReflectionClass('mysqli_stmt'); 
			 			$method = $ref->getMethod("bind_param"); 
						$method->invokeArgs($this->bind, $arr);
		 				$this->bind->execute();
		 			}		 			
		 		}
		 		$this->result += $this->bind->affected_rows;
				$this->check->connect->close();
			} catch (\Exception $e) {
				console::log($e, 'err.log');
			}
		}
		 
		function mutate($payload){
			$IsValuesArray = is_array($payload);
			foreach ($payload as $a => $b) {
				$clone = array();
				if(!is_object($b)) skip;
				foreach ($b as $key => $value) {
					$clone[] = $value;
				}
				$payload[$a] = $clone;
			}
			return $payload;
		}

 		function __tostring(){
 			return json_encode($this->result);
 		}
	}
?>