<?php
$title = 'Generic maze game' ;
$stylesheets = array('style.css','style_editor.css') ;
$js_scripts  = array('js/editor_settings.js','js.php','js/editor.js') ;
include($_SERVER['FILE_PREFIX'] . '/_core/preamble.php') ;
?>

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
		  <canvas id="thumbnail_1_wall"   class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_16_stone" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_90_sea"   class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_91_fence" class="thumbnail" width="50" height="50"></canvas>
		  <h3>Floors</h3>
		  <canvas id="thumbnail_0_floor"   class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_11_grass"  class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_12_sand"   class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_13_wood"   class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_14_pave"   class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_15_gravel" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_40_tilebw" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_41_tileBB" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_50_stepsH" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_51_stepsV" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_30_travN"  class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_31_travE"  class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_32_travS"  class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_33_travW"  class="thumbnail" width="50" height="50"></canvas>
		  <h3>Objects</h3>
		  <canvas id="thumbnail_2_pb"   class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_21_gp1" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_22_gp2" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_23_gp5" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_101_bedRed" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_103_bedBlue" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_61_appleTree" class="thumbnail" width="50" height="50"></canvas>
		  <canvas id="thumbnail_62_tree" class="thumbnail" width="50" height="50"></canvas>
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
  <h3>Inventory</h3>
    <div id="div_inventory"></div>
    
    <h3>Descriptor</h3>
    <div id="div_descriptor"></div>
  
</div>
<?php foot() ; ?>
