<?php
$title = 'Generic maze game' ;
$stylesheets = array('style.css') ;
$js_scripts  = array('js.php') ;
include_once($_SERVER['DOCUMENT_ROOT'] . '/_core/preamble.php') ;
?>
<script>
function start(){
  document.addEventListener("keydown", keyDown) ;
  canvas = document.getElementById('playarea') ;
  context = canvas.getContext('2d') ;
  
  change_room(p_A,p_B) ;
  player = new player_object() ;
  player.set_coords(p_A,p_B,p_i,p_j) ;
  player.update_map() ;
  
  draw_all() ;
  reset_combat_table() ;
  
  all_gp = count_gold_on_map() ;
}
function update_all(){
  document.getElementById('td_gold').innerHTML = player.gp ;
}
</script>

<div id="game_wrapper">
  <div id="playarea_wrapper">
    <h2 id="h2_room_name"><span id="span_room_name"></span> <span id="span_room_coords"></span></h2>
    <canvas id="playarea" width="750" height="750"></canvas>
   
    <div id="div_dialogue">
      <span id="span_dialogue_visible"></span>
      <span id="span_dialogue_invisible"></span>
      <span id="span_dialogue_padding"></span>
      <div id="div_dialogue_response_wrapper"></div>
    </div>
  </div>
  
  <div id="stats_wrapper">
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
  </div>
</div>
<?php foot() ; ?>
