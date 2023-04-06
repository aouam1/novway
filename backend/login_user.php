<?php
require_once 'config.php';



// Get the request body
$data = json_decode(file_get_contents("php://input"));

// Make sure email and password are provided
if (!empty($data->email) && !empty($data->password)) {
    $email = $data->email;
    $password = $data->password;

    // Prepare a SELECT statement to get the user with the provided email
    $stmt = $conn->prepare("SELECT * FROM utilisateur WHERE email = ?");
    $stmt->execute([$email]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Check if the user exists and the password is correct
    if ($result) {
        if (password_verify($password, $result["mdp"])) {
            http_response_code(200);
            echo json_encode(array("message" => "Login successful", "user" => $result));
        } else {
            http_response_code(401);
            echo json_encode(array("error" => "Invalid password"));
        }
    } else {
        http_response_code(404);
        echo json_encode(array("error" => "User not found"));
    }

    $stmt = null;
} else {
    http_response_code(400);
    echo json_encode(array("error" => "Email and password are required"));
}

$conn = null;
?>
