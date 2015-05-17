function draw_all(){
  Math.seed = 6 ;
  context.fillStyle = 'rgb(255,255,255)' ;
  context.fillRect(0,0,w,h) ;
  draw_all_cells() ;
  draw_grid() ;
  draw_room_name() ;
  if(edit_mode) update_surrounding_rooms() ;
  for(var i=0 ; i<lever_and_door_objects.length ; i++){
    var l = lever_and_door_objects[i] ;
    var f = get_thing(room.floor_type) ;
    if(l.A1==p_A && l.B1==p_B) f.draw(context,l.i1,l.j1) ;
    if(l.A2==p_A && l.B2==p_B) f.draw(context,l.i2,l.j2) ;
    for(var j=1 ; j<=4 ; j++){ l.draw(j) ; }
  }
  for(var i=0 ; i<pad_and_door_objects.length ; i++){
    var p = pad_and_door_objects[i] ;
    var f = get_thing(room.floor_type) ;
    if(p.A1==p_A && p.B1==p_B) f.draw(context,p.i1,p.j1) ;
    if(p.A2==p_A && p.B2==p_B) f.draw(context,p.i2,p.j2) ;
    for(var j=1 ; j<=4 ; j++){ p.draw(j) ; }
  }
  for(var i=0 ; i<enemies.length ; i++){
    var e = enemies[i] ;
    if(e.A!=p_A || e.B!=p_B) continue ;
    e.draw(context, e.i, e.j) ;
  }
  draw_cell_contents() ;
}
function draw_room_name(){
  if(edit_mode==true) return ;
  var A = player.A-O_A ;
  var B = player.B-O_B ;
  Get('h2_room_name').style.backgroundColor = room.wallEdgeColor ;
  Get('span_room_name').innerHTML   = room.name ;
  Get('span_room_coords').innerHTML = '(' + A + ',' + B + ')' ;
}
function draw_grid(){
  context.lineWidth = 1 ;
  context.strokeStyle = 'rgb(200,200,200)' ;
  for(var i=0 ; i<nRow ; i++){
    for(var j=0 ; j<nCol ; j++){
      context.beginPath() ;
      context.strokeRect(j*cellSize,i*cellSize,cellSize-1,cellSize-1) ;
    }
  }
}
function draw_floors(){
  for(var i=0 ; i<nRow ; i++){
    for(var j=0 ; j<nCol ; j++){
      var value = get_master_map_cell(player.A,player.B,i,j) ;
      var t = get_thing(value) ;
      if(t.is_floor){
        t.draw(context,i,j) ;
      }
      else{
        get_thing(room.floor_type).draw(context, i, j) ;
      }
    }
  }
}
function draw_walls(){
  for(var i=0 ; i<nRow ; i++){
    for(var j=0 ; j<nCol ; j++){
      var value = get_cell(player.A,player.B,i,j) ;
      var t = get_thing(value) ;
      if(t.is_wall) t.draw(context,i,j) ;
    }
  }
}
function draw_cell_contents(){
  var values = get_room(player.A,player.B).cell_contents ;
  for(var i=0 ; i<nRow ; i++){
    for(var j=0 ; j<nCol ; j++){
      var value = get_cell_contents(player.A,player.B,i,j) ;
      if(value==0) continue ;
      var t = get_thing(value) ;
      if(t) t.draw(context,i,j) ;
    }
  }
}
function draw_all_cells(){
  draw_floors() ;
  for(var i=0 ; i<nRow ; i++){
    for(var j=0 ; j<nCol ; j++){
      if(cells[j][i]==0) continue ;
      value = cells[j][i] ;
      draw_cell(i,j,value) ;
    }
  }
  draw_walls() ;
}
function draw_cell(i,j,value){
  var thing = get_thing(value) ;
  if(thing!=0){
    if(thing.draw){ thing.draw(context,i,j) ; }
  }
}

function draw_dialogue_reponses(){
  //alert('*'+dialogue_chosen_response) ;
  for(var i=0 ; i<dialogue_responses.length ; i++){
    var div = Get('diaglogue_response_'+i) ;
    if(undefined==div) continue ;
    div.style.color           = (i==dialogue_chosen_response) ? 'white' : wall_edge_color ;
    div.style.backgroundColor = (i==dialogue_chosen_response) ? wall_edge_color : 'white' ;
  }
}

