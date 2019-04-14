<?php
// connexion à la bdd
try {
    $bdd = new PDO('mysql:host=localhost;dbname=SPUE6', 'root', 'root');
} catch (Exception $e) {
    echo 'Erreur <br>' . $e->getMessage();
}

// requetes
$bdd_query = $bdd->query('SELECT * FROM livres ORDER BY id');

$requete_normal = $bdd_query->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Livres - Alec</title>
    <link rel="stylesheet" href="dist/styles.css">
    <link rel="icon" href="dist/favicon.png">
</head>
<body class="home">
    <div id="barba-wrapper">
        <div class="barba-container" data-namespace="pages_home">
        <main class="wrapper">
            <?php include('header.php'); ?>
            <section class="block-introduction">
                <h1>Just some books.<h1>
                <h1 class="outline">Enjoy.</h1>
            </section>
            <section class="block-liste">
                <article class="legende appearAccueil">
                    <p class="item-container__number">#</p>
                    <p class="item-container__title"><a href="#" data-name="titre">Titre</a></p>
                    <p class="item-container__categorie"><a href="#" data-name="categorie">Catégorie</a></p>
                    <p class="item-container__date-rendu"><a href="#" data-name="date_rendu">Date de rendu</a></p>
                    <p class="item-container__date-emprunt"><a href="#" data-name="date_emprunt">Date d'emprunt</a></p>
                </article>
                <section class="block-liste__container">
                    <?php foreach ($requete_normal as $value) {
                    ?>
                    <?php if(isset($value['date_rendu'])) { ?>
                        <a class="item-link appearAccueil" href="single.php?id=<?= $value['id']; ?>">
                    <?php } else { ?>
                        <a class="item-link taken appearAccueil" href="single.php?id=<?= $value['id']; ?>">
                    <?php } ?>
                        <article class="block-liste__item-container">
                            <p class="item-container__number"><?= $value['id']; ?></p>
                            <p class="item-container__title"><?= $value["titre"]; ?></p>
                            <p class="item-container__categorie"><?= $value["categorie"]; ?></p>
                            <p class="item-container__date-rendu">
                                <?php if (isset($value["date_rendu"])) {
                                    echo $value["date_rendu"];
                                } ?>
                            </p>
                            <p class="item-container__date-emprunt">
                                <?php if (isset($value["date_emprunt"])) {
                                    echo $value["date_emprunt"];
                                } ?>
                            </p>
                        </article>
                    </a>
                    <?php } ?>
                </section>
            </section>
        </main>
        </div>
    </div>
    <section class="scroll-aid">Scroll down !</section>
    <script src="dist/main.js"></script>
</body>
</html>