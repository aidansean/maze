var paintbrush = 1 ;
var scale = 1.0/2.0 ;
var copy_brush = 0 ;
var copy_cells = 0 ;
var   pad_door_flag = 0 ;
var lever_door_flag = 0 ;
var lever_dir = 'U' ;

var i_mouse_1 ;
var j_mouse_1 ;
var i_mouse_2 ;
var j_mouse_2 ;

var lever_A = -1 ;
var lever_B = -1 ;
var lever_i = -1 ;
var lever_j = -1 ;
var pad_A   = -1 ;
var pad_B   = -1 ;
var pad_i   = -1 ;
var pad_j   = -1 ;
var door_A  = -1 ;
var door_B  = -1 ;
var door_i  = -1 ;
var door_j  = -1 ;

function XY_from_mouse(evt){
  var rect = canvas.getBoundingClientRect() ;
  var root = document.documentElement ;
  var X = evt.clientX - rect.left - root.scrollLeft ;
  var Y = evt.clientY - rect.top - root.scrollTop   ;
  return [X,Y] ;
}

function map_mouseDown(evt){
  // Is it a right click?
  var rightclick;
  if(!evt) var evt = window.event ;
  if(evt.which) rightclick = (evt.which==3) ;
  else if(evt.button) rightclick = (evt.button==2) ;
  if(rightclick) copy_brush = true ;
  
  if(rightclick==false && copy_brush==true){ // Paste from the copied cells
    copy_brush = false ;
    var XY = XY_from_mouse(evt) ;
    i_mouse_1 = Math.floor(XY[0]/(scale*cellSize)) ;
    j_mouse_1 = Math.floor(XY[1]/(scale*cellSize)) ;
    for(var i=0 ; i<copy_cells.length ; i++){
      for(var j=0 ; j<copy_cells[i].length ; j++){
        master_map[player.B][player.A].cells[j_mouse_1+j][i_mouse_1+i] = copy_cells[i][j] ;
        cells[j_mouse_1+j][i_mouse_1+i] = copy_cells[i][j] ;
      }
    }
    draw_all() ;
    write_map() ;
    return ;
  }
  else{
    var XY = XY_from_mouse(evt) ;
    i_mouse_1 = Math.floor(XY[0]/(scale*cellSize)) ;
    j_mouse_1 = Math.floor(XY[1]/(scale*cellSize)) ;
    return ;
  }
}
function map_mouseUp(evt){
  // Work out where the user has clicked
  var XY = XY_from_mouse(evt) ;
  
  var XY = XY_from_mouse(evt) ;
  i_mouse_2 = Math.floor(XY[0]/(scale*cellSize)) ;
  j_mouse_2 = Math.floor(XY[1]/(scale*cellSize)) ;
  var i1 = Math.min(i_mouse_1,i_mouse_2) ;
  var i2 = Math.max(i_mouse_1,i_mouse_2) ;
  var j1 = Math.min(j_mouse_1,j_mouse_2) ;
  var j2 = Math.max(j_mouse_1,j_mouse_2) ;
  
  if(copy_brush==true){ // Copy and paste job
    copy_cells = [] ;
    for(var i=0 ; i<=i2-i1 ; i++){
      copy_cells.push([]) ;
      for(var j=0 ; j<=j2-j1 ; j++){
        copy_cells[i].push(cells[j1+j][i1+i]) ;
      }
    }
    draw_all() ;
    write_map() ;
    return ;
  }
  else{ // Normal assignment of cells
    for(var i=i1 ; i<=i2 ; i++){
      for(var j=j1 ; j<=j2 ; j++){
        if(paintbrush_type=='contents'){
          master_map[player.B][player.A].cell_contents[j][i] = paintbrush ;
        }
        else{
          master_map[player.B][player.A].cells[j][i] = paintbrush ;
          cells[j][i] = paintbrush ;
        }
      }
    }
    populate_rooms() ;
    //change_room(player.A,player.B) ;
    draw_all() ;
    write_map() ;
   return ;
  }
}

function write_map(){
  var str = [] ;
  str.push('var master_map = [') ;
  for(var B=0 ; B<master_map.length ; B++){
    str.push('  [') ;
    for(var A=0 ; A<master_map[B].length ; A++){
      str.push( master_map[B][A].write_output() ) ;
      if(A<master_map[B].length-1) str.push('   ,') ;
    }
    str.push('  ]') ;
    if(B<master_map.length-1) str.push('   ,') ;
  }
  str.push('] ;') ;
  str = str.join('\n') ;
  document.getElementById('textarea_mastermap').value = str ;
}

