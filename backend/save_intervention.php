<?php
// header("Access-Control-Allow-Headers: *");


require_once 'config.php';

// Receive data from the frontend
$data = json_decode(file_get_contents("php://input"));

// Insert data into the fichie_intervention table
if (!empty($data->company) && !empty($data->fait_generateur) && !empty($data->ass_tech) && !empty($data->logiciel) && !empty($data->tech_du_service) && !empty($data->representant_entr) && !empty($data->heur_debut) && !empty($data->heur_fin) && !empty($data->duree) && !empty($data->date)) {
    $stmt = $conn->prepare("INSERT INTO fichie_intervention (entreprise, fait_generateur, assistance_tech, logiciel, tech_du_service, representant_entreprise, heur_debut, heur_fin, duree_d_intervention, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bindParam(1, $data->company);
    $stmt->bindParam(2, $data->fait_generateur);
    $stmt->bindParam(3, $data->ass_tech);
    $stmt->bindParam(4, $data->logiciel);
    $stmt->bindParam(5, $data->tech_du_service);
    $stmt->bindParam(6, $data->representant_entr);
    $stmt->bindParam(7, $data->heur_debut);
    $stmt->bindParam(8, $data->heur_fin);
    $stmt->bindParam(9, $data->duree);
    $stmt->bindParam(10, $data->date);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(array("message" => "Intervention was added successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to add intervention."));
    }

} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to add intervention. Data is incomplete."));
}

$conn = null;
