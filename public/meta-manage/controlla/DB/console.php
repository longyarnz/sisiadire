<?php 

	namespace DB;
	class console
	{
		public static function log($object, $log = 'msg.log'){
			file_put_contents($log, print_r($object, true));
		}

		public static function append($object, $log = 'msg.log'){
			file_put_contents($log, print_r($object, true), FILE_APPEND);
		}
	}
?>