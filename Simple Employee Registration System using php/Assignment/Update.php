<?php
    include_once 'Connect.php';
    $id=$_GET ['id'];
    echo "<script>alert($id);</script>";
    if(isset($_POST['update'])){
        echo "<script>alert('inside if');</script>";
        $username1=$_POST['name'];
        $email1=$_POST['email'];
        $password1=$_POST['password'];
        echo "<script>alert('username:'.$username1.' email:'.$email1.' password:'.$password1.);</script>";
        $sql1= "UPDATE employee_info SET username='$username1', email='$email1', password ='$password1' where id ='$id'";
        $result1=mysqli_query($conn,$sql1);
        echo "<script>alert($result1);</script>";
        if($result1){
            header('Location:Show.php?msg=DATA UPDATED SUCCESSFULLY');
        }
        else{
            die(mysqli_error($conn));
        }
    }
    // else{
    //     echo "<script>alert('in else');</script>";
    // }
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Form.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>

<body>
    <h2 class="title">Employee Registration Details</h2>
    <section class="h-100 h-custom" style="background-color: #8fc4b7;">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-10">
                    <div class="card rounded-3">
                        <!-- <img src="https://images.unsplash.com/photo-1524419986249-348e8fa6ad4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" class="w-10" style="border-top-left-radius: .3rem; border-top-right-radius: .3rem;"
                            alt="Sample photo"> -->
                        <div class="card-body p-4 p-md-5">
                            <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Employee Update</h3>
                            <?php if(isset($_GET['msg'])){ $msg = $_GET['msg'];
                                echo '<div class="alert alert-warning alert-dismissible fade show" role="alert">'.$msg. '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span>
                                </button></div>';
                            }
                            ?>

                            <form class="px-md-2" id="form" method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" enctype="multipart/form-data">
                                <?php
                                    // include 'Connect.php';
                                    $sql2="SELECT * from `employee_info` where id= $id";
                                    $result2=mysqli_query($conn,$sql2);
                                    $data=mysqli_fetch_assoc($result2);
                                    $username= $data['username'];
                                    $email= $data['email'];
                                    $password= $data['password'];
                                    $attachment= $data['attachment'];
                                ?>
                                <div class="form-outline mb-4">
                                    <input type="text" id="name" name="name" class="form-control" placeholder="Enter your UserName" value="<?php echo $username?>"/>
                                    <!-- <label class="form-label" for="name">UserName</label> -->
                                </div>

                                <div class="form-outline mb-4">
                                    <input type="text" class="form-control" name="email" id="email" placeholder="Enter your Email" value="<?php echo $email?>"/>
                                    <!-- <label for="email" class="form-label">Email</label> -->
                                </div>


                                <div class="form-outline mb-4">
                                    <input type="password" id="password" name="password" class="form-control" placeholder="Enter Your Password" value="<?php echo $password?>"/>
                                    <!-- <label class="form-label" for="password">Password</label> -->
                                </div>

                                <div class="form-outline mb-4">
                                    <input type="file" name="attachment" id="fileattachment" class="form-control"/>
                                    <label class="form-label" for="fileattachment">File Upload
                                    <small>(*Only jpg, jpeg, pdf or png files are allowed).</small>
                                            </label>
                                    <br/>
                                    <small><?php echo $attachment?> is there</small>
                                </div>

                                <button type="submit" name="update" class="btn btn-success btn-lg mb-1">Update</button>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js" ></script>
    <script src="/path/to/cdn/jquery.min.js"></script>
    <script src="js/jquery.passwordRequirements.min.js"></script>
    <script src="Form.js" ></script>
</body>

</html>