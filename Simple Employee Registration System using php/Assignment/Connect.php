<?php
    $conn=mysqli_connect('localhost','root','', 'crudassignment');
    if(!$conn){
    die(mysqli_error($conn));
    }
?>