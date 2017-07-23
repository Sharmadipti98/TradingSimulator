<?php

include_once (__DIR__) . '/dbConnection.php';
$conn = createConnection();


$sql = "CREATE TABLE Feeds (
FeedKeyId INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
StoreName VARCHAR(30),
FeedString VARCHAR(10000),
TargetLink VARCHAR(500),
IsItImageOrWidget VARCHAR(10)
)";

if($conn->query($sql) === TRUE) {
    echo "Table MyGuests created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}


$sql = "CREATE TABLE Order_Details (
OrderId VARCHAR(6), 
EmailId VARCHAR(50),
MobileNumber INT(15)
)";

if($conn->query($sql) === TRUE) {
    echo "Table MyGuests created successfully\n";
} else {
    echo "Error creating table: " . $conn->error;
}


$conn->close();

?>