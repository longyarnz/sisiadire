<?php  
	namespace DB;
	class user_upload
	{
		protected $file;
		protected $name;
		protected $base_name;
		protected $size;
		protected $type;
		protected $error;
		protected $target_dir;
		protected $tmp_file;
		protected $result;
		protected $check;
		protected $image_check;
		
		function __construct($file, $folder)
		{
			$this->file = $file;
			$this->target_dir = $folder."/";
			$this->base_name = basename($file["name"]);
			$this->cloud_storage = $this->target_dir.$this->base_name;
			$this->type = $file["type"];
			$this->tmp_file = $file["tmp_name"];
			$this->size = $file["size"];
			$this->check = pathinfo($this->cloud_storage, PATHINFO_EXTENSION);
			$this->upload_file();
		}

		function check_file(){
			if (
				$this->check != "jpg" &&
				$this->check != "png" &&
				$this->check != "gif" &&
				$this->check != "jpeg" &&
				$this->check != "pdf" &&
				$this->check != "mp4" &&
				$this->check != "flv" &&
				$this->check != "docx" &&
				$this->check != "doc" &&
				$this->check != "3gp" &&
				$this->check != "mp3" &&
				$this->check != "ogg" &&
				$this->check != "wav" &&
				$this->check != "wmv" &&
				$this->check != "webm" &&
				$this->check != "xlsx" &&
   			$this->check != "txt" &&
   			$this->check != "mpeg"
   		) {
				 console::append('Wrong File Type'.date("Y/m/d h:i:sa").'\r\n', 'error.log');
				return false;
			}
			elseif (file_exists($this->cloud_storage)) {
				console::append('Files Exist'.date("Y/m/d h:i:sa").'\r\n', 'error.log');
				$this->result = false;
			}
			else{
				move_uploaded_file($this->tmp_file, $this->cloud_storage);
				$this->result = true;
			}
		}

		function __tostring(){
			return json_encode($this->result);
		}
	}
?>