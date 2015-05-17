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
  var value = 0 ;
  if(dA==0 && dB==0){
    value = cells[player.j+dj][player.i+di] ;
    if(!is_traversable(value)) return ;
  }
  else{
    value = get_cell(player.A+dA,player.B+dB,player.i+di,player.j+dj) ;
    if(!is_traversable(value)) return ;
  }
  
  var i = player.i ;
  var j = player.j ;
  var m = get_master_map_cell(player.A,player.B,i,j) ;
  m = (m==0) ? room.floor_type : m ;
  
  // Travelators
  if(m==30 && ((dj+nRow)%nRow)!= nRow-1) return ;
  if(m==31 && ((di-nCol)%nCol)!=-nCol+1) return ;
  if(m==32 && ((dj-nRow)%nRow)!=-nRow+1) return ;
  if(m==33 && ((di+nCol)%nCol)!= nCol-1) return ;
  
  // Conversations
  m = get_master_map_cell(player.A,player.B,i+di,j+dj) ;
  if(m<9000 || m>=10000){
    interupt_dialogue() ;
    clear_dialogue() ;
    current_npc = -1 ;
    dialogue_step =-1 ;
  }
  
  var success = interact(value,di,dj) ;
  if(!success) return ;
  
  m = get_master_map_cell(player.A,player.B,i,j) ;
  cells[j][i] = (is_pushable_traversable(m)) ? m : 0 ;
  if(dA!=0 || dB!=0){
    var A = player.A + dA ;
    var B = player.B + dB ;
    change_room(A,B,di,dj) ;
  }
  
  m = get_master_map_cell(player.A,player.B,i,j) ;
  if(m>=1000 && m<2000) pad_and_door_objects[m%1000].interact(di,dj) ;
  
  player.i += di ;
  player.j += dj ;
  player.A += dA ;
  player.B += dB ;
  
  if(dialogue_step>=0 && dialogue_step<dialogue_text.length) interupt_dialogue() ;
  
  player.update_map() ;
  draw_all() ;
  update_all() ;
  if(player.gp==all_gp && completed_game==false){
    completed_game = true ;
    alert("Congratulations!  You have found all of the gold pieces.  I hope you enjoyed playing this game as much as I enjoyed making it.") ;
  }
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