function keyDown(evt){
  var keyDownID = window.event ? event.keyCode : (evt.keyCode != 0 ? evt.keyCode : evt.which) ;
  
  switch(keyDownID){
    case 37: evt.preventDefault() ; break ; // left
    case 38: evt.preventDefault() ; break ; // up
    case 39: evt.preventDefault() ; break ; // right
    case 40: evt.preventDefault() ; break ; // down
    case 27: evt.preventDefault() ; break ; // esc
    case 32: evt.preventDefault() ; break ; // space
  }
  
  if(edit_mode) return ;
  if(in_combat) return ;
  
  if(dialogue_waiting_for_response){
    interupt_dialogue() ;
    switch(keyDownID){
      case 38: case 87: dialogue_change_prev_response()    ; break ; // up
      case 40: case 83: dialogue_change_next_response()    ; break ; // down
      case 27:          dialogue_choose_default_response() ; break ; // esc
      case 13:          dialogue_choose_current_response() ; break ; // enter
    }
    return ;
  }
  else{
    switch(keyDownID){
      case 37: case 65: try_move_W() ; break ; // left
      case 38: case 87: try_move_N() ; break ; // up
      case 39: case 68: try_move_E() ; break ; // right
      case 40: case 83: try_move_S() ; break ; // down
      case 27: reset_room() ;          break ; // esc
      case 32: interupt_dialogue()   ; break ; // space
    }
  }
}
function move_player(di,dj,dA,dB){
  if(napping) return ;
  var A = player.A ;
  var B = player.B ;
  var i = player.i ;
  var j = player.j ;
  
  if(!is_traversable(get_cell(A+dA,B+dB,i+di,j+dj))) return ;
  
  // r for room
  // c for contents
  var r  = get_master_map_cell(A,B,i,j) ;
  var dr = get_master_map_cell(A,B,i+di,j+dj) ;
  var c  = get_cell_contents(A+dA,B+dB,i,j) ;
  var dc = get_cell_contents(A+dA,B+dB,i+di,j+dj) ;
  r = (r==0) ? room.floor_type : r ;
  
  // Travelators
  if((r==30 || dr==30) && ((dj+nRow)%nRow)!= nRow-1) return ;
  if((r==31 || dr==31) && ((di-nCol)%nCol)!=-nCol+1) return ;
  if((r==32 || dr==32) && ((dj-nRow)%nRow)!=-nRow+1) return ;
  if((r==33 || dr==33) && ((di+nCol)%nCol)!= nCol-1) return ;
  
  // Conversations
  if(dc<9000 || dc>=10000){
    interupt_dialogue() ;
    clear_dialogue() ;
    current_npc   = -1 ;
    dialogue_step = -1 ;
  }
  
  dialogue_waiting_for_response = false ;
  var success = interact(dc,di,dj) ;
  if(!success) return ;
  
  if(dialogue_step>=0 && dialogue_step<dialogue_text.length) interupt_dialogue() ;
  
  cells[j][i] = (is_pushable_traversable(r) || is_steps(r)) ? r : room.floor_type ;
  set_cell_contents(A,B,i,j,0) ;
  if(dA!=0 || dB!=0){
    var A = player.A + dA ;
    var B = player.B + dB ;
    change_room(A,B,di,dj) ;
  }
  if(c>=1000 && c<2000) pad_and_door_objects[c%1000].interact(di,dj) ;
  
  player.i += di ;
  player.j += dj ;
  player.A += dA ;
  player.B += dB ;
  
  update_grass() ;
  for(var i=0 ; i<control_listeners.length ; i++){
    var c = control_listeners[i] ;
    if(player.i==c[0] && player.j==c[1]) eval(c[2]) ;
  }
  
  player.update_map() ;
  draw_all() ;
  update_all() ;
  if(spotlight_mode){ player.smiling = false ; }
  else{ player.smiling = true  ; }
}
function try_move_N(){
  var dA = 0 ; var di = 0 ;
  var dB = (player.j==0) ? -1 : 0 ;
  var dj = -dB*nRow-1 ;
  move_player(di,dj,dA,dB) ;
}
function try_move_S(){
  var dA = 0 ; var di = 0 ;
  var dB = (player.j==nRow-1) ? 1 : 0 ;
  var dj = -dB*nRow+1 ;
  move_player(di,dj,dA,dB) ;
}
function try_move_W(){
  var dA = (player.i==0) ? -1 : 0 ;
  var di = -dA*nCol-1 ;
  var dB = 0 ; var dj = 0 ;
  move_player(di,dj,dA,dB) ; 
}
function try_move_E(){
  var dA = (player.i==nCol-1) ? 1 : 0 ;
  var di = -dA*nCol+1 ;
  var dB = 0 ; var dj = 0 ;
  move_player(di,dj,dA,dB) ;
}

var control_listeners = [] ;
function add_control_listener(i,j,code){
  control_listeners.push([i,j,code]) ;
}



function is_right_click(e){
  // Is it a right click?
  var rightclick ;
  if(!e) var e = window.event ;
  if     (e.which ) rightclick = (e.which ==3) ;
  else if(e.button) rightclick = (e.button==2) ;
  return rightclick ;
}
function get_mouse_xy(e){
  var x = e.pageX - Get('playarea').offsetLeft ;
  var y = e.pageY - Get('playarea').offsetTop  ;
  return [x,y] ;
}
function get_mouse_ij(e){
  var xy = get_mouse_xy(e) ;
  var i = Math.floor((xy[0]*w/cw)/cellSize) ;
  var j = Math.floor((xy[1]*h/ch)/cellSize) ;
  return [i,j] ;
}
function mouseMove(e){
  if(spotlight_mode) return ;
  var ij = get_mouse_ij(e) ;
  var cell          =          get_cell(player.A,player.B,ij[0],ij[1]) ;
  var cell_contents = get_cell_contents(player.A,player.B,ij[0],ij[1]) ;
  var cell_desc          = get_description_of_thing(cell) ;
  var cell_contents_desc = (cell_contents==0) ? '' : get_description_of_thing(cell_contents) ;
  if(cell_desc=='' && cell_contents_desc==''){
    Get('div_descriptor').innerHTML = '' ;
    return ;
  }
  else if(cell_contents_desc==''){
    Get('div_descriptor').innerHTML = cell_desc ;
  }
  else{
     Get('div_descriptor').innerHTML = cell_contents_desc + ' (' + cell_desc + ')' ;
  }
}
function mouseOut(e){
  Get('div_descriptor').innerHTML = '' ;
}
