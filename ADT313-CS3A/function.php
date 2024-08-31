<?php

    function checkAuthentication($user){
        if($user !== 'admin') {
            echo "go away!";
        } else {
            echo "welcome!";
        }
    }

    checkAuthentication('admin');

?>