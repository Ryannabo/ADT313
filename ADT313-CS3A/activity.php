<h1>Activity</h1>

//revision of activity yesterday 01/08/2024

<?php

$table = array(
    "header" => array(
        "Student ID",
        "Lastname",
        "Middlename",
        "Firstname",
        "Course",
        "Section"
    ),
    "body" => array(
        array(
            "lastname" => "Lastname",
            "middlename" => "Middlename",
            "firstname" => "Firstnae",
            "course" => "Course",
            "section" => "Section"
        ),
        array(
            "lastname" => "Lastname",
            "middlename" => "Middlename",
            "firstname" => "Firstnae",
            "course" => "Course",
            "section" => "Section"
        ),
        array(
            "lastname" => "Lastname",
            "middlename" => "Middlename",
            "firstname" => "Firstnae",
            "course" => "Course",
            "section" => "Section"
        ),
        array(
            "lastname" => "Lastname",
            "middlename" => "Middlename",
            "firstname" => "Firstnae",
            "course" => "Course",
            "section" => "Section"
        ),
        array(
            "lastname" => "Lastname",
            "middlename" => "Middlename",
            "firstname" => "Firstnae",
            "course" => "Course",
            "section" => "Section"
        ),
        array(
            "lastname" => "Lastname",
            "middlename" => "Middlename",
            "firstname" => "Firstnae",
            "course" => "Course",
            "section" => "Section"
        ),
        array(
            "lastname" => "Lastname",
            "middlename" => "Middlename",
            "firstname" => "Firstnae",
            "course" => "Course",
            "section" => "Section"
        ),
        array(
            "lastname" => "Lastname",
            "middlename" => "Middlename",
            "firstname" => "Firstnae",
            "course" => "Course",
            "section" => "Section"
        ),
        array(
            "lastname" => "Lastname",
            "middlename" => "Middlename",
            "firstname" => "Firstnae",
            "course" => "Course",
            "section" => "Section"
        ),
        array(
            "lastname" => "Lastname",
            "middlename" => "Middlename",
            "firstname" => "Firstnae",
            "course" => "Course",
            "section" => "Section"
        ),
        array(
            "lastname" => "Lastname",
            "middlename" => "Middlename",
            "firstname" => "Firstnae",
            "course" => "Course",
            "section" => "Section"
        ),

    )

);

$studentID = 1;

?>

<table border="1">
    <thead>
        <tr>
            <?php foreach ($table['header'] as $header): ?>
                <th><?php echo htmlspecialchars($header); ?></th>
            <?php endforeach; ?>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($table['body'] as $row): ?>
            <tr>
                <td><?php echo htmlspecialchars($studentID++); ?></td>
                <?php foreach (array_keys($table['body'][0]) as $key): ?>
                    <td><?php echo htmlspecialchars($row[$key]); ?></td>
                <?php endforeach; ?>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
