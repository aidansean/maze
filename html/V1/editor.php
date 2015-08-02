<?php $title = 'Generic maze game' ; ?>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/head_1.php') ; ?>
<title><?php echo $title ; ?></title>
<style type="text/css">
h2#h2_room_name{
  width  : 377px ;
}
canvas#editarea{
  width : 375px ;
  margin : auto ;
  border : 1px solid black ;
}
canvas#canvas_N, canvas#canvas_S{
  width : 375px ;
  height : 25px ;
}
canvas#canvas_W, canvas#canvas_E{
  width : 25px ;
  height : 375px ;
}
canvas.thumbnail{
  width : 25px ;
  height : 25px ;
}
h2#h2_room_name{
  margin-top : 20px ;
  margin-bottom : 5px ;
  color : white ;
  padding-top : 0.5em ;
  padding-bottom : 0.5em ;
  background-color : black ;
  font-family : arial , sans-serif ;
  font-style : normal ;
}
table{
  margin-top : 20px ;
}
td#compass_N, td#compass_E, td#compass_S, td#compass_W{
  background-color : red ;
  color : white ;
  text-align : center ;
  font-size : 20px ;
  border : 2px solid red ;
}
td#compass_N:hover, td#compass_E:hover, td#compass_S:hover, td#compass_W:hover{
  background-color : white ;
  color : red ;
}
td#compass_E, td#compass_W{
  width : 30px ;
}
td#compass_E, td#compass_W{
  height : 30px ;
}
td#td_tb{
  width : 400px ;
}
</style>
<script>
var canvas  = 0 ;
var context = 0 ;
var w = 750 ;
var h = 750 ;
var cellSize = 50 ;
var nRow = h/cellSize ;
var nCol = w/cellSize ;
var fontSize = 0.4*cellSize ;

var room = 0 ;
var cells = 0 ;
var cells_revert = 0 ;
var player = 0 ;
var edit_mode = true ;

var wall_edge_color = 'rgb(255,  0,  0)' ;
var wall_fill_color = 'rgb(255,200,200)' ;
</script>
<script src="js.php"></script>
<script src="editor.js"></script>
<script>
var p_i = 3 ;
var p_j = 2 ;
var p_A = 0 ;
var p_B = 0 ;

function start(){
  document.addEventListener("keydown"  , keyDown      ) ;
  document.getElementById('editarea' ).addEventListener("mousedown", map_mouseDown) ;
  document.getElementById('editarea' ).addEventListener("mouseup"  , map_mouseUp  ) ;
  document.getElementById('editarea' ).oncontextmenu = function() { return false } ;
  document.getElementById('compass_N').addEventListener("click", compass_move_N) ;
  document.getElementById('compass_E').addEventListener("click", compass_move_E) ;
  document.getElementById('compass_S').addEventListener("click", compass_move_S) ;
  document.getElementById('compass_W').addEventListener("click", compass_move_W) ;
  document.getElementById('input_room_name').addEventListener("change", update_room_name) ;
  document.getElementById('input_wallFillColor').addEventListener("change", update_wallFillColor) ;
  document.getElementById('input_wallEdgeColor').addEventListener("change", update_wallEdgeColor) ;
  
  document.getElementById('input_pad_door_flag'        ).addEventListener("click",  update_pad_door_flag  ) ;
  document.getElementById('input_reset_pad_door_flag'  ).addEventListener("click",   reset_pad_door_flag  ) ;
  document.getElementById('input_lever_door_flag_N'    ).addEventListener("click",update_lever_door_flag_N) ;
  document.getElementById('input_lever_door_flag_E'    ).addEventListener("click",update_lever_door_flag_E) ;
  document.getElementById('input_lever_door_flag_S'    ).addEventListener("click",update_lever_door_flag_S) ;
  document.getElementById('input_lever_door_flag_W'    ).addEventListener("click",update_lever_door_flag_W) ;
  document.getElementById('input_reset_lever_door_flag').addEventListener("click", reset_lever_door_flag)   ;
  
  canvas = document.getElementById('editarea') ;
  context = canvas.getContext('2d') ;
  player = new player_object() ;
  player.set_coords(p_A,p_B,p_i,p_j) ;
  player.update_map() ;
  player.ghost_mode = true ;
  change_room(p_A,p_B) ;
  setup_thumbnails() ;
  draw_all() ;
}
function update_all(){
  document.getElementById('td_gold').innerHTML = player.gp ;
}

