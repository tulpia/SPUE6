<?php

$filter = $_POST['filtre'];

try {
    $bdd = new PDO('mysql:host=localhost;dbname=SPUE6', 'root', 'root');
} catch (Exception $e) {
    echo 'Erreur <br>' . $e->getMessage();
}

// requetes
$bdd_query = $bdd->query("SELECT * FROM livres ORDER BY $filter");

$requete_normal = $bdd_query->fetchAll();

$reponse = new \StdClass();
$reponse->code = 200;
$reponse->items = $requete_normal;

header('Content-Type: application/json');
echo json_encode($reponse);