<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $db_server = "localhost";
    $db_user = "root";  
    $db_pass = "";      
    $db_name = "phpdb"; 

    $conn = mysqli_connect($db_server, $db_user, $db_pass, $db_name);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    if ($_SERVER['REQUEST_METHOD']=="POST") {
        $data = file_get_contents("php://input");
        $request = json_decode($data, true);

        if(count($request)!=0){
            $user_name = mysqli_real_escape_string($conn, $request['user']);
            $email = mysqli_real_escape_string($conn, $request['email']);
            $password = password_hash($request['password'], PASSWORD_DEFAULT);
            $phone = mysqli_real_escape_string($conn, $request['phone']);

            $sql="INSERT INTO users (user, password, email, phone) VALUES ('$user_name', '$password', '$email', $phone)";
            if (mysqli_query($conn, $sql)) {
                session_start();
                $_SESSION['user'] = $user_name;
                echo "Registered successfully";
              } else {
                echo "Error: in connection" ;
              }
        }else{
            echo"Please enter valid data";
        }
    }
    mysqli_close($conn);
?>