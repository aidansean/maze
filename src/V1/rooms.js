// map refers to the array containing the rooms
// ie rooms[B][A].cells[j][i] is part of the map
// atlas refers to the list of rooms
// ie rooms[B][A] is part of the atlas

function room_object(cells,name,wallEdgeColor,wallFillColor,floor_type){
  this.wallEdgeColor = (undefined==wallEdgeColor) ? 'rgb(  0,  0,  0)' : wallEdgeColor ;
  this.wallFillColor = (undefined==wallEdgeColor) ? 'rgb(200,200,200)' : wallFillColor ;
  this.name = (undefined==name) ? 'Nothingness' : name ;
  this.floor_type = (undefined==floor_type) ? 0 : floor_type ;
  //if(this.name=='Entryway') alert(this.name+' '+floor_type+' '+this.floor_type) ;
  
  if(undefined==cells){
    this.cells = new Array() ;
    for(var i=0 ; i<nCol ; i++){
      this.cells.push(new Array()) ;
      for(var j=0 ; j<nRow ; j++){
        var value = 0 ;
        this.cells[i][j] = value ;
      }
    }
  }
  else{
    this.cells = cells ;
  }
  this.clone = function(){
    var room_clone = new room_object() ;
    var cells_clone = new Array() ;
    for(var j=0 ; j<nRow ; j++){
      cells_clone.push(new Array()) ;
      for(var i=0 ; i<nCol ; i++){
        cells_clone[j].push(this.cells[j][i]*1) ;
      }
    }
    room_clone.cells = cells_clone ;
    room_clone.name = this.name ;
    room_clone.wallEdgeColor = this.wallEdgeColor ;
    room_clone.wallFillColor = this.wallFillColor ;
    room_clone.floor_type = this.floor_type ;
    return room_clone ;
  }
  this.write_output = function(){
    var str = [] ;
    str.push("    new room_object(") ;
    str.push("      [") ;
    for(var i=0 ; i<this.cells.length ; i++){
      var str_row = [] ;
      str_row.push('       [') ;
      for(var j=0 ; j<this.cells[i].length ; j++){
        if(j==this.cells[i].length-1){ str_row.push(this.cells[i][j]) ; }
        else{ str_row.push(this.cells[i][j]+',') ; }
      }
      str_row.push(']') ;
      if(i!=this.cells.length-1) str_row.push(',') ;
      str_row = str_row.join('') ;
      str.push(str_row) ;
    }
    str.push('      ],') ;
    str.push('      "'+this.name+'","'+this.wallEdgeColor+'","'+this.wallFillColor+'",'+this.floor_type+')') ;
    str = str.join('\n') ;
    return str ;
  }
}

var blank_room = new room_object() ;
function get_room(A,B){
  if(B<0 || B>=rooms.length   ) return blank_room ;
  if(A<0 || A>=rooms[B].length) return blank_room ;
  return rooms[B][A] ;
}
function coords_W(A,B,i,j){ return (i<=0     ) ? [A-1,B,nCol-1,j] : [A,B,i-1,j] ; }
function coords_E(A,B,i,j){ return (i>=nCol-1) ? [A+1,B,     0,j] : [A,B,i+1,j] ; }
function coords_N(A,B,i,j){ return (j<=0     ) ? [A,B-1,nRow-1,j] : [A,B,i,j-1] ; }
function coords_S(A,B,i,j){ return (j>=nRow-1) ? [A,B+1,     0,j] : [A,B,i,j+1] ; }
function get_cell_coords(A,B,i,j){
  if(i< 0   ){ i = nCol-1 ; A-- ; }
  if(i>=nCol){ i = 0      ; A++ ; }
  if(j< 0   ){ j = nRow-1 ; B-- ; }
  if(j>=nRow){ j = 0      ; B++ ; }
  var room_tmp = get_room(A,B) ;
  if(j<0 || j>=room_tmp.cells.length) return -1 ;
  if(i<0 || i>=room_tmp.cells[j].length) return -1 ;
  return [A,B,i,j] ;
}
function get_cell(A,B,i,j){
  if(     i<0    ){ i = nCol+i ; A-- ; }
  else if(i>=nCol){ i = i-nCol ; A++ ; }
  if(     j<0    ){ j = nRow+j ; B-- ; }
  else if(j>=nRow){ j = j-nRow ; B++ ; }
  var room_tmp = get_room(A,B) ;
  return room_tmp.cells[j][i] ;
}
function set_cell(A,B,i,j,value){
  if(i< 0   ){ i = nCol+i ; A-- ; }
  if(i>=nCol){ i = i-nCol ; A++ ; }
  if(j< 0   ){ j = nRow+j ; B-- ; }
  if(j>=nRow){ j = j-nRow ; B++ ; }
  var room_tmp = get_room(A,B) ;
  room_tmp.cells[j][i] = value ;
}

