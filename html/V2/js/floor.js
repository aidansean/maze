function travelator_N(){
  this.is_floor = true ;
  this.is_pushable_traversable = true ;
  this.draw = function(context,i,j){
    var th = 0 ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    th = 0 ;
    context.fillStyle   = 'rgb(255,255,255)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    context.beginPath() ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.moveTo((i+0.0)*cellSize+th,(j+1.0)*cellSize-th) ;
    context.lineTo((i+0.0)*cellSize+th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+0.0)*cellSize+th) ;
    context.lineTo((i+1.0)*cellSize+th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+1.0)*cellSize+th,(j+1.0)*cellSize-th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+0.0)*cellSize+th,(j+1.0)*cellSize-th) ;
    context.fill() ;
  }
  this.interact = function(di,dj){ return !(dj==1) ; }
}
function travelator_E(){
  this.is_floor = true ;
  this.is_pushable_traversable = true ;
  this.draw = function(context,i,j){
    var th = 0 ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    th = 0 ;
    context.fillStyle   = 'rgb(255,255,255)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    context.beginPath() ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.moveTo((i+0.0)*cellSize+th,(j+0.0)*cellSize+th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+0.0)*cellSize+th) ;
    context.lineTo((i+1.0)*cellSize-th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+1.0)*cellSize-th) ;
    context.lineTo((i+0.0)*cellSize+th,(j+1.0)*cellSize-th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+0.0)*cellSize+th,(j+0.0)*cellSize+th) ;
    context.fill() ;
  }
  this.interact = function(di,dj){ return !(di==-1) ; }
}
function travelator_S(){
  this.is_floor = true ;
  this.is_pushable_traversable = true ;
  this.draw = function(context,i,j){
    var th = 0 ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    th = 0 ;
    context.fillStyle   = 'rgb(255,255,255)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    context.beginPath() ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.moveTo((i+0.0)*cellSize+th,(j+0.0)*cellSize+th) ;
    context.lineTo((i+0.0)*cellSize+th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+1.0)*cellSize-th) ;
    context.lineTo((i+1.0)*cellSize-th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+1.0)*cellSize-th,(j+0.0)*cellSize+th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+0.0)*cellSize+th,(j+0.0)*cellSize+th) ;
    context.fill() ;
  }
  this.interact = function(di,dj){ return !(dj==-1) ; }
}
function travelator_W(){
  this.is_floor = true ;
  this.is_pushable_traversable = true ;
  this.draw = function(context,i,j){
    var th = 0 ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    th = 0 ;
    context.fillStyle   = 'rgb(255,255,255)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    context.beginPath() ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.moveTo((i+1.0)*cellSize-th,(j+0.0)*cellSize+th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+0.0)*cellSize+th) ;
    context.lineTo((i+0.0)*cellSize+th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+1.0)*cellSize-th) ;
    context.lineTo((i+1.0)*cellSize-th,(j+1.0)*cellSize-th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+1.0)*cellSize-th,(j+0.0)*cellSize+th) ;
    context.fill() ;
  }
  this.interact = function(di,dj){ return !(di==1) ; }
}
var travN = new travelator_N() ;
var travE = new travelator_E() ;
var travS = new travelator_S() ;
var travW = new travelator_W() ;

var grass_color = 'rgb(150,255,150)' ;
var grass_g  =  255 ;
var mod_dgrass_g = 0.1 ;
var dgrass_g = -mod_dgrass_g ;
function floor_object(color){
  this.is_floor = true  ;
  this.is_pushable_traversable = true ;
  this.is_steps = false ;
  this.color = color ;
  this.draw = function(context,i,j){
    var th = 0 ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    //th = 1 ;
    context.fillStyle   = this.color ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    this.draw_details(context,i,j) ;
  }
  this.draw_details = function(context,i,j){ return ; }
  this.interact = function(di,dj){ return true ; }
}
var  floor = new floor_object('rgb(255,255,255)') ;
var  grass = new floor_object(grass_color) ;
var   sand = new floor_object('rgb(255,255,200)') ;
var   wood = new floor_object('rgb(222,184,135)') ;
var gravel = new floor_object('rgb(200,200,200)') ;
var   pave = new floor_object('rgb(255,255,200)') ;

