<?php

(int)$id = $_POST['id'];
(string)$date = $_POST['date'];

try {
    $bdd = new PDO('mysql:host=localhost;dbname=SPUE6', 'root', 'root');
} catch (Exception $e) {
    echo 'Erreur <br>' . $e->getMessage();
}

// on met à NULL la date_rendu
$bdd_query_null = $bdd->prepare("UPDATE livres SET date_emprunt=NULL WHERE id=$id");
$bdd_query_null->execute();

// requetes
$bdd_query = $bdd->prepare("UPDATE livres SET date_rendu='$date' WHERE id=$id");
$bdd_query->execute();

$reponse = new \StdClass();
$reponse->code = 200;

header('Content-Type: application/json');
echo json_encode($reponse);