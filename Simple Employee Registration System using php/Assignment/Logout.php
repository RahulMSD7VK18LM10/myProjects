<?php
ob_start();
session_start();
if(isset($_SESSION['id'])) {
	session_destroy();
	unset($_SESSION['id']);
	unset($_SESSION['username']);
	unset($_SESSION['email']);
	unset($_SESSION['attachment']);
    // session_unset();
	header("Location: Login.php?msg=You have logged out!! Please login to continue");
} else {
	header("Location: Login.php");
}
?>