function compass_move_N(){
  if(player.B==0){
    var nRooms = master_map[0].length ;
    var row = [] ;
    for(var i=0 ; i<nRooms ; i++){
      row.push(new room_object()) ;
    }
    master_map.splice(0,0,row) ;
    for(var i=0 ; i<pad_and_door_objects.length ; i++){
      pad_and_door_objects[i].B1++ ;
      pad_and_door_objects[i].B2++ ;
    }
    for(var i=0 ; i<lever_and_door_objects.length ; i++){
      lever_and_door_objects[i].B1++ ;
      lever_and_door_objects[i].B2++ ;
    }
  }
  else{
    player.B-- ;
  }
  populate_rooms() ;
  change_room(player.A,player.B) ;
  player.update_map() ;
  draw_all() ;
  update_all() ;
}
function compass_move_E(){
  if(player.A+1>=master_map[player.B].length){
    var nRooms = 0 ;
    for(var i=0 ; i<master_map.length ; i++){
      if(master_map[i].length>nRooms) nRooms = master_map[i].length ;
    }
    for(var i=0 ; i<master_map.length ; i++){
      for(var j=master_map[i].length ; j<=nRooms ; j++){
        master_map[i].push(new room_object()) ;
      }
    }
  }
  player.A++ ;
  populate_rooms() ;
  change_room(player.A,player.B) ;
  player.update_map() ;
  draw_all() ;
  update_all() ;
}
function compass_move_S(){
  if(player.B+1>=master_map.length){
    var nRooms = 0 ;
    for(var i=0 ; i<master_map.length ; i++){
      if(master_map[i].length>nRooms) nRooms = master_map[i].length ;
    }
    var row = [] ;
    for(var i=0 ; i<nRooms ; i++){
      row.push(new room_object()) ;
    }
    master_map.push(row) ;
  }
  player.B++ ;
  populate_rooms() ;
  change_room(player.A,player.B) ;
  player.update_map() ;
  draw_all() ;
  update_all() ;
}
function compass_move_W(){
  if(player.A<=0){
    for(var i=0 ; i<master_map.length ; i++){
      master_map[i].splice(0,0,new room_object()) ;
    }
    for(var i=0 ; i<pad_and_door_objects.length ; i++){
      pad_and_door_objects[i].A1++ ;
      pad_and_door_objects[i].A2++ ;
    }
    for(var i=0 ; i<lever_and_door_objects.length ; i++){
      lever_and_door_objects[i].A1++ ;
      lever_and_door_objects[i].A2++ ;
    }
  }
  else{
    player.A-- ;
  }
  populate_rooms() ;
  change_room(player.A,player.B) ;
  player.update_map() ;
  draw_all() ;
  update_all() ;
}
function update_room_name(){
  master_map[player.B][player.A].name = document.getElementById('input_room_name').value ;
  populate_rooms() ;
  change_room(player.A,player.B) ;
  player.update_map() ;
  draw_all() ;
  update_all() ;
  write_map() ;
}
function update_wallFillColor(){
  master_map[player.B][player.A].wallFillColor = document.getElementById('input_wallFillColor').value ;
  populate_rooms() ;
  change_room(player.A,player.B) ;
  player.update_map() ;
  draw_all() ;
  update_all() ;
  write_map() ;
}
function update_wallEdgeColor(){
  master_map[player.B][player.A].wallEdgeColor = document.getElementById('input_wallEdgeColor').value ;
  populate_rooms() ;
  change_room(player.A,player.B) ;
  player.update_map() ;
  draw_all() ;
  update_all() ;
  write_map() ;
}

function update_surrounding_rooms(){
  var canvas_N  = document.getElementById('canvas_N') ;
  var canvas_E  = document.getElementById('canvas_E') ;
  var canvas_S  = document.getElementById('canvas_S') ;
  var canvas_W  = document.getElementById('canvas_W') ;
  var context_NS = [canvas_N.getContext('2d'),canvas_S.getContext('2d')] ;
  for(var h=0 ; h<2 ; h++){
    var B_ = (h==0) ? player.B-1 : player.B+1 ;
    var j_ = (h==0) ? nRow-1 : 0 ;
    context_NS[h].fillStyle = 'rgb(255,255,255)' ;
    context_NS[h].fillRect(0,0,1000,100) ;
    for(var i=0 ; i<nCol ; i++){
      var m = get_master_map_cell(player.A,B_,i,j_) ;
      var t = get_thing(m) ;
      if(t.draw) t.draw(context_NS[h],i,0) ;
    }
  }
  var context_WE = [canvas_W.getContext('2d'),canvas_E.getContext('2d')] ;
  for(var h=0 ; h<2 ; h++){
    var A_ = (h==0) ? player.A-1 : player.A+1 ;
    var i_ = (h==0) ? nCol-1 : 0 ;
    context_WE[h].fillStyle = 'rgb(255,255,255)' ;
    context_WE[h].fillRect(0,0,100,1000) ;
    for(var j=0 ; j<nRow ; j++){
      var m = get_master_map_cell(A_,player.B,i_,j) ;
      var t = get_thing(m) ;
      if(t.draw) t.draw(context_WE[h],0,j) ;
    }
  }
}

