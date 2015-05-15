function draw_all(){
  Math.seed = 6 ;
  context.fillStyle = 'rgb(255,255,255)' ;
  context.fillRect(0,0,w,h) ;
  draw_grid() ;
  draw_all_cells() ;
  draw_cell_contents() ;
  draw_room_name() ;
  if(edit_mode) update_surrounding_rooms() ;
  draw_fade() ;
   draw_inventory() ;
}
function draw_room_name(){
  if(edit_mode==true) return ;
  var A = player.A-O_A ;
  var B = player.B-O_B ;
  Get('h2_room_name').style.backgroundColor = room.wallEdgeColor ;
  Get('span_room_name').innerHTML   = (spotlight_mode==true) ? '&nbsp;' : room.name ;
  Get('span_room_coords').innerHTML = (spotlight_mode==true) ? '&nbsp;' : '(' + A + ',' + B + ')' ;
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
      if(t.is_floor){ t.draw(context,i,j) ; }
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
  if(spotlight_mode){
    // Draw the spotlight around the player
    context.save() ;
    var x1 = (player.i+0.5)*cellSize ;
    var y1 = (player.j+0.5)*cellSize ;
    var r1 =   cellSize ;
    var r2 = 3*cellSize ;
    var gradient = context.createRadialGradient(x1,y1,r1,x1,y1,r2) ;
    //gradient.addColorStop(0,'rgba(255,255,0,0)') ;
    gradient.addColorStop(0,'rgba(255,255,255,0.0)') ;
    gradient.addColorStop(1,'rgba(  0,  0,  0,0.85)') ;
    
    // Fill with spotlight gradient
    context.fillStyle = gradient ;
    context.fillRect(0,0,w,h) ;
    context.restore() ;
    
    // Pixel manipulation
    // Sloooooooooow!
    if(false){
      var d = 10 ;
      var sigma = 2*cellSize ;
      for(var x=0 ; x<w ; x+=d){
        for(var y=0 ; y<h ; y+=d){
          var dx  = x-(player.i+0.5)*cellSize ;
          var dy  = y-(player.j+0.5)*cellSize ;
          var dr2 = dx*dx + dy*dy ;
          var a = 1-Math.exp(-dr2/(sigma*sigma)) ;
          context.fillStyle = 'rgba(0,0,0,'+a+')' ;
          context.fillRect(x,y,d,d) ;
        }
      }
    }
  
    // Draw lampposts
    for(var i=0 ; i<nRow ; i++){
      break ;
      for(var j=0 ; j<nCol ; j++){
        var value = get_cell_contents(player.A,player.B,i,j) ;
        if(value==201){
          context.save() ;
          var x1 = (i+0.5)*cellSize ;
          var y1 = (j+0.5)*cellSize ;
          var r1 =   cellSize ;
          var r2 = 3*cellSize ;
          var gradient = context.createRadialGradient(x1,y1,r1,x1,y1,r2) ;
          gradient.addColorStop(0,'rgba(255,255,255,0.1)') ;
          gradient.addColorStop(1,'rgba(  0,  0,  0,1)') ;
          
          // Fill with spotlight gradient
          context.fillStyle = gradient ;
          context.fillRect((i-1)*cellSize,(j-1)*cellSize,3*cellSize,3*cellSize) ;
          context.restore() ;
        }
      }
    }
   
    
  }
  
  context.save() ;
  context.fillStyle = fade_fill ;
  context.fillRect(0,0,w,h) ;
  context.restore() ;
}