function change_room(A,B,di,dj){
  player.i_in = player.i+di ;
  player.j_in = player.j+dj ;
  player.gp_current_room = 0 ;
  room = get_room(A,B) ;
  wall_edge_color = room.wallEdgeColor ;
  wall_fill_color = room.wallFillColor ;
  cells = room.cells ;
  backup_cells() ;
  draw_room_name() ;
  update_dialogue_box_style() ;
  clear_dialogue() ;
  
  for(var i=0 ; i<pad_and_door_objects.length ; i++){
    var p = pad_and_door_objects[i] ;
    if(p.A1==player.A && p.B1==player.B) p.door_status_in = p.door_status ;
  }
  for(var i=0 ; i<lever_and_door_objects.length ; i++){
    var l = lever_and_door_objects[i] ;
    if(l.A1==player.A && l.B1==player.B) l.door_status_in = l.door_status ;
  }
}
function backup_cells(){
  cells_revert = new Array() ;
  for(var i=0 ; i<cells.length ; i++){
    cells_revert.push(new Array()) ;
    for(var j=0 ; j<cells.length ; j++){
      cells_revert[i].push(cells[i][j]) ;
    }
  }
}
function reset_room(){
  player.gp -= player.gp_current_room ;
  player.gp_current_room = 0 ;
  for(var i=0 ; i<cells.length ; i++){
    for(var j=0 ; j<cells.length ; j++){
      cells[i][j] = cells_revert[i][j] ;
    }
  }
  player.i = player.i_in ;
  player.j = player.j_in ;
  cells[player.j][player.i] = 99 ;
  // Reset pressure pads
  for(var i=0 ; i<pad_and_door_objects.length ; i++){
    var p = pad_and_door_objects[i] ;
    if(p.A1==player.A && p.B1==player.B) p.door_status = p.door_status_in ;
  }
  for(var i=0 ; i<lever_and_door_objects.length ; i++){
    var l = lever_and_door_objects[i] ;
    if(l.A1==player.A && l.B1==player.B) l.door_status = l.door_status_in ;
  }
  for(var i=0 ; i<enemies.length ; i++){
    var e = enemies[i] ;
    if(e.A==player.A && e.B==player.B) e.reset() ;
  }
  draw_all() ;
  update_all() ;
  clear_dialogue() ;
}
function get_master_map_cell(A,B,i,j){
  var coords = get_cell_coords(A,B,i,j) ;
  if(B<0 || B>=master_map.length) return 0 ;
  if(A<0 || A>=master_map[B].length) return 0 ;
  if(j<0 || j>=master_map[B][A].cells.length) return 0 ;
  if(i<0 || i>=master_map[B][A].cells[j].length) return 0 ;
  return master_map[B][A].cells[j][i] ;
}

function populate_rooms(){
  rooms = new Array() ;
  for(var B_=0 ; B_<master_map.length ; B_++){
    rooms.push(new Array()) ;
    for(var A_=0 ; A_<master_map[B_].length ; A_++){
      rooms[B_].push(master_map[B_][A_].clone()) ;
    }
  }
}

function get_cell_contents(A,B,i,j){
  if(     i<0    ){ i = nCol+i ; A-- ; }
  else if(i>=nCol){ i = i-nCol ; A++ ; }
  if(     j<0    ){ j = nRow+j ; B-- ; }
  else if(j>=nRow){ j = j-nRow ; B++ ; }
  var room_tmp = get_room(A,B) ;
  return room_tmp.cells[j][i] ;
}
