<?php
    include 'Connect.php';
    if(isset ($_GET['deleteid'])){
        $id=$_GET['deleteid'];
        $sql="delete from `employee_info` where id=$id" ;
        $result=mysqli_query($conn,$sql);
        if($result){
            echo "Deleted Successfuly";
            header('location:Show.php?msg=DATA DELETED SUCCESSFULLY');
        }
        else{
        die(mysqli_error($conn));
        }
    }
?>