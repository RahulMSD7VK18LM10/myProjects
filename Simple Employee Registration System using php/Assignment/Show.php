<?php
    session_start();
    if(isset($_SESSION['id']) =="") {
        header("Location: login.php?msg=Please Login to View Details");
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
    <h2 class="title">Employee Registration Details</h2>
    <section class="h-100 h-custom" style="background-color: #8fc4b7;">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-lg-12 col-xl-10">
                    <div class="card rounded-3">
                        <!-- <img src="https://images.unsplash.com/photo-1524419986249-348e8fa6ad4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" class="w-10" style="border-top-left-radius: .3rem; border-top-right-radius: .3rem;"
                            alt="Sample photo"> -->
                        <div class="card-body p-4 p-md-5">
                            <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Employee Details</h3>
                            <?php if(isset($_GET['msg'])){ $msg = $_GET['msg'];
                                echo '<div class="alert alert-warning alert-dismissible fade show" role="alert">'.$msg. '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span>
                                </button></div>';
                            }
                            ?>
                            <button class="btn btn-primary my-4"> <a href="Form.php" class="text-light">
                                Add Employee</a></button>
                            <button class="btn btn-primary my-4"> <a href="Logout.php" class="text-light">
                            Logout</a></button>
                            <table class="table">
                                <thead>
                                    <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">Attachment</th>
                                    <th scope="col">Actions</th>
                                    <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <?php
                                    include_once 'Connect.php';
                                    if(isset($_GET['page'])){
                                        $page= $_GET['page'];
                                    }else{
                                        $page=1;
                                    }
                                    $show_blog = 3;
                                    $start_blog = ($page-1)*3;
                                    $sql="SELECT * FROM employee_info ORDER BY id DESC LIMIT $start_blog,$show_blog";
                                    $result1=mysqli_query($conn,$sql);

                                    if($result1){
                                        while($row=mysqli_fetch_assoc($result1)){
                                            echo '<tr>
                                            <th scope="row">'.$row['id']. '</th>
                                            <td>'.$row['username']. '</td>
                                            <td>'.$row['email']. '</td>
                                            <td>'.$row['password'].'</td>
                                            <td>'.$row['attachment']. '</td>
                                            <td>
                                            <button class="btn btn-primary"><a href="Update.php?id='.$row['id'].'" 
                                            class="text-light">Update</a> </button></td>
                                            <td><button class="btn btn-danger"><a href="Delete.php?deleteid='.$row['id'].'" class="text-light">Delete</a> </button></td>
                                            </tr>';
                                            }
                                        }
                                    ?>
                    
                    <nav aria-label="Page navigation example" style="margin-left:40%; ">
                    <ul class="pagination pagination-lg">
                    <?php
                            $total_query = "SELECT * FROM employee_info";
                            $total_result = mysqli_query($conn,$total_query);
                            $total_record=+ mysqli_num_rows($total_result);

                            $total_page = ceil($total_record/$show_blog);

                            if($page>1){
                                echo "<li class='page-item'><a class='page-link' href='Show.php?page=".($page-1)."''  > 
                                <span aria-hidden='true'>&lt;</span>
                                </a></li>";
                            }

                            for($i=1; $i<$total_page; $i++){
                                echo"<li class='page-item' ><a class='page-link' href='Show.php?page=".($i)."'>$i</a></li>";
                            }

                            if($i>$page){
                                echo"<li class='page-item'><a class='page-link' href='Show.php?page=".($page+1)."' >
                                <span aria-hidden='true'>&gt;</span></a></li>";
                            }
                    ?>  
                    </ul>
                    </nav>
                                </tbody>
                            </table>
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
