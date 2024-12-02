<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?php echo"style-1.css";?>">
    <title>Home</title>
</head>
<body>
    <div class="banner"></div>
    <form action="home.php" method="post">
    <?php
session_start();

if (isset($_SESSION['user'])) {
    echo "<p>Hello, " . $_SESSION['user'] . "!</p>";

    if (isset($_POST['logout'])) {
        session_unset();
        session_destroy();
        header("Location: http://localhost/login");
        exit();
    }
} else {
    header("Location: http://localhost/login");
    exit();
}
?>
        <p>you are logged in!</p>
        <button type="submit" name="logout">Logout</button>
    </form>
</body>
</html>
