<?php
$title = 'Island Quest' ;
$stylesheets = array('style.css') ;
$js_scripts  = array('js/settings.js' , 'js.php' ) ;
include($_SERVER['FILE_PREFIX'] . '/_core/preamble.php') ;
?>
<div id="game_wrapper">
  <div id="playarea_wrapper">
    <h2 id="h2_room_name"><span id="span_room_name"></span> <span id="span_room_coords"></span></h2>
    <canvas id="playarea" width="750" height="750" style="width:450px;height:450px"></canvas>
   
    <div id="div_dialogue">
      <span id="span_dialogue_visible"></span>
      <span id="span_dialogue_invisible"></span>
      <span id="span_dialogue_padding"></span>
      <div id="div_dialogue_response_wrapper"></div>
    </div>
  </div>
  
  <div id="stats_wrapper">
    <h3>Combat</h3>
    <table id="table_combat">
      <tbody>
        <tr>
          <th id="th_combat_blank_1" class="combat_category"></th>
          <th id="th_combat_player" class="combat_cell">Player</th>
          <th id="th_combat_enemy" class="combat_cell">Enemy</th>
        </tr>
        <tr>
          <th id="th_combat_HP" class="combat_category">HP</th>
          <td id="td_combat_player_hp" class="combat_cell">100</th>
          <td id="td_combat_enemy_hp"  class="combat_cell"></th>
        </tr>
        <tr>
          <th id="th_combat_attack" class="combat_category">Attack</th>
          <td id="td_combat_player_attack" class="combat_cell"></th>
          <td id="td_combat_enemy_attack"  class="combat_cell"></th>
        </tr>
        <tr>
          <th id="th_combat_defence" class="combat_category">Defence</th>
          <td id="td_combat_player_defence" class="combat_cell"></th>
          <td id="td_combat_enemy_defence"  class="combat_cell"></th>
        </tr>
      </tbody>
    </table>
    <table>
      <tbody>
        <tr>
          <th>Gold pieces</th>
          <td id="td_gold">0</td>
        </tr>
      </tbody>
    </table>
    
    <h3>Music</h3>
    <iframe width="250" height="25" src="//www.youtube.com/embed/kcd70I_Q0No" frameborder="1"></iframe>
    <iframe width="250" height="25" src="//www.youtube.com/embed/UzpcCevmmRs" frameborder="1"></iframe>
    
    <h3>Inventory</h3>
    <div id="div_inventory"></div>
    
    <h3>Descriptor</h3>
    <div id="div_descriptor"></div>
  </div>
</div>

<audio id="audio_sword">
  <source src="sounds/Swords_Collide-Sound_Explorer-2015600826.mp3" type="audio/mpeg">
  <embed height="50" width="100" src="sounds/Swords_Collide-Sound_Explorer-2015600826.mp3">
</audio>
<audio id="audio_clang">
  <source src="sounds/Metal_Clang-SoundBible.com-19572601.mp3" type="audio/mpeg">
  <embed height="50" width="100" src="sounds/Metal_Clang-SoundBible.com-19572601.mp3">
</audio>
<audio id="audio_Wilhelm">
  <source src="sounds/WilhelmScream_vbr.mp3" type="audio/mpeg">
  <embed height="50" width="100" src="sounds/WilhelmScream_vbr.mp3">
</audio>
<audio id="audio_pindrop">
  <source src="sounds/pin_dropping-Brian_Rocca-2084700791.mp3" type="audio/mpeg">
  <embed height="50" width="100" src="sounds/pin_dropping-Brian_Rocca-2084700791.mp3">
</audio>
<audio id="audio_coinget1">
  <source src="sounds/coin_get_1.wav" type="audio/wav">
  <embed height="50" width="100" src="sounds/coin_get_1.wav">
</audio>
<audio id="audio_smbcoin">
  <source src="sounds/coin_get_2.wav" type="audio/wav">
  <embed height="50" width="100" src="sounds/coin_get_2.wav">
</audio>
<audio id="audio_runningwater" loop>
  <source src="sounds/fountain1.wav" type="audio/wav">
  <embed height="50" width="100" src="sounds/fountain1.wav">
</audio>
<audio id="audio_bubbles1" loop>
  <source src="sounds/bubbles_1.mp3" type="audio/mpeg">
  <embed height="50" width="100" src="sounds/bubbles1.mp3">
</audio>
<audio id="audio_bubbles2" loop>
  <source src="sounds/bubbles_2.mp3" type="audio/mpeg">
  <embed height="50" width="100" src="sounds/bubbles2.mp3">
</audio>



<?php foot() ; ?>
