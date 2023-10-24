<?php
session_start();

require_once "Connect.php";

if(isset($_SESSION['id'])!="") {
    header("Location: display.php");
}

if (isset($_POST['login'])) {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    $result = mysqli_query($conn, "SELECT * FROM employee_info WHERE email = '" . $email. "' and password = '" .  $password. "'");
    if(!empty($result)){
        if ($row = mysqli_fetch_array($result)) {
            $_SESSION['id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            $_SESSION['email'] = $row['email'];
            $_SESSION['attachment'] = $row['attachment'];
            header("Location: Show.php?msg=Login Successfull..");
        } 
    }else {
        header("Location: Login.php?msg=Invalid EmailID or Password!!");
    }
}
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
<h2 class="title">Employee Registration Form</h2>
    <section class="h-100 h-custom" style="background-color: #8fc4b7;">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-10">
                    <div class="card rounded-3">
                        <!-- <img src="https://images.unsplash.com/photo-1524419986249-348e8fa6ad4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" class="w-10" style="border-top-left-radius: .3rem; border-top-right-radius: .3rem;"
                            alt="Sample photo"> -->
                        <div class="card-body p-4 p-md-5">
                            <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Employee Info</h3>
                            <?php if(isset($_GET['msg']))
                                { $msg = $_GET['msg'];
                                    echo '<div class="alert alert-warning alert-dismissible fade show" role="alert">'.$msg. '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span>
                                    </button></div>';
                                }
                            ?>

                            <form class="px-md-2" id="form" method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">

                                <div class="form-outline mb-4">
                                    <input type="text" class="form-control" name="email" id="email" placeholder="Enter your Email"/>
                                    <!-- <label for="email" class="form-label">Email</label> -->
                                </div>


                                <div class="form-outline mb-4">
                                    <input type="password" id="password" name="password" class="form-control" placeholder="Enter Your Password"/>
                                    <!-- <label class="form-label" for="password">Password</label> -->
                                </div>

                                <button type="submit" name="login" class="btn btn-success btn-lg mb-1">Login</button>
                                <br/>
                                Don't have an account then <u><a href="Form.php" class="text-blue">CLICK HERE</a></u>.

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