<h1>Condition</h1>

<?php
    $number = 14;
    if($number % 2){
        echo "Odd\n";
    }else {
        echo "Even\n";
    }

    echo "<br/>";

    //(codnition) ? true : false

    $authenticated = true;
    $checkAccess = ($authenticated)? "access granted" : "access denied";
    echo $checkAccess;

    $color = 'blue';

    switch ($color){
        case 'red':
        break;

        case 'blue':
            break;

        case 'pink':
        break;

        case 'yellow':
        break;  
    }

    

?>