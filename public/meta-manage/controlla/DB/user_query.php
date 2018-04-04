<?php 
	namespace DB;
	use mysqli_stmt;
	use ReflectionClass;
	class user_query
	{
		public $check;
		protected $bind;
		public $sql;
		public $result;
		protected $row;
		public $cache;
		function __construct($credentials, $query, $fields)
		{
			$clone = $fields;
			$this->check = new user_connect($credentials);
			if(is_array($fields)){
				filter_var_array($fields, FILTER_SANITIZE_MAGIC_QUOTES);
				$length = count($fields);
				for ($i=0;$i < $length;$i++) $this->cache[] = &$fields[$i];	
				$fields = implode(", ", $fields);
			}
			elseif(is_string($fields)){
				$fields = validate::escape($fields);
				$this->cache[] = &$fields;				
			}
			$this->sql = validate::escape($query);
 		 	$this->bind = $this->check->connect->prepare($this->sql);
 		 	if(!$this->bind){
 		 		$this->result = null;
 		 	}
 		 	else{
	 		 	$ref = new ReflectionClass('mysqli_stmt'); 
				$method = $ref->getMethod("bind_result"); 
				$method->invokeArgs($this->bind, $this->cache);
				$this->bind->execute();	 			
	 			while ($this->bind->fetch()) {
					foreach ($this->cache as $key => $value) {
						if (is_array($clone)) $store[$clone[$key]] = $value;
						else $store[$clone] = $value;
					}
					$this->result[] = $store;
					$store = null;
				}
				$this->bind->free_result();
	 			$this->bind->close();
	 		}
	 		$this->check->connect->close();
		}

		function __tostring(){
			return json_encode($this->result);
		}
	}
?>