function setup_thumbnails(){
  make_thumbnail('thumbnail_1_wall'   ) ;
  make_thumbnail('thumbnail_16_stone' ) ;
  make_thumbnail('thumbnail_90_sea'   ) ;
  make_thumbnail('thumbnail_91_fence' ) ;
  make_thumbnail('thumbnail_0_floor'  ) ;
  make_thumbnail('thumbnail_11_grass' ) ;
  make_thumbnail('thumbnail_12_sand'  ) ;
  make_thumbnail('thumbnail_13_wood'  ) ;
  make_thumbnail('thumbnail_40_tilebw') ;
  make_thumbnail('thumbnail_41_tileBB') ;
  make_thumbnail('thumbnail_14_pave'  ) ;
  make_thumbnail('thumbnail_15_gravel') ;
  make_thumbnail('thumbnail_50_stepsH') ;
  make_thumbnail('thumbnail_51_stepsV') ;
  
  make_thing_thumbnail('thumbnail_61_appleTree') ;
  make_thing_thumbnail('thumbnail_62_tree') ;
  
  make_thumbnail('thumbnail_30_travN') ;
  make_thumbnail('thumbnail_31_travE') ;
  make_thumbnail('thumbnail_32_travS') ;
  make_thumbnail('thumbnail_33_travW') ;
  make_thing_thumbnail('thumbnail_2_pb'    ) ;
  make_thing_thumbnail('thumbnail_21_gp1'  ) ;
  make_thing_thumbnail('thumbnail_22_gp2'  ) ;
  make_thing_thumbnail('thumbnail_23_gp5'  ) ;
  make_thing_thumbnail('thumbnail_101_bedRed') ;
  make_thing_thumbnail('thumbnail_103_bedBlue') ;
  
  make_floortype_thumbnail('thumbnail_floortype_0_floor'  ) ;
  make_floortype_thumbnail('thumbnail_floortype_11_grass' ) ;
  make_floortype_thumbnail('thumbnail_floortype_12_sand'  ) ;
  make_floortype_thumbnail('thumbnail_floortype_40_tilebw') ;
  make_floortype_thumbnail('thumbnail_floortype_41_tileBB') ;
}
function make_thumbnail(id, thing){
  var index = parseInt(id.split('_')[1]) ;
  if(undefined==thing) thing = get_thing(index) ;
  var  canvas_tb = document.getElementById(id) ;
  var context_tb = canvas_tb.getContext('2d') ;
  thing.draw(context_tb,0,0,true) ;
  canvas_tb.addEventListener('click',change_paintbrush) ;
}
function make_thing_thumbnail(id, thing){
  var index = parseInt(id.split('_')[1]) ;
  if(undefined==thing) thing = get_thing(index) ;
  var  canvas_tb = document.getElementById(id) ;
  var context_tb = canvas_tb.getContext('2d') ;
  thing.draw(context_tb,0,0,true) ;
  canvas_tb.addEventListener('click',change_thing_paintbrush) ;
}
function make_floortype_thumbnail(id, thing){
  var index = parseInt(id.split('_')[2]) ;
  if(undefined==thing) thing = get_thing(index) ;
  var  canvas_tb = document.getElementById(id) ;
  var context_tb = canvas_tb.getContext('2d') ;
  thing.draw(context_tb,0,0,true) ;
  canvas_tb.addEventListener('click',change_floortype) ;
}
function change_floortype(evt){
  var target ;
  if (!evt) var evt = window.event ;
  if(evt.target) target = evt.target ;
  else if(evt.srcElement) target = evt.srcElement ;
  if(target.nodeType==3) target = target.parentNode ;
  var index = target.id.split('_')[2] ;
  floor_type = parseInt(index) ;
  master_map[player.B][player.A].floor_type = floor_type ;
  var thing = get_thing(floor_type) ;
  var context_floortype = document.getElementById('current_floortype').getContext('2d') ;
  context_floortype.fillStyle = 'rgb(255,255,255)' ;
  context_floortype.fillRect(0,0,50,50) ;
  thing.draw(context_floortype,0,0) ;
  draw_all() ;
  write_map() ;
}

function change_paintbrush(evt, contents){
  paintbrush_type = (contents) ? 'contents' : 'cells' ;
  var target ;
  if (!evt) var evt = window.event ;
  if(evt.target) target = evt.target ;
  else if(evt.srcElement) target = evt.srcElement ;
  if(target.nodeType==3) target = target.parentNode ;
  var index = target.id.split('_')[1] ;
  paintbrush = parseInt(index) ;
  var thing = get_thing(paintbrush) ;
  var context_paintbrush = document.getElementById('current_floortype').getContext('2d') ;
  context_paintbrush.fillStyle = 'rgb(255,255,255)' ;
  context_paintbrush.fillRect(0,0,50,50) ;
  thing.draw(context_paintbrush,0,0) ;
  write_map() ;
}
function change_thing_paintbrush(evt){
  change_paintbrush(evt, true) ;
}



function start(){
  document.addEventListener('keydown', keyDown) ;
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