</script>
</head>
<body onload="start()">
<?php include($_SERVER['DOCUMENT_ROOT'] . '/head_2.php') ; ?>

<div id="large_wrapper">
  <!-- Tables in tables.  This feels so wrong. -->
  <table>
    <tbody>
      <tr>
        <td>
		  <table>
			<tbody>
			  <tr>
			    <td></td>
				<td></td>
				<td>
				  <input type="text" id="input_room_name" value=""/>
				</td>
				<td></td>
				<td></td>
			  </tr>
			  <tr>
				<td></td>
				<td></td>
				<td id="compass_N">N</td>
				<td></td>
				<td></td>
			  </tr>
			  <tr>
			    <td></td>
				<td></td>
				<td><canvas id="canvas_N" width="750" height="50"></canvas></td>
				<td></td>
				<td></td>
			  </tr>
			  <tr>
				<td id="compass_W">W</td>
				<td><canvas id="canvas_W" width="50" height="750"></canvas></td>
				<td><canvas id="editarea" width="750" height="750"></canvas></td>
				<td><canvas id="canvas_E" width="50" height="750"></canvas></td>
				<td id="compass_E">E</td>
			  </tr>
			  <tr>
			    <td></td>
				<td></td>
				<td><canvas id="canvas_S" width="750" height="50"></canvas></td>
				<td></td>
				<td></td>
			  </tr>
			  <tr>
				<td></td>
				<td></td>
				<td id="compass_S">S</td>
				<td></td>
				<td></td>
			  </tr>
			</tbody>
		  </table>
		</td>
		<td id="td_tb">
		  <h3>Current paintbrush and floor type</h3>
		  <canvas id="current_paintbrush" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="current_floortype"  class="thumbnail" width="50" height="50"></canvas>
		  <h3>Walls</h3>
		  <canvas id="thumbnail_1_wall" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_90_sea" class="thumbnail" width="50" height="50"></canvas>
		  <h3>Floors</h3>
		  <canvas id="thumbnail_0_floor"   class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_11_grass"  class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_12_sand"   class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_40_tilebw" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_41_tileBB" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_30_travN"  class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_31_travE"  class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_32_travS"  class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_33_travW"  class="thumbnail" width="50" height="50"></canvas>
		  <h3>Objects</h3>
		  <canvas id="thumbnail_2_pb"   class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_21_gp1" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_22_gp2" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_23_gp5" class="thumbnail" width="50" height="50"></canvas>
		  <h3>Doors</h3>
		  <input type="submit" id="input_pad_door_flag" value="Add pad and door"/>
		  <input type="submit" id="input_reset_pad_door_flag" value="undo"/>
		  <br />
		  <input type="submit" id="input_lever_door_flag_N" value="Add lever and door (N)"/><br />
		  <input type="submit" id="input_lever_door_flag_E" value="Add lever and door (E)"/><br />
		  <input type="submit" id="input_lever_door_flag_S" value="Add lever and door (S)"/><br />
		  <input type="submit" id="input_lever_door_flag_W" value="Add lever and door (W)"/><br />
		  <input type="submit" id="input_reset_lever_door_flag"value="undo"/>
		  <h3>Colours</h3>
		  Wall fill: <input type="text" id="input_wallFillColor" value="rgb(200,200,200)"/><br />
		  Wall edge: <input type="text" id="input_wallEdgeColor" value="rgb(100,100,100)"/>
		  <h3>Floor type:<h3>
		  <canvas id="thumbnail_floortype_0_floor"   class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_floortype_11_grass"  class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_floortype_12_sand"   class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_floortype_40_tilebw" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_floortype_41_tileBB" class="thumbnail" width="50" height="50"></canvas>
		</td>
	  </tr>
	</tbody>
  </table>
</div>
<div class="right">
  <div id="div_dialogue">
    <span id="span_dialogue_visible"></span>
    <span id="span_dialogue_invisible"></span>
    <span id="span_dialogue_padding"></span>
    <div id="div_dialogue_response_wrapper"></div>
  </div>
  <table>
    <tbody>
      <tr>
        <th>Gold pieces</th>
        <td id="td_gold">0</td>
      </tr>
    </tbody>
  </table>
  
  <textarea id="textarea_mastermap" rows="20" cols="80"></textarea>
  
</div>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/foot.php') ; ?>
