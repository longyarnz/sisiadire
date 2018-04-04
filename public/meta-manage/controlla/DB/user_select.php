<?php
	namespace DB;
	use mysqli_stmt;
	use ReflectionClass;
	class user_select
	{
		public $check;
		protected $bind;
		public $sql;
		public $result;
		protected $row;
		protected $meta;
		public $cache;
		protected $cache1;
		protected $cache2;
		public $error;


		function retrieve($credentials, $model, $fields){
			$model = validate::escape($model);
			$clone = $fields;
			$this->cache = array();
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
 			$this->check = new user_connect($credentials);
			$this->sql = "SELECT $fields FROM `$model`";
 		 	$this->bind = $this->check->connect->prepare($this->sql);
 		 	if(!$this->bind) $this->error = true; 		 		
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

	 	function retrieve_where($credentials, $model, $fields, $options){
 			$model = validate::escape($model);
 			$this->cache = array();
 			if(is_array($fields)){
				filter_var_array($fields, FILTER_SANITIZE_MAGIC_QUOTES);
				$clone = $fields;
				$fd = count($fields);
				for ($i=0;$i < $fd;$i++) {
					$this->cache[] = &$fields[$i];	
				}
				$fields = implode(", ", $fields);
			}
			else{
				$fields = validate::escape($fields);
				$clone = [$fields];
				$this->cache[] = &$fields;
			}
			if(is_array($options)){
	 			filter_var_array($options, FILTER_SANITIZE_MAGIC_QUOTES);
	 			$num = count($options);
	 			$where = "";
	 			$sss = "";
	 			for ($i=0; $i < $num; $i++) {
	 				if ($i == 0 || $i % 2 == 0) {
	 				 	$where = $where."`$options[$i]` = ?";
	 				 	$sss = $sss.'s';
	 				 	$this->cache1[0] = $sss;
	 				 	$this->cache1[] = &$options[$i + 1]; 
	 				}
	 				elseif($i % 2 == 1 && $num - $i != 1){
	 					$where = $where." AND ";
	 				}
	 			}
	 		}
	 		else{
	 			$this->cache1[] = ['s', &$options]; 
	 			$model = validate::escape($options);
	 			$where = "`$options` = ?";
	 		}
 			$this->check = new user_connect($credentials);
 			$this->sql = "SELECT $fields FROM `$model` WHERE $where  ORDER BY `createdAT` ASC";
 			$this->bind = $this->check->connect->prepare($this->sql);
 			if(!$this->bind){
 		 		$this->result = true; 		 		
 		 	}
 		 	else{
	 			$ref = new ReflectionClass('mysqli_stmt'); 
	 			$method2 = $ref->getMethod("bind_param"); 
				$method2->invokeArgs($this->bind, $this->cache1);
				$this->bind->execute();	 	
				$method1 = $ref->getMethod("bind_result"); 
				$method1->invokeArgs($this->bind, $this->cache);						
	 			while($this->bind->fetch()) {
	 				foreach ($this->cache as $key => $value) {
						if (is_array($clone)) $store[$clone[$key]] = $value;
						else $store[$clone] = $value;
					}
					$this->result[] = $store;
					$store = null;
	 			}

	 			$this->bind->close();
	 		}
 		}

 		function retrieve_tables($credentials){
 			$this->check = new user_connect($credentials);
			$this->sql = "SHOW TABLES";
 			$this->bind = $this->check->connect->prepare($this->sql);
 			if(!$this->bind){
 		 		$this->error = true; 		 		
 		 	}
 		 	else{
	 			$this->bind->execute();
	 			$this->bind->bind_result($this->cache);
				while ($this->bind->fetch()) {
	 				$this->result[] = $this->cache;
	 			}
	 			$this->bind->close();
	 		}
	 	}

	 	function retrieve_columns($credentials, $model, $options){
	 		$this->result = array();
	 		$this->cache = array(); 
	 		$this->cache1 = null;
 			$this->check = new user_connect($credentials);
			$this->sql = $options == 'mutate' ? "SHOW FIELDS IN $model WHERE `Field` NOT LIKE '%At' AND EXTRA = ''" : "SHOW FIELDS IN $model";
			$this->bind = $this->check->connect->prepare($this->sql);
 			$fields = array();
 			for ($i=0;$i < 6;$i++) {
				$this->cache[] = &$fields[$i];	
			}
 			if(!$this->bind){
 		 		$this->error = true; 		 		
 		 	}
 		 	else{
	 			$this->bind->execute();
	 			$ref = new ReflectionClass('mysqli_stmt'); 
				$method = $ref->getMethod("bind_result"); 
				$method->invokeArgs($this->bind, $this->cache);
				while ($this->bind->fetch()) {
					foreach ($this->cache as $key => $value) {
						if ($key == 0) {
							$this->cache1 = $value;
						}
						elseif ($key == 1) {
							$this->result[] = [$this->cache1, $value];
						}						
					}
				}
	 			$this->bind->close();
	 		}
	 	}

 		function retrieve_order($credentials, $model, $fields, $options){
 			$model = validate::escape($model);
			$clone = $fields;
			if(is_array($fields)){
				filter_var_array($fields, FILTER_SANITIZE_MAGIC_QUOTES);
				$length = count($fields);
				for ($i=0;$i < $length;$i++) {
					$this->cache[] = &$fields[$i];	
				}
				$fields = implode(", ", $fields);
			}
			else{
				$fields = validate::escape($fields);
				$this->cache[] = &$fields;	
			}
			filter_var_array($options, FILTER_SANITIZE_MAGIC_QUOTES);
 			$this->check = new user_connect($credentials);
			$this->sql = "SELECT $fields FROM `$model` ORDER BY `$options[0]` $options[1] LIMIT $options[2]";
 			$this->bind = $this->check->connect->prepare($this->sql);
 			if(!$this->bind){
 		 		$this->error = true; 		 		
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

	 	function retrieve_distinct($credentials, $model, $fields, $options){
 			$this->result = array();
 			$clone = $fields;
			$model = validate::escape($model);
			if(is_array($fields)){
				filter_var_array($fields, FILTER_SANITIZE_MAGIC_QUOTES);
				$length = count($fields);
				for ($i=0;$i < $length;$i++) {
					$this->cache[] = &$fields[$i];	
				}
				$fields = implode(", ", $fields);
			}
			else{
				$fields = validate::escape($fields);
				$this->cache[] = &$fields;	
			}
			filter_var_array($options, FILTER_SANITIZE_MAGIC_QUOTES);
 			$this->check = new user_connect($optionsredentials);
			$this->sql = "SELECT DISTINCT $fields FROM `$model` ORDER BY `$options[0]` $options[1] LIMIT $options[2]";
 			$this->bind = $this->check->connect->prepare($this->sql);
 			if(!$this->bind){
 		 		$this->error = true; 		 		
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