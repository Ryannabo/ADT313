<h1>Activity</h1>
<table align = "left" border = "1" cellpadding = "3" cellspacing = "2">   

<?php
    $studentID = 1;
    
    $table = array(
        "header"=>array(
            "Student ID",
            "Lastname",
            "Middlename",
            "Firstname",
            "Course",
            "Section"
        ),
        "body"=>array(
            array(
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstnae",
                "course"=>"Course",
                "section"=>"Section"
            ),
            array(
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstnae",
                "course"=>"Course",
                "section"=>"Section"
            ),
            array(
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstnae",
                "course"=>"Course",
                "section"=>"Section"
            ),
            array(
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstnae",
                "course"=>"Course",
                "section"=>"Section"
            ),
            array(
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstnae",
                "course"=>"Course",
                "section"=>"Section"
            ),
            array(
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstnae",
                "course"=>"Course",
                "section"=>"Section"
            ),
            array(
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstnae",
                "course"=>"Course",
                "section"=>"Section"
            ),
            array(
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstnae",
                "course"=>"Course",
                "section"=>"Section"
            ),
            array(
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstnae",
                "course"=>"Course",
                "section"=>"Section"
            ),
            array(
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstnae",
                "course"=>"Course",
                "section"=>"Section"
            ),
            array(
                "lastname"=>"Lastname",
                "middlename"=>"Middlename",
                "firstname"=>"Firstnae",
                "course"=>"Course",
                "section"=>"Section"
            ),
             
        )

        );
        echo "<tr>";
        echo "<td>Student ID</td>";
        echo "<td>" . $table["header"]["Lastname"] . "</td>";
        echo "<td>" . $table["header"]["Firstname"] . "</td>";
        echo "<td>" . $table["header"]['Firstname'] . "</td>";
        echo "<td>" . $table["header"]['Firstname'] . "</td>";
        echo "<td>" . $table["header"]['Firstname'] . "</td>";
        echo "</tr>";
       
    foreach($table as $tables){.0
        echo "<tr>";
        echo "<td>$studentID</td>";
        echo "<td>" . $table["body"]['lastname'] . "</td>";
        echo "<td>$tables[body]['firstname']</td>";
        echo "<td>$tables[body]['middlename']</td>";
        echo "<td>$tables[body]['Course']</td>";
        echo "<td>$tables[body]['Section']</td>";
        echo "<tr>";
        $studentID++;
    }

?>


</table>