function draw_inventory(){
  return ;
  var div = Get('div_inventory') ;
  div.innerHTML = '' ;
  for(var i=0 ; i<player.inventory.length ; i++){
    var canvas = document.createElement('canvas') ;
    canvas.style.width  = 0.6*cellSize + 'px' ;
    canvas.style.height = 0.6*cellSize + 'px' ;
    canvas.width  = cellSize ;
    canvas.height = cellSize ;
    var context = canvas.getContext('2d') ;
    context.fillStyle = 'rgb(255,255,255)' ;
    context.fillRect(0,0,cellSize,cellSize) ;
    player.inventory[i].draw(context, 0, 0) ;
    div.appendChild(canvas) ;
  }
}

function reset_combat_table(){
  Get('td_combat_player_hp'     ).innerHTML = player.hit_points ;
  Get('td_combat_enemy_hp'      ).innerHTML = '' ;
  Get('td_combat_player_attack' ).innerHTML = '' ;
  Get('td_combat_enemy_attack'  ).innerHTML = '' ;
  Get('td_combat_player_defence').innerHTML = '' ;
  Get('td_combat_enemy_defence' ).innerHTML = '' ;
  
  Get('td_combat_player_hp'     ).className = 'combat_cell_inactive' ;
  Get('td_combat_enemy_hp'      ).className = 'combat_cell_inactive' ;
  Get('td_combat_player_attack' ).className = 'combat_cell_inactive' ;
  Get('td_combat_enemy_attack'  ).className = 'combat_cell_inactive' ;
  Get('td_combat_player_defence').className = 'combat_cell_inactive' ;
  Get('td_combat_enemy_defence' ).className = 'combat_cell_inactive' ;
  
  Get('th_combat_blank_1').className = 'combat_category_inactive' ;
  Get('th_combat_player' ).className = 'combat_cell_inactive'     ;
  Get('th_combat_enemy'  ).className = 'combat_cell_inactive'     ;
  Get('th_combat_HP'     ).className = 'combat_category_inactive' ;
  Get('th_combat_attack' ).className = 'combat_category_inactive' ;
  Get('th_combat_defence').className = 'combat_category_inactive' ;
}
function draw_combat_table(){
  var enemy = current_enemy ; // Restore some symmetry
  if(enemy==0) return ;
  Get('td_combat_player_hp'     ).innerHTML = player.hit_points ;
  Get('td_combat_enemy_hp'      ).innerHTML = enemy.hit_points  ;
  Get('td_combat_player_attack' ).innerHTML = player.attack_base  + ' &pm; ' + player.attack_blur  ;
  Get('td_combat_enemy_attack'  ).innerHTML = enemy.attack_base   + ' &pm; ' + enemy.attack_blur   ;
  Get('td_combat_player_defence').innerHTML = player.defence_base + ' &pm; ' + player.defence_blur ;
  Get('td_combat_enemy_defence' ).innerHTML = enemy.defence_base  + ' &pm; ' + enemy.defence_blur  ;
  Get('th_combat_enemy'         ).innerHTML = enemy.name     ;
  
  Get('td_combat_player_hp'     ).className = 'combat_cell' ;
  Get('td_combat_enemy_hp'      ).className = 'combat_cell' ;
  Get('td_combat_player_attack' ).className = 'combat_cell' ;
  Get('td_combat_enemy_attack'  ).className = 'combat_cell' ;
  Get('td_combat_player_defence').className = 'combat_cell' ;
  Get('td_combat_enemy_defence' ).className = 'combat_cell' ;
  
  Get('th_combat_blank_1').className = 'combat_category' ;
  Get('th_combat_player' ).className = 'combat_cell'     ;
  Get('th_combat_enemy'  ).className = 'combat_cell'     ;
  Get('th_combat_HP'     ).className = 'combat_category' ;
  Get('th_combat_attack' ).className = 'combat_category' ;
  Get('th_combat_defence').className = 'combat_category' ;
  
}

function draw_fade(){
  return ;
  context.save() ;
  context.fillStyle = fade_fill ;
  context.fillRect(0,0,w,h) ;
  context.restore() ;
}
