<?php
// on recup d'abord la variable stockée dans l'url
$id = (int)$_GET['id'];

// connexion à la bdd
try {
    $bdd = new PDO('mysql:host=localhost;dbname=SPUE6', 'root', 'root');
} catch (Exception $e) {
    echo 'Erreur <br>' . $e->getMessage();
}

// requetes
$bdd_query = $bdd->query("SELECT * FROM livres WHERE id=$id");

$livre = $bdd_query->fetchAll();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?= $livre[0]['titre']; ?></title>
    <link rel="stylesheet" href="dist/styles.css">
    <link rel="icon" href="dist/favicon.png">
</head>
<body class="single">
    <main class="wrapper">
        <div id="barba-wrapper">
            <div class="barba-container" data-namespace="pages_single">
                <?php include('header.php'); ?>
                <section class="title-container">
                    <p class="before before--main-title">Titre</p>
                    <h1 class="title-container__title">
                        <?= $livre[0]['titre']; ?>
                    </h1>
                </section>
                <section class="details-container">
                    <p class="auteur appearSingle"><span class="before">de </span><?= $livre[0]['auteur']; ?></p>
                    <p class="middle appearSingle">-</p>
                    <p class="genre appearSingle"><?= $livre[0]['categorie']; ?></p>
                </section>
                <section class="infos-supp appearSingle">
                    <?php if (empty($livre[0]['date_emprunt'])) { ?>
                        <p>Disponible <span>-</span> rendu le <?= $livre[0]['date_rendu'] ?></p>
                    <?php } else { ?>
                        <p>Non-disponible <span>-</span> emprunté le <?= $livre[0]['date_emprunt'] ?></p>
                    <?php } ?>
                </section>
                <section class="emprunt-container appearSingle">
                    <?php if(empty($livre[0]['date_emprunt'])) { ?>
                        <a href="#" class="onEmprunt" data-name="<?= $livre[0]['id']; ?>">Emprunter le livre</a>
                    <?php } else { ?>
                        <a href="#" class="onRendu" data-name="<?= $livre[0]['id']; ?>">Rendre le livre</a>
                    <?php } ?>
                        <p class="after_text"></p>
                </section>
            </div>
        </div>
    </main>
    <script src="dist/main.js"></script>
</body>
</html>