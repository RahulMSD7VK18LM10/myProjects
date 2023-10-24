<?php
    session_start();
    session_unset();
    session_destroy();
    //CREATE TABLE `crudassignment`.`employee_info` (`id` INT(20) NOT NULL AUTO_INCREMENT , `username` VARCHAR(244) NOT NULL , `email` VARCHAR(244) NOT NULL , `password` VARCHAR(244) NOT NULL , `attachment` VARCHAR(244) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
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
    <?php
        $path = 'uploads/';
        include_once 'Connect.php';
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $username = $_POST["name"];
            $email=$_POST["email"];
            $password=$_POST["password"];
            // $attachment=$_POST["attachment"];
            $img = $_FILES['attachment']['name'];
            $tmp = $_FILES['attachment']['tmp_name'];
            // get uploaded file's extension
            $ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
            // can upload same image using rand function
            $final_image = rand(1000, 1000000) . $img;
            // echo "<script>alert('First if success')</script>";
            // check's valid format
            if($ext == "jpg" || $ext == "png" || $ext == "jpeg"
                || $ext == "pdf" ) {
                $path = $path.strtolower($final_image);
                // echo "<script>alert('2nd if success')</script>";
                if (move_uploaded_file($tmp, $path)) {
                    include_once 'Connect.php';
                    $username = $_POST['name'];
                    $email = $_POST['email'];
                    $password=$_POST['password'];
                    $sql = "SELECT * FROM employee_info"; 
                    $result = mysqli_query($conn,$sql); 
                    $count=1;
                    while($row=mysqli_fetch_assoc($result)){
                        if($row["email"]==$email){
                            $count=0;
                            break;
                        }
                        else{
                            $count=1;
                        }
                    }
                    if($count==1){
                        $stmt = $conn->prepare("INSERT INTO employee_info (id,username,email,password,attachment) VALUES (?,?, ?,?,?)");
                        $stmt->bind_param("issss",$id,$username,$email,$password,$path);
                        if($stmt->execute()){
                        header("Location:Login.php?msg=Record inserted successfully!! Please login to continue..");
                        }else{
                        echo "<script>alert('Record not inserted')</script>";
                        }
                    }else{
                        header("Location:Form.php?msg=Warning!! This email already exist please enter a different eamil.");
                    }
                }else{
                    header("Location:Form.php?msg=File not uploaded!! Please try again..");
                }
            } else {
                header("Location:Form.php?msg=Invalid file!!..");
            }
        }
    ?>
    <h2 class="title">Employee Registration Details</h2>
    <section class="h-100 h-custom" style="background-color: #8fc4b7;">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-10">
                    <div class="card rounded-3">
                        <!-- <img src="https://images.unsplash.com/photo-1524419986249-348e8fa6ad4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" class="w-10" style="border-top-left-radius: .3rem; border-top-right-radius: .3rem;"
                            alt="Sample photo"> -->
                        <div class="card-body p-4 p-md-5">
                            <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Employee Registration</h3>
                            <?php if(isset($_GET['msg'])){ $msg = $_GET['msg'];
                                echo '<div class="alert alert-warning alert-dismissible fade show" role="alert">'.$msg. '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span>
                                </button></div>';
                            }
                            ?>

                            <form class="px-md-2" id="form" method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" enctype="multipart/form-data">

                                <div class="form-outline mb-4">
                                    <input type="text" id="name" name="name" class="form-control" placeholder="Enter your UserName"/>
                                    <!-- <label class="form-label" for="name">UserName</label> -->
                                </div>

                                <div class="form-outline mb-4">
                                    <input type="text" class="form-control" name="email" id="email" placeholder="Enter your Email"/>
                                    <!-- <label for="email" class="form-label">Email</label> -->
                                </div>


                                <div class="form-outline mb-4">
                                    <input type="password" id="password" name="password" class="form-control" placeholder="Enter Your Password"/>
                                    <!-- <label class="form-label" for="password">Password</label> -->
                                </div>

                                <div class="form-outline mb-4">
                                    <input type="file" name="attachment" id="fileattachment" class="form-control" />
                                    <label class="form-label" for="fileattachment">File Upload
                                                <small>(*Only jpg, jpeg, pdf or png files are allowed).</small>
                                            </label>
                                </div>

                                <button type="submit" class="btn btn-success btn-lg mb-1">Register</button>
                                <br/>
                                Already have an account then <u><a href="Login.php" class="text-blue">CLICK HERE</a></u>.

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