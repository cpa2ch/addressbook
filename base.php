<?php

function getPost ($post){
	$myJSON = $post;
	$data = json_decode($myJSON, true);	
	return $data;
}

function getInfoFromFile(){
	$file = file ('data.json');	
	$data = json_decode($file[0], true);
	return $data;
}


function saveToFile($inJSON){
	
	$fd = fopen('data.json', 'w') or die("не удалось создать файл");
	fputs($fd, json_encode($inJSON));
	fclose($fd);	
}

function deleteEntry($data,$key){
	
	for ($i = 0; $i<count($data);$i++){
		if ($data[$i]["number1"]."" === $key){
			unset ($data[$i]);
			$data = array_values($data);				
			return $data;
		}
	}
	return $data;
	
	
}

function updateEntry ($data, $prev, $val){
	for ($i = 0; $i<count($data);$i++){
		if ($data[$i]["number1"] == $prev){
			$data[$i] = $val;
		}		
	}
	return $data;
	
}

function addEntry ($data, $val){
	array_push ($data, $val);
	return $data;
}

//$p = getPost($_POST["data"]);


//$data = getInfoFromFile();
//$p = $data;
//print_r($p);
//saveToFile($p);

//print_r($p);
//deleteEntry($p, "9999");
//$p = updateEntry ($p, "9999", ["number1"=>"8585","lastname"=>"Peter"]);

//$tmp = '{"number1":"9915412230","firstname":"Natasha","lastname":"Gardner"}';
//$data = getPost($tmp);

$data = getPost($_POST["data"]);
$url = $_SERVER["REQUEST_URI"];

if (substr($url, -strlen("/update")) == "/update"){	
	$db = getInfoFromFile();	
	$db = updateEntry ($db,$data[0],$data[1]);
	saveToFile ($db);
	echo "updated";
}
else if (substr($url, -strlen("/add")) == "/add"){
	$db = getInfoFromFile();		
	$db = addEntry ($db, $data);	
	
	//echo json_encode($db);	
	
	saveToFile ($db);
	
	echo "added";

}

else if (substr($url, -strlen("/delete")) == "/delete"){
	$db = getInfoFromFile();		
	$db_after = deleteEntry ($db, $data["number1"]."");		
	saveToFile ($db_after);
	if (count($db) == count($db_after)) {
		echo "not deleted";
	}
	else echo "deleted";
}
else if (substr($url, -strlen("/getdump")) == "/getdump"){
	$db = getInfoFromFile();
	echo json_encode($db);
}

else if (substr($url, -strlen("/login")) == "/login"){
	
	if (($data["login"] =="admin") && ($data["pass"] =="123456")){
		echo "access";
	} else {
		echo "reject";
	}
}

else if (substr($url, -strlen("/restore")) == "/restore"){
	$db = json_decode('[{"number1": "9765902551","firstname": "Brianna","lastname": "Morrison"},{"number1": "8774353135","firstname": "Harrison","lastname": "Bell"},{"number1": "8554702541","firstname": "Kristie","lastname": "Jones"},{"number1": "9394222991","firstname": "Dodson","lastname": "Wilson"},{"number1": "9915412230","firstname": "Natasha","lastname": "Gardner"},{"number1": "8884693913","firstname": "Thomas","lastname": "Knight"},{"number1": "9804553797","firstname": "Vicky","lastname": "Chapman"},{"number1": "9074572730","firstname": "Fulton","lastname": "Hester"},{"number1": "8164403031","firstname": "Everett","lastname": "Page"},{"number1": "8735603151","firstname": "Jeanette","lastname": "Le"},{"number1": "8304283152","firstname": "Erin","lastname": "Walls"},{"number1": "8225753236","firstname": "Megan","lastname": "Clemons"},{"number1": "8854972820","firstname": "Erna","lastname": "Tate"},{"number1": "8135873767","firstname": "Laurel","lastname": "Hood"},{"number1": "8054193088","firstname": "Mosley","lastname": "Kirby"},{"number1": "9644643044","firstname": "Lillian","lastname": "Hayden"}]');
	saveToFile ($db);	
	echo json_encode($db);
}

else {
	var_dump (_SERVER);
	
}


















 ?>