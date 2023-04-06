<?php
require_once 'config.php';

$data = json_decode(file_get_contents("php://input"));

$nom = !empty($data->nom) ? $data->nom : '';
$prenom = !empty($data->prenom) ? $data->prenom : '';
$email = !empty($data->email) ? $data->email : '';
$password = !empty($data->password) ? $data->password : '';

if (!empty($nom) && !empty($prenom) && !empty($email) && !empty($password)) {

    $query = "INSERT INTO utilisateur (nom, prenom, email, mdp) VALUES (:nom, :prenom, :email, :mdp)";
    $stmt = $conn->prepare($query);

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $stmt->bindParam(':nom', $nom);
    $stmt->bindParam(':prenom', $prenom);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':mdp', $hashed_password);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["message" => "User registered successfully."]);
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Unable to register user."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Incomplete data. Please provide all required fields."]);
}
