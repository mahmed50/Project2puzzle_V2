<?php
session_start();

// Initialize the puzzle
if (!isset($_SESSION['tiles']) || isset($_POST['shuffle'])) {
    $_SESSION['tiles'] = range(1, 15);
    $_SESSION['tiles'][] = "";
    shuffle($_SESSION['tiles']);
    $_SESSION['moves'] = 0;
}

// Handle move
if (isset($_POST['move'])) {
    $index = array_search($_POST['move'], $_SESSION['tiles']);
    $emptyIndex = array_search("", $_SESSION['tiles']);
    $validMoves = [
        $emptyIndex - 1, $emptyIndex + 1,
        $emptyIndex - 4, $emptyIndex + 4
    ];
    if (in_array($index, $validMoves) &&
        !(($emptyIndex % 4 == 0 && $index == $emptyIndex - 1) || ($emptyIndex % 4 == 3 && $index == $emptyIndex + 1))) {
        $_SESSION['tiles'][$index] = "";
        $_SESSION['tiles'][$emptyIndex] = $_POST['move'];
        $_SESSION['moves']++;
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Fifteen Puzzle - PHP Version</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <h1>Fifteen Puzzle</h1>
    <form method="post">
        <div class="puzzle-area">
            <?php foreach ($_SESSION['tiles'] as $i => $tile): ?>
                <div class="tile">
                    <?php if ($tile !== ""): ?>
                        <button type="submit" name="move" value="<?= $tile ?>"><?= $tile ?></button>
                    <?php else: ?>
                        <div class="empty"></div>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
        <button type="submit" name="shuffle">Shuffle</button>
    </form>
    <p>Moves: <?= $_SESSION['moves'] ?></p>
</body>
</html>
