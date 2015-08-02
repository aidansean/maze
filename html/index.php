<?php
$title = 'Generic maze game' ;
include_once($_SERVER['FILE_PREFIX'] . '/_core/preamble.php') ;
?>

<div class="right">
  <h3>Maze game</h3>
  <div class="blurb">
    This page has a tile based game which is in development.  I have V1 which is for legacy and to test some features, and V2 which is eventually going to be the final game.
  </div>
</div>

<div class="right">
  <h3>Maze game V1</h3>
  <div class="blurb_with_icon">
    <div class="image">
      <a href="V1"><img class="icon" src="images/V1Thumb.png" alt="V1" /></a>
    </div>
    <p>Run around, speak to people and collect coins!</p> 
  </div>
</div>

<div class="right">
  <h3>Maze game V2</h3>
  <div class="blurb_with_icon">
    <div class="image">
      <a href="V2"><img class="icon" src="images/V2Thumb.png" alt="V2" /></a>
    </div>
    <p>Run around, exploring the island!</p> 
  </div>
</div>

<?php foot() ; ?>
