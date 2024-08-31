<h1>ARRAY</h1>

<?php

    $cars = array("BMW","VOLVO","TOYOTA");

    echo $cars[2];

    echo "<br/>";
    
    $car2 = array(
        "ford"=>"mustang",
        "maserati"=>"Unknown",
        "bmw"=>"m3"
    );
    echo $car2["ford"];

    $info = array(
    "user"=>array(
        "firstname"=> "Ryan",
        "lastname"=> "Nabo",
        "middlename"=> "R."
    ),
    "address"=>array(
        "province"=> "bulacan",
        "municipality"=>"bocaue",
        "baranggay"=>"wakas"
    ),

    );

    echo $info["address"]["municipality"];

    $info["user"]["age"]=20;
    print_r($info);
    echo "<br/>";

    echo "<pre>";
    print_r($info);
    echo "<br/>";
    var_dump($info);
    echo "</pre>";

echo "set of users<br>";
$favoriteByUser = array(
    array(
        "firstname"=> "Ryan",
        "lastname"=> "Nabo",
        "middlename"=> "R."
    ),
    array(
        "firstname"=> "Ryan",
        "lastname"=> "Nabo",
        "middlename"=> "R."
    ),
    array(
        "firstname"=> "Ryan",
        "lastname"=> "Nabo",
        "middlename"=> "R."
    ),
);

?>