grass.description = 'Grass' ;
grass.get_corner_floor = function(edge1, edge2){
  if(edge1==0) edge1 = room.floor_type ;
  if(edge2==0) edge2 = room.floor_type ;
  if( edge1==90 && edge2==90                             ) return 90 ; // sea , sea
  if((edge1==90 && edge2==12) || (edge1==12 && edge2==90)) return 12 ; // sea , sand
  if( edge1==12 && edge2==12                             ) return 12 ; // sand , sand
  return 11 ;
}
grass.draw = function(context,i,j){
  var th = 0 ;
  context.fillStyle   = 'rgb(200,200,200)' ;
  context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
  
  // Look for corners to soften
  var A = player.A ;
  var B = player.B ;
  var cell_N = get_cell(A,B,i+0,j-1) ;
  var cell_E = get_cell(A,B,i+1,j+0) ;
  var cell_S = get_cell(A,B,i+0,j+1) ;
  var cell_W = get_cell(A,B,i-1,j+0) ;
  
  var NW = this.get_corner_floor(cell_W,cell_N) ;
  var NE = this.get_corner_floor(cell_N,cell_E) ;
  var SE = this.get_corner_floor(cell_E,cell_S) ;
  var SW = this.get_corner_floor(cell_S,cell_W) ;
  
  context.fillStyle = (NW==11) ? grass_color : get_thing(NW).color ;
  context.fillRect((i+0.0)*cellSize,(j+0.0)*cellSize,0.5*cellSize,0.5*cellSize) ;
  
  context.fillStyle = (NE==11) ? grass_color : get_thing(NE).color ;
  context.fillRect((i+0.5)*cellSize,(j+0.0)*cellSize,0.5*cellSize,0.5*cellSize) ;
  
  context.fillStyle = (SE==11) ? grass_color : get_thing(SE).color ;
  context.fillRect((i+0.5)*cellSize,(j+0.5)*cellSize,0.5*cellSize,0.5*cellSize) ;
  
  context.fillStyle = (SW==11) ? grass_color : get_thing(SW).color ;
  context.fillRect((i+0.0)*cellSize,(j+0.5)*cellSize,0.5*cellSize,0.5*cellSize) ;
  
  context.beginPath() ;
  context.fillStyle = grass_color ;
  context.arc((i+0.5)*cellSize,(j+0.5)*cellSize,0.5*cellSize,0,2*Math.PI,true) ;
  context.fill() ;
  
  this.draw_details(context,i,j) ;
}

sand.description = 'Sand' ;
sand.get_corner_floor = function(edge1, edge2){
  if(edge1==0) edge1 = room.floor_type ;
  if(edge2==0) edge2 = room.floor_type ;
  if( edge1==90 && edge2==90                             ) return 90 ; // sea , sea
  if((edge1==90 && edge2==12) || (edge1==12 && edge2==90)) return 12 ; // sea , grass
  if( edge1==11 && edge2==11                             ) return 11 ; // grass , grass
  return 12 ;
}
sand.draw = function(context,i,j){
  // Look for corners to soften
  var A = player.A ;
  var B = player.B ;
  var cell_N = get_cell(A,B,i+0,j-1) ;
  var cell_E = get_cell(A,B,i+1,j+0) ;
  var cell_S = get_cell(A,B,i+0,j+1) ;
  var cell_W = get_cell(A,B,i-1,j+0) ;
  
  var NW = this.get_corner_floor(cell_W,cell_N) ;
  var NE = this.get_corner_floor(cell_N,cell_E) ;
  var SE = this.get_corner_floor(cell_E,cell_S) ;
  var SW = this.get_corner_floor(cell_S,cell_W) ;
  
  context.fillStyle = (NW==11) ? grass_color : get_thing(NW).color ;
  context.fillRect((i+0.0)*cellSize,(j+0.0)*cellSize,0.5*cellSize,0.5*cellSize) ;
  
  context.fillStyle = (NE==11) ? grass_color : get_thing(NE).color ;
  context.fillRect((i+0.5)*cellSize,(j+0.0)*cellSize,0.5*cellSize,0.5*cellSize) ;
  
  context.fillStyle = (SE==11) ? grass_color : get_thing(SE).color ;
  context.fillRect((i+0.5)*cellSize,(j+0.5)*cellSize,0.5*cellSize,0.5*cellSize) ;
  
  context.fillStyle = (SW==11) ? grass_color : get_thing(SW).color ;
  context.fillRect((i+0.0)*cellSize,(j+0.5)*cellSize,0.5*cellSize,0.5*cellSize) ;
  
  context.beginPath() ;
  context.fillStyle = this.color ;
  context.arc((i+0.5)*cellSize,(j+0.5)*cellSize,0.5*cellSize,0,2*Math.PI,true) ;
  context.fill() ;
}

