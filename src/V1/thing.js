function random_from_ABij(A,B,i,j){
  var pow_A = Math.pow(2.5,1+A+0.1) ;
  var pow_B = Math.pow(3.5,1+B+0.2) ;
  var pow_i = Math.pow(4.5,1+i+0.3) ;
  var pow_j = Math.pow(5.5,1+j+0.4) ;
  var result = (pow_A+pow_B+pow_i+pow_j)%1 ;
  return result ;
}

function pushable_block_object(){
  this.A = -1 ;
  this.B = -1 ;
  this.i = -1 ;
  this.j = -1 ;
  this.draw = function(context,i,j){
    var th = 3 ;
    var margin  = 4 ;
    
    context.fillStyle   = 'rgb(255,255,  0)' ;
    context.strokeStyle = 'rgb(  0,  0,  0)' ;
    context.lineWidth = 2 ;
    context.beginPath() ;
    var corner = 0.25*cellSize ;
    
    var x, y, w, h ;
    
    // Main body of box
    context.fillStyle = 'rgb(200,200,200)' ;
    x = (i+0)*cellSize+margin+1 ; y = (j+0)*cellSize+margin+1 ; w = cellSize-2*margin-2 ; h = cellSize-2*margin-2 ;
    context.fillRect(x,y,w,h) ; context.strokeRect(x,y,w,h) ;
    
    context.fillStyle = 'rgb(210,180,140)' ;
    x = (i+0)*cellSize+margin+5 ; y = (j+0)*cellSize+margin+5 ; w = cellSize-2*margin-10 ; h = cellSize-2*margin-10 ;
    context.fillRect(x,y,w,h) ; context.strokeRect(x,y,w,h) ;
    
    // Diagonal support beams
    context.strokeStyle = 'rgb(0,0,0)' ;
    context.lineWidth = 5 ;
    context.moveTo((i+0)*cellSize+margin+2, (j+0)*cellSize+margin+2) ;
    context.lineTo((i+1)*cellSize-margin-2, (j+1)*cellSize-margin-2) ;
    context.stroke() ;
    
    context.strokeStyle = 'rgb(200,200,200)' ;
    context.lineWidth = 2 ;
    context.moveTo((i+0)*cellSize+margin+2, (j+0)*cellSize+margin+2) ;
    context.lineTo((i+1)*cellSize-margin-2, (j+1)*cellSize-margin-2) ;
    context.stroke() ;
    
    context.strokeStyle = 'rgb(0,0,0)' ;
    context.lineWidth = 5 ;
    context.moveTo((i+1)*cellSize-margin-2, (j+0)*cellSize+margin+2) ;
    context.lineTo((i+0)*cellSize+margin+2, (j+1)*cellSize-margin-2) ;
    context.stroke() ;
    
    context.strokeStyle = 'rgb(200,200,200)' ;
    context.lineWidth = 2 ;
    context.moveTo((i+1)*cellSize-margin-2, (j+0)*cellSize+margin+2) ;
    context.lineTo((i+0)*cellSize+margin+2, (j+1)*cellSize-margin-2) ;
    context.stroke() ;
    
    // Corners
    context.strokeStyle = 'rgb(  0,  0,  0)' ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    w = corner ; h = corner ;
    x = (i+0)*cellSize+margin-1 ; y = (j+0)*cellSize+margin-1 ;
    context.fillRect(x,y,w,h) ; context.strokeRect(x,y,w,h) ;
    
    x = (i+1)*cellSize-margin+1-corner ; y = (j+0)*cellSize+margin-1 ;
    context.fillRect(x,y,w,h) ; context.strokeRect(x,y,w,h) ;
    
    x = (i+0)*cellSize+margin-1 ; y = (j+1)*cellSize-margin+1-corner ;
    context.fillRect(x,y,w,h) ; context.strokeRect(x,y,w,h) ;
    
    x = (i+1)*cellSize-margin+1-corner ; y = (j+1)*cellSize-margin+1-corner ;
    context.fillRect(x,y,w,h) ; context.strokeRect(x,y,w,h) ;
    
    var m = get_master_map_cell(player.A,player.B,i,j) ;
    if(m>=1000 && m<2000){   pad_and_door_objects[m%1000].draw(3) ; }
    if(m>=2000 && m<3000){   pad_and_door_objects[m%2000].draw(4) ; }
    if(m>=3000 && m<4000){ lever_and_door_objects[m%3000].draw(3) ; }
    if(m>=4000 && m<5000){ lever_and_door_objects[m%4000].draw(4) ; }
  }
  this.interact = function(di,dj){
    var i1 = -1 ;
    var i2 = -1 ;
    var j1 = -1 ;
    var j2 = -1 ;
    
    if((di+nCol)%nCol==nCol-1){ // W
      i1 = player.i-1 ;
      i2 = player.i-2 ;
      j1 = player.j ;
      j2 = player.j ;
      
      // Check for travelators
      if(get_master_map_cell(player.A,player.B,i1,j1)==30) return false ;
      if(get_master_map_cell(player.A,player.B,i1,j1)==31) return false ;
      if(get_master_map_cell(player.A,player.B,i1,j1)==32) return false ;
      if(get_master_map_cell(player.A,player.B,i2,j2)==31) return false ;
    }
    if((di+nCol)%nCol==1){ // E
      i1 = player.i+1 ;
      i2 = player.i+2 ;
      j1 = player.j ;
      j2 = player.j ;
      
      // Check for travelators
      if(get_master_map_cell(player.A,player.B,i1,j1)==30) return false ;
      if(get_master_map_cell(player.A,player.B,i1,j1)==32) return false ;
      if(get_master_map_cell(player.A,player.B,i1,j1)==33) return false ;
      if(get_master_map_cell(player.A,player.B,i2,j2)==33) return false ;
    }
    if((dj+nRow)%nRow==nRow-1){ // N
      i1 = player.i ;
      i2 = player.i ;
      j1 = player.j-1 ;
      j2 = player.j-2 ;
      
      // Check for travelators
      if(get_master_map_cell(player.A,player.B,i1,j1)==31) return false ;
      if(get_master_map_cell(player.A,player.B,i1,j1)==32) return false ;
      if(get_master_map_cell(player.A,player.B,i1,j1)==33) return false ;
      if(get_master_map_cell(player.A,player.B,i2,j2)==32) return false ;
    }
    if((dj+nRow)%nRow==1){ // S
      i1 = player.i ;
      i2 = player.i ;
      j1 = player.j+1 ;
      j2 = player.j+2 ;
      
      // Check for travelators
      if(get_master_map_cell(player.A,player.B,i1,j1)==30) return false ;
      if(get_master_map_cell(player.A,player.B,i1,j1)==31) return false ;
      if(get_master_map_cell(player.A,player.B,i1,j1)==33) return false ;
      if(get_master_map_cell(player.A,player.B,i2,j2)==30) return false ;
    }
    
    // Protect against moving off pressure pads with doors that are blocked
    var m = get_master_map_cell(player.A,player.B,i1,j1) ;
    if(m>=1000 && m<2000){
      var p = pad_and_door_objects[m%1000] ;
      if(rooms[p.B2][p.A2].cells[p.j2][p.i2]!=m+1000) return false ;
    }
    
    if(is_pushable_traversable(get_cell(player.A,player.B,i2,j2))){
      var c_in  = get_cell_coords(player.A,player.B,i2,j2) ;
      var c_out = get_cell_coords(player.A,player.B,i1,j1) ;
      var value_in  = master_map[c_in[1] ][c_in[0] ].cells[c_in[3] ][c_in[2] ] ;
      var value_out = master_map[c_out[1]][c_out[0]].cells[c_out[3]][c_out[2]] ;
      if(value_in>=1000 && value_in<2000) pad_and_door_objects[value_in%1000].interact(2*di,2*dj) ;
      if(value_in>=2000 && value_in<3000 &&   pad_and_door_objects[value_in%2000].door_status==1) return false ;
      if(value_in>=4000 && value_in<5000 && lever_and_door_objects[value_in%4000].door_status==1) return false ;
      set_cell(player.A,player.B,i2,j2,2) ;
      set_cell(c_out[0],c_out[1],c_out[2],c_out[3],0)
      return true ;
    }
    return false ;
  }
}
var pb = new pushable_block_object() ;

