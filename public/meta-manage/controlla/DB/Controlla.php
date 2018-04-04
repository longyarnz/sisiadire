<?php 

	namespace DB;
	class Controlla
	{
		
		function __construct($credentials, $model, $fields, $mutation)
		{
			$this->credentials = $credentials;
			$this->fields = $fields;
			$this->mutation = $mutation;
			$this->model = $model;
		}

		// Function for counting number of rows in a model
		// Takes a parameter of $where. Eg: $DB->invoices->count(['invoice_number', $invoice_number])	
		// results in 3
		function count($where = null){
			if(is_array($where)) $where = " WHERE `$where[0]` = $where[1]";
			$SQL = "SELECT COUNT(*) FROM $this->model".$where;
			$query = $this->query($SQL, 'count');
			return $query[0]['count'];
		}

		// Function for inserting data in a model
		// Takes an associative array of column and values as a parameter of $values. 
		// Eg: $DB->users->create($customer)
		function create($values){
			$params = [$this->credentials, $this->model, $this->mutation, $values];
			$limit = is_numeric(array_keys($values)[0]) != 1 ? 1 : count($values);
			$query = new user_insert(...$params);
			$result = $query->result > 0 ? $this->findByOrder($this->fields, ['createdAt', 'DESC', $limit]) : [];
			return $result;
		}

		// Function for finding data in a model
		// Takes an array of columns as a parameter of $params. 
		// Eg: $DB->users->find(['email', 'name'])
		function find($params){
			$params = [$this->credentials, $this->model, $params];
			$query = new user_select();
			$query->retrieve(...$params);
			return $query->result;
		}

		// Function for selecting all data in a model
		// Eg: $DB->users->findAll()
		function findAll(){
			$params = [$this->credentials, $this->model, $this->fields];
			$query = new user_select();
			$query->retrieve(...$params);
			return $query->result;
		}

		// Function for selecting all data in a model given the primary key
		// Eg: $DB->users->findByID($primaryKey)
		// Returns an array
		function findByID($key){
			['Field'=>$field] = $this->getID();
			$query = $this->findWhere($this->fields, [$field, $key]);
			return $query;
		}

		// Function for selecting data in a model given a column and an array of column and value
		// Eg: $DB->users->findWhere(columns, [$column, $value]);
		// Returns an array
		function findWhere($column, $where){
			$column = $column == 'all' ? $this->fields : $column;
			$params = [$this->credentials, $this->model, $column, $where];
			$query = new user_select();
			$query->retrieve_where(...$params);
			return $query->result;
		}

		// Function for selecting data in a model given the columns and an array of column, ASC or DESC and LIMIT
		// Eg: $DB->users->findByOrder(columns, [$column, ASC/DESC, LIMIT]);
		// Returns an array
		function findByOrder($column, $order){
			$params = [$this->credentials, $this->model, $column, $order];
			$query = new user_select();
			$query->retrieve_order(...$params);
			$result = is_null($query->result) ? [] : $query->result;
			return $result;
		}

		// Function for selecting distinct data in a model given the columns and an array of column, ASC or DESC and LIMIT
		// Eg: $DB->users->findDistinct(columns, [$column, ASC/DESC, LIMIT]);
		// Returns an array
		function findDistinct($column, $distinct){
			$params = [$this->credentials, $this->model, $column, $distinct];
			$query = new user_select();
			$query->retrieve_distinct(...$params);
			return $query->result;
		}

		// Function for the primary key of a model
		// Eg: $DB->users->getID();
		// Returns a string
		function getID(){
			$SQL = "SHOW FIELDS IN $this->model WHERE `KEY`  = 'PRI'";
			$FIELDS = ['Field', 'Type', 'Null', 'Key', 'Default', 'Extra'];
			$params = [$this->credentials, $SQL, $FIELDS];
			$query = new user_query(...$params);
			return $query->result[0];
		}

		// Function for querying a database with a custom query
		// It takes the SQL statement and an array of columns matching the fetch data
		// Eg: $DB->users->query(SQL, [column, column]);
		// Returns an array
		function query($query, $fields){
			$params = [$this->credentials, $query, $fields];
			$query = new user_query(...$params);
			return $query->result;
		}

		// Function for updating entries in a model
		// It takes an array of the field and value to be updated
		// And it returns an array of the field and value where the update was be performed
		// Eg: $DB->users->update([columnName, updateValue], [identifierColumn, identifierValue]);
		// "UPDATE users SET columnName = updateValue WHERE identifierColumn = identifierValue"
		// Returns one associative array
		function update($column, $where){
			console::append($column, 'update.log');
			console::append($where, 'update.log');
			$params = [$this->credentials, $this->model, $column, $where];
			$query = new user_update();
			$query->update(...$params);
			$result = $this->findWhere('all', $where);
			return $result[0];
		}

		// Function for deleting entries in a model
		// It takes an array of the field and value to be updated
		// And it returns an array of the field and value where the delete was performed
		// Eg: $DB->users->delete(column, value);
		// "DELETE FROM users WHERE column = value";
		// Returns the number of rows deleted;
		function delete($column, $value){
			$params = [$this->credentials, $this->model, $column, $value];
			$query = new user_delete(...$params);
			console::append($query->result, 'delete.log');
			return $query->result;
		}

		function __tostring(){
			return $this->model;
		}
	}
?>