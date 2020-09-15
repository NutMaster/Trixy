<?php
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    $json = file_get_contents('./JSON/math.json');
    $json_data = json_decode($json, JSON_PRETTY_PRINT);
    echo $json_data;

?>