function get_thing(value){
  if(value==0) value = rooms[player.B][player.A].floor_type ;
  switch(value){
    case  0: return floor ; break ;
    case  1: return wall  ; break ;
    case  2: return pb    ; break ;
    case 11: return grass ; break ;
    case 12: return sand  ; break ;
    case 21: return gp1   ; break ;
    case 22: return gp2   ; break ;
    case 23: return gp5   ; break ;
    case 30: return travN ; break ;
    case 31: return travE ; break ;
    case 32: return travS ; break ;
    case 33: return travW ; break ;
    case 40: return tile_bw ; break ;
    case 41: return tile_BB ; break ;
    case 90: return sea     ; break ;
    case 99: return player  ; break ;
  }
  if(value>=1000 && value< 2000) return   pad_and_door_objects[value%1000] ;
  if(value>=2000 && value< 3000) return   pad_and_door_objects[value%2000] ;
  if(value>=3000 && value< 4000) return lever_and_door_objects[value%3000] ;
  if(value>=4000 && value< 5000) return lever_and_door_objects[value%4000] ;
  if(value>=8000 && value< 9000) return enemies[value%8000] ;
  if(value>=9000 && value<10000) return    npcs[value%9000] ;
  return 0 ;
}

function interact(value,di,dj){
  var thing = get_thing(value) ;
  if(thing==0) return true ;
  return thing.interact(di,dj) ;
}
function is_pushable_traversable(type){
  var t = get_thing(type) ;
  if(t.is_floor) return true ;
  switch(type){
    default: break ;
  }
  if(type>=1000 && type<2000) return true ;
  if(type>=2000 && type<3000) return (  pad_and_door_objects[type%2000].door_status==2) ;
  if(type>=4000 && type<5000) return (lever_and_door_objects[type%4000].door_status==2) ;
  return false ;
}
function is_traversable(type){
  if(player.ghost_mode==true) return true ;
  var t = get_thing(type) ;
  if(t.is_floor) return true ;
  switch(type){
    case 2 :
    case 21:
    case 22:
    case 23:
      return true ; break ;
    default : break ;
  }
  if(type>=1000 && type< 2000) return true ;
  if(type>=2000 && type< 3000) return (pad_and_door_objects[type%1000].door_status==2) ;
  if(type>=8000 && type< 9000) return true ;
  if(type>=9000 && type<10000) return true ;
  return false ;
}
function is_heavy(type){
  switch(type){
    case 2:
    case 99:
      return true ;
  }
  return false ;
}
