<?php 
	namespace DB;
	class Models
	{
		public $result;
		public $store = [];
		function __construct($credentials)
		{
			if (new user_connect($credentials)) {
				$this->credentials = $credentials;
				$select_tables = new user_select();
				$select_tables->retrieve_tables($credentials);  // select database tables
				if ($select_tables->error) {
					echo json_encode("Invalid Access Codes");
					exit();
				}
				else{
					$datastore = array_flip($select_tables->result);
					$store = $datastore;
					foreach ($datastore as $key => $value) { //iterate database tables
						$datastore[$key] = array();
						$store[$key] = array();
						$store_type = array();
				 		$select_columns = new user_select();
				 		$select_columns->retrieve_columns($credentials, $key, 'query');
				 		for ($i=0; $i < count($select_columns->result); $i++) { 
				 			$new_key = $select_columns->result[$i][0];
				 			$datatype[$new_key] = $select_columns->result[$i][1];				 		
							$datastore[$key]['query-fields'][] = $new_key;
						};
						$select_columns->retrieve_columns($credentials, $key, 'mutate');
						for ($i=0; $i < count($select_columns->result); $i++) { 
							$new_key = $select_columns->result[$i][0];
							$datatype[$new_key] = $select_columns->result[$i][1];				 		
							$datastore[$key]['mutate-fields'][] = $new_key;
							// The snippet below is for populating Meta-Manage App
							$new_key = ucfirst($select_columns->result[$i][0]);
							$store_type[$new_key] = $select_columns->result[$i][1];
							// $store[$key][$new_key] = false;
						}
						$store[$key]['data_type'] = $store_type; // Meta-Manage App
						$this->store = $store;
						if ($select_columns->error) {
							echo json_encode("Invalid Access Codes");
							exit();
						}
					}
				}
				foreach ($datastore as $key => $value) {
					$this->$key = new Controlla($this->credentials, $key, $value['query-fields'], $value['mutate-fields']);
				};
			}
			else{
				$this->result = false;		
			}
		}

		function getEntries($params, $options){
			$params = isset($params) ? $params : ['column'=>"", 'table'=>""];
			$query = new user_select();
			if (isset($options)) {
				['column'=>$column, 'table'=>$table] = $params;
				switch ($options) {
					case 'where':
						['where'=>$where] = $params;
						$query->retrieve_where($this->credentials, $table, $column, $where);
						return $query->result;
						break;
					case 'where_s':
						['where_s'=>$where] = $params;
						$query->retrieve_where_schema($this->credentials, $table, $column, $where);
						return $query->result;
						break;
					case 'order':
						['order'=>$order] = $params;
						$query->retrieve_order($this->credentials, $table, $column, $order=['id', '100']);
						return $query->result;
						break;
					case 'distinct':
						['distinct'=>$distinct] = $params;
						$query->retrieve_distinct($this->credentials, $table, $column, $distinct=['', '100']);
						return $query->result;
						break;
					default:
						$query->retrieve($this->credentials, $table, $column);
						return $query->result;
					break;
				}
			}
		}

		function __tostring(){
			return json_encode($this->result);
		}
	}
?>