pave.description = 'Paved path' ;
pave.draw = function(context,i,j){
  context.fillStyle = this.color ;
  var x = i*cellSize ;
  var y = j*cellSize ;
  context.fillRect(x,y,cellSize,cellSize) ;
  context.beginPath() ;
  context.strokeStyle = 'rgb(100,100,100)' ;
  context.lineWidth = 1 ;
  var ySize = 25 ;
  var nv = cellSize/ySize ;
  for(var dv=0 ; dv<=nv ; dv++){
    var dy = ySize*dv ;
    context.moveTo(x,y+dy) ;
    context.lineTo(x+cellSize,y+dy) ;
    var dx0 = (dv%2==0) ? 0.3*cellSize : 0.5*cellSize ;
    if(dv==nv) continue ;
    for(var dx=dx0 ; dx<=cellSize ; dx += 0.4*cellSize){
      context.moveTo(x+dx,y+dy) ;
      context.lineTo(x+dx,y+dy+ySize) ;
    }
  }
  if(get_master_map_cell(player.A,player.B,i-1,j)!=14){
    context.moveTo(x,y+0) ;
    context.lineTo(x,y+cellSize) ;
  }
  if(get_master_map_cell(player.A,player.B,i+1,j)!=14){
    context.moveTo(x+cellSize,y+0) ;
    context.lineTo(x+cellSize,y+cellSize) ;
  }
  context.stroke() ;
}

gravel.description = 'Gravel path' ;
gravel.draw = function(context,i,j){
  var size = 10 ;
  for(var u=0 ; u<cellSize ; u+=size){
    for(var v=0 ; v<cellSize ; v+=size){
      var x = i*cellSize+u ;
      var y = j*cellSize+v ;
      var R = Math.floor(Math.seededRandom(150,255)) ;
      context.fillStyle = 'rgb('+R+','+R+','+R+')' ;
      context.fillRect(x,y,size,size) ;
    }
  }
}

var steps_H = new floor_object('rgb(255,255,255)') ;
var steps_V = new floor_object('rgb(255,255,255)') ;
steps_H.description = 'Steps' ;
steps_V.description = 'Steps' ;
steps_H.is_pushable_traversable = false ;
steps_V.is_pushable_traversable = false ;
steps_H.is_steps = true ;
steps_V.is_steps = true ;
steps_H.draw = function(context,i,j){
  var th = 0 ;
  context.fillStyle = 'rgb(0,0,0)' ;
  context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
  var nSteps  = 4 ;
  var padding = 4 ;
  var step_size = (cellSize - nSteps*padding)/nSteps ;
  context.fillStyle   = this.color ;
  var y = j*cellSize+th+0.5*padding ;
  for(var k=0 ; k<nSteps ; k++){
    var gradient = context.createLinearGradient(0,y,0,y+step_size) ;
    gradient.addColorStop(0.0,'rgb(255,255,255)') ;
    gradient.addColorStop(step_stop,'rgb(200,200,200)') ;
    gradient.addColorStop(1.0,'rgb(200,200,200)') ;
    context.fillStyle = gradient ;
    context.fillRect(i*cellSize,y,cellSize-2*th,step_size) ;
    y += step_size + padding ;
  }
  if(j<cells.length-1){
    var t = get_thing(cells[j+1][i]) ;
    if(cells[j+1][i]==0 || (t.is_floor==true && t.is_steps==false)){
      context.beginPath() ;
      context.moveTo((i+0)*cellSize,(j+1)*cellSize) ;
      context.lineTo((i+1)*cellSize,(j+1)*cellSize) ;
      context.stroke() ;
    }
  }
  if(i>0){
    var t = get_thing(cells[j][i-1]) ;
    if(cells[j][i-1]==0 || (t.is_floor==true && t.is_steps==false)){
      context.beginPath() ;
      context.moveTo((i+0)*cellSize,(j+0)*cellSize) ;
      context.lineTo((i+0)*cellSize,(j+1)*cellSize) ;
      context.stroke() ;
    }
  }
  if(i<cells[0].length-1){
    var t = get_thing(cells[j+1][i]) ;
    if(cells[j][i+1]==0 || (t.is_floor==true && t.is_steps==false)){
      context.beginPath() ;
      context.moveTo((i+1)*cellSize,(j+0)*cellSize) ;
      context.lineTo((i+1)*cellSize,(j+1)*cellSize) ;
      context.stroke() ;
    }
  }
  this.draw_details(context,i,j) ;
}
steps_V.draw = function(context,i,j){
  var th = 0 ;
  context.fillStyle = 'rgb(0,0,0)' ;
  context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
  var nSteps  = 4 ;
  var padding = 4 ;
  var step_size = (cellSize - nSteps*padding)/nSteps ;
  context.fillStyle   = this.color ;
  var x = i*cellSize+th+0.5*padding ;
  for(var k=0 ; k<nSteps ; k++){
    var gradient = context.createLinearGradient(x,0,x+step_size,0) ;
    gradient.addColorStop(0.0,'rgb(255,255,255)') ;
    gradient.addColorStop(step_stop,'rgb(200,200,200)') ;
    gradient.addColorStop(1.0,'rgb(200,200,200)') ;
    context.fillStyle = gradient ;
    context.fillRect(x,j*cellSize,step_size,cellSize-2*th) ;
    x += step_size + padding ;
  }
  context.lineWidth = 1 ;
  context.strokeStyle = room.wall_edge_color ;
  if(j>0){
    var t = get_thing(get_master_map_cell(player.A,player.B,i,j-1)) ;
    if(cells[j-1][i]==0 || (t.is_floor==true && t.is_steps==false)){
      context.beginPath() ;
      context.moveTo((i+0)*cellSize,(j+0)*cellSize) ;
      context.lineTo((i+1)*cellSize,(j+0)*cellSize) ;
      context.stroke() ;
    }
  }
  if(j<cells.length-1){
    var t = get_thing(cells[j+1][i]) ;
    if(cells[j+1][i]==0 || (t.is_floor==true && t.is_steps==false)){
      context.beginPath() ;
      context.moveTo((i+0)*cellSize,(j+1)*cellSize) ;
      context.lineTo((i+1)*cellSize,(j+1)*cellSize) ;
      context.stroke() ;
    }
  }
  if(i>0){
    var t = get_thing(cells[j][i-1]) ;
    if(cells[j][i-1]==0 || (t.is_floor==true && t.is_steps==false)){
      context.beginPath() ;
      context.moveTo((i+0)*cellSize,(j+0)*cellSize) ;
      context.lineTo((i+0)*cellSize,(j+1)*cellSize) ;
      context.stroke() ;
    }
  }
  if(i<cells[0].length-1){
    var t = get_thing(cells[j+1][i]) ;
    if(cells[j][i+1]==0 || (t.is_floor==true && t.is_steps==false)){
      context.beginPath() ;
      context.moveTo((i+1)*cellSize,(j+0)*cellSize) ;
      context.lineTo((i+1)*cellSize,(j+1)*cellSize) ;
      context.stroke() ;
    }
  }
  this.draw_details(context,i,j) ;
}

var flower_colors = [] ;
flower_colors.push( 'rgb(255,  0,  0)' ) ;
flower_colors.push( 'rgb(255,200,255)' ) ;
flower_colors.push( 'rgb(200,200,255)' ) ;
flower_colors.push( 'rgb(255,140,255)' ) ;
var flower_density = 0.1 ;

grass.draw_details = function(context,i,j){
  if(get_cell_contents(player.A,player.B,i,j)!=0) return ;
  if(random_from_ABij(player.A,player.B,i,j)>1.0-flower_density){
    var r = 0.15*cellSize ;
    var randomX = random_from_ABij(player.A,player.B,-i+5, j+5) ;
    var randomY = random_from_ABij(player.A,player.B,-i+5,-j+5) ;
    var randomC = random_from_ABij(player.A,player.B, i+5,-j+5) ;
    var dx = r + 0.5*randomX*cellSize ;
    var dy = r + 0.5*randomY*cellSize ;
    var x = i*cellSize + dx ;
    var y = j*cellSize + dy ;
    var color = flower_colors[ Math.floor( flower_colors.length*randomC ) ] ;
    draw_flower(context,x,y,r,color) ;
  }
}
function draw_flower(context,x,y,r,color){
  context.lineWidth = 1 ;
  for(var i=0 ; i<5 ; i++){
    var cx = x + 0.6*r*Math.cos(2*Math.PI*i/5) ;
    var cy = y + 0.6*r*Math.sin(2*Math.PI*i/5) ;
    context.beginPath() ;
    context.arc(cx,cy,r,0,2*Math.PI,true) ;
    context.strokeStyle = 'rgb(0,0,0)' ;
    context.fillStyle   = color ;
    context.fill() ;
    context.stroke() ;
  }
  context.beginPath() ;
  context.arc(x,y,0.75*r,0,2*Math.PI,true) ;
  context.strokeStyle = 'rgb(0,0,0)' ;
  context.fillStyle   = 'rgb(255,255,0)' ;
  context.fill() ;
  context.stroke() ;
}

function update_grass(){
  // This can allow the grass to change slowly over time to show the effects of decay and generally freak out the player
  //return ;
  flower_density -= 0.00025 ;
  grass_g += dgrass_g ;
  if(grass_g<150){
    grass_g = 150 ;
    dgrass_g = mod_dgrass_g ;
  }
  else if(grass_g>=255){
    grass_g = 255 ;
    dgrass_g = -mod_dgrass_g ;
  }
  grass_color = 'rgb(150,'+Math.round(grass_g)+',150)' ;
  return ;
}

wood.description = 'Wooden planks' ;
wood.draw = function(context,i,j){
  var th = 0 ;
  context.fillStyle   = 'rgb(160,100,60)' ;
  context.strokeStyle = 'rgb(160,100,60)' ;
  context.lineWidth   = 2 ;
  context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
  var nPlanks = 3 ;
  var padding = 4 ;
  var plank_size = (cellSize - nPlanks*padding)/nPlanks ;
  context.fillStyle   = this.color ;
  var y = j*cellSize+th+0.5*padding ;
  var dxs = [0.1,0.5,0.9] ;
  for(var k=0 ; k<nPlanks ; k++){
    context.fillRect(i*cellSize,y,cellSize-2*th,plank_size) ;
    y += plank_size + padding ;
    var x = (i+dxs[k])*cellSize ;
    context.beginPath() ;
    context.moveTo(x,y) ;
    if(i%2==0) context.lineTo(x,y-1.2*plank_size) ;
    context.stroke() ;
  }
  this.draw_details(context,i,j) ;
}

function tile_object(color1, color2){
  this.description = 'Tiled floor' ;
  this.is_floor = true  ;
  this.is_pushable_traversable = true ;
  this.color1 = color1 ;
  this.color2 = color2 ;
  this.draw = function(context,i,j){
    var th = 0 ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    //context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    //th = 1 ;
    context.fillStyle   = this.color1 ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    context.fillStyle   = this.color2 ;
    context.fillRect(i*cellSize+th,(j+0.5)*cellSize+th,0.5*cellSize-th,0.5*cellSize-th) ;
    context.fillRect((i+0.5)*cellSize+th,j*cellSize+th,0.5*cellSize-th,0.5*cellSize-th) ;
  }
  this.interact = function(di,dj){ return true ; }
}
var tile_bw = new tile_object('rgb(200,200,200)','rgb(255,255,255)') ;
var tile_BB = new tile_object('rgb(150,150,255)','rgb(200,200,255)') ;
