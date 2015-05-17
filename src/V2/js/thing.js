// Taken from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
// the initial seed
Math.seed = 6 ;
 
// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
Math.seededRandom = function(min,max){
  min = min || 0 ;
  max = max || 1 ;
  
  Math.seed = (Math.seed * 9301 + 49297) % 233280 ;
  var rnd = Math.seed/233280 ;
  
  return min + rnd*(max-min) ;
}
 
function random_from_ABij(A,B,i,j){
  var pow_A = Math.pow(2.5,1+A+0.1) ;
  var pow_B = Math.pow(3.5,1+B+0.2) ;
  var pow_i = Math.pow(4.5,1+i+0.3) ;
  var pow_j = Math.pow(5.5,1+j+0.4) ;
  var result = (pow_A+pow_B+pow_i+pow_j)%1 ;
  return result ;
}
function random_from_ABijuv(A,B,i,j,u,v){
  var pow_A = Math.pow(3.1,1+A+0.1) ;
  var pow_B = Math.pow(2.5,1+B+0.2) ;
  var pow_i = Math.pow(A+B,1+i+0.3) ;
  var pow_j = Math.pow(A*B,1+j+0.4) ;
  var pow_u = Math.sqrt(u*u+v) ;
  var pow_v = Math.sqrt(u+v) ;
  var p = pow_A+pow_B+pow_i+pow_j+pow_u+pow_v ;
  var result = (100*(p))%1 ;
  return result ;
}

function pushable_block_object(id){
  this.id = id ;
  this.A = -1 ;
  this.B = -1 ;
  this.i = -1 ;
  this.j = -1 ;
  this.draw = function(context,i,j){
    var m = get_master_map_cell(player.A,player.B,i,j) ;
    var t = get_thing(m) ;
    if(m!=2) t.draw(context, i, j) ;
    
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
    
    if(is_pushable_traversable(get_cell(player.A,player.B,i2,j2)) && get_cell_contents(player.A,player.B,i2,j2)==0){
      var c_in  = get_cell_coords(player.A,player.B,i2,j2) ;
      var c_out = get_cell_coords(player.A,player.B,i1,j1) ;
      var value_in  = master_map[c_in[1] ][c_in[0] ].cells[c_in[3] ][c_in[2] ] ;
      var value_out = master_map[c_out[1]][c_out[0]].cells[c_out[3]][c_out[2]] ;
      if(value_in>=1000 && value_in<2000) pad_and_door_objects[value_in%1000].interact(2*di,2*dj) ;
      if(value_in>=2000 && value_in<3000 &&   pad_and_door_objects[value_in%2000].door_status==1) return false ;
      if(value_in>=4000 && value_in<5000 && lever_and_door_objects[value_in%4000].door_status==1) return false ;
      set_cell_contents(player.A,player.B,i2,j2,this.id) ;
      set_cell_contents(c_out[0],c_out[1],c_out[2],c_out[3],0)
      return true ;
    }
    return false ;
  }
}
var pb = new pushable_block_object(2) ;
pb.description = 'Crate' ;

var barrel = new pushable_block_object(3) ;
barrel.description = 'Barrel' ;
barrel.draw = function(context, i, j){
  context.fillStyle   = 'rgb(205,133,63)' ;
  context.strokeStyle = 'rgb(100,100,100)' ;
  context.beginPath() ;
  context.lineWidth = 5 ;
  var r  = 0.4*cellSize ;
  var cx = (i+0.5)*cellSize ;
  var cy = (j+0.5)*cellSize ;
  context.arc(cx,cy,r,0,2*Math.PI,true) ;
  context.fill() ;
  context.stroke() ;
  
  context.beginPath() ;
  context.lineWidth = 2 ;
  for(var v=-2 ; v<=2 ; v++){
    var y = cy+r*v/3 ;
    var Dy = y-cy ;
    var Dx = Math.sqrt(r*r-Dy*Dy) ;
    context.moveTo(cx-Dx,y) ;
    context.lineTo(cx+Dx,y) ;
  }
  context.stroke() ;
}

function furniture_object(){
  this.draw = function(context, i, j){
    context.save() ;
    context.fillStyle = 'rgb(255,0,255)' ;
    var th = 2 ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    context.restore() ;
  }
  this.interact = function(di,dj){
    return false ;
  }
  this.is_animated = false ;
}

function bed(linen_colour){
  var the_bed = new furniture_object() ;
  the_bed.description = 'Bed' ;
  the_bed.linen_colour = linen_colour ;
  the_bed.draw = function(context,i,j){
    context.save() ;
    var th = 2 ;
    var x0 = i*cellSize+2*th ;
    var y0 = j*cellSize+th ;
  
    context.fillStyle = 'rgb(160,82,45)' ;
    context.fillRect(x0,y0+0.20*cellSize,0.2*cellSize-2*th,0.8*cellSize-3*th) ;
    context.fillRect(x0+0.8*cellSize,y0+0.5*cellSize,0.2*cellSize-2*th,0.5*cellSize-3*th) ;
    context.fillStyle = this.linen_colour ;
    context.fillRect(x0+0.1*cellSize,y0+0.45*cellSize,0.9*cellSize-2*th,0.35*cellSize-th) ;
    context.restore() ;
  }
  the_bed.interact = function(di,dj){
    napping = true ;
    nap() ;
    return false ;
  }
  return the_bed ;
}

var bed_red   = bed('rgb(255,0,0)') ;
var bed_green = bed('rgb(0,200,0)') ;
var bed_blue  = bed('rgb(0,0,255)') ;

var faux_bed_red = bed('rgb(255,0,0)') ;
faux_bed_red.interact = function(di,dj){ return false ; }

var dresser = new furniture_object() ;


var gravestone_1 = new furniture_object() ;
gravestone_1.description = 'Gravestone' ;
gravestone_1.draw = function(context, i, j){
  context.fillStyle = 'rgb(100,100,100)' ;
  context.fillRect((i+0.4)*cellSize,(j+0.1)*cellSize,0.2*cellSize,0.8*cellSize) ;
  context.fillRect((i+0.2)*cellSize,(j+0.3)*cellSize,0.6*cellSize,0.2*cellSize) ;
}

var gravestone_2 = new furniture_object() ;
gravestone_2.description = 'Gravestone' ;
gravestone_2.draw = function(context, i, j){
  context.fillStyle = 'rgb(100,100,100)' ;
  context.fillRect((i+0.2)*cellSize,(j+0.5)*cellSize,0.6*cellSize,0.4*cellSize) ;
  context.beginPath() ;
  context.moveTo((i+0.2)*cellSize,(j+0.5)*cellSize) ;
  context.arc((i+0.5)*cellSize,(j+0.5)*cellSize,0.3*cellSize,0,Math.PI,true) ;
  context.lineTo((i+0.2)*cellSize,(j+0.5)*cellSize) ;
  context.fill() ;
}

var fire = new furniture_object() ;
fire.description = 'Fire' ;
fire.is_animated = true ;
fire.draw = function(context, i, j){
  var thing = get_thing(get_cell(player.A,player.B,i,j)) ;
  thing.draw(context,i,j) ;
  var x0 = i*cellSize ;
  var y0 = j*cellSize ;
  context.save() ;
  for(var u=0 ; u<4 ; u++){
    context.beginPath() ;
    context.fillStyle = 'rgb(255,0,0)' ;
    var t = 2*Math.PI*(animation_ticker%4)/4 ;
    var x1 = x0 + (0.1+u*0.2)*cellSize ;
    var x2 = x1 + 0.2*cellSize ;
    var x_peak = 0.5*(x1+x2)       + 0.1*cellSize*Math.cos(t) ;
    var y_peak = y0 + 0.1*cellSize + 0.1*cellSize*Math.sin(t) ;
    context.moveTo(x1,y0+cellSize) ;
    context.lineTo(x2,y0+cellSize) ;
    context.lineTo(x_peak,y_peak) ;
    context.fill() ;
  }
  for(var u=0 ; u<4 ; u++){
    context.beginPath() ;
    context.fillStyle = 'rgb(255,255,0)' ;
    var t = 2*Math.PI*(animation_ticker%4)/4 ;
    var x1 = x0 + (0.12+u*0.2)*cellSize ;
    var x2 = x1 + 0.18*cellSize ;
    var x_peak = 0.5*(x1+x2)       + 0.05*cellSize*Math.cos(t) ;
    var y_peak = y0 + 0.5*cellSize + 0.05*cellSize*Math.sin(t) ;
    context.moveTo(x1,y0+cellSize) ;
    context.lineTo(x2,y0+cellSize) ;
    context.lineTo(x_peak,y_peak) ;
    context.fill() ;
  }
  context.restore() ;
}

var vine = new furniture_object() ;
vine.description = 'Grapes' ;
vine.grape_r = 0.09*cellSize ;
vine.grape = function(context, i, j, u, v){
  context.beginPath() ;
  context.arc((i+u)*cellSize,(j+v)*cellSize,this.grape_r,0,2*Math.PI,true) ;
  context.fill() ;
}
vine.draw = function(context, i, j){
  var x0 = i*cellSize ;
  var y0 = j*cellSize ;
  context.fillStyle = 'rgba(245,222,179,0.3)' ;
  context.fillStyle = 'rgba(0,200,0,0.3)' ;
  context.fillRect(x0,y0,cellSize,cellSize) ;
  
  // Grapes
  context.beginPath() ;
  var v0 = 0.25 ;
  var dv = 0.2*Math.sqrt(3)/2 ;
  context.fillStyle = 'rgb(200,100,200)' ; // 'rgb(215,178,235)' ;
  vine.grape(context, i, j, 0.3 , v0+dv*0) ;
  vine.grape(context, i, j, 0.5 , v0+dv*0) ;
  vine.grape(context, i, j, 0.7 , v0+dv*0) ;
  vine.grape(context, i, j, 0.25, v0+dv*1) ;
  vine.grape(context, i, j, 0.45, v0+dv*1) ;
  vine.grape(context, i, j, 0.65, v0+dv*1) ;
  vine.grape(context, i, j, 0.85, v0+dv*1) ;
  vine.grape(context, i, j, 0.4 , v0+dv*2) ;
  vine.grape(context, i, j, 0.6 , v0+dv*2) ;
  vine.grape(context, i, j, 0.8 , v0+dv*2) ;
  vine.grape(context, i, j, 0.5 , v0+dv*3) ;
  vine.grape(context, i, j, 0.7 , v0+dv*3) ;
  vine.grape(context, i, j, 0.6 , v0+dv*4) ;
  
  //vine.grape(context, i, j, 0.4, 0.5) ;
  //vine.grape(context, i, j, 0.4, 0.5) ;
  context.fill() ;
  
  // Leaves and vine
  context.beginPath() ;
  context.lineWidth = 2 ;
  context.strokeStyle = 'rgb(0,100,0)' ;
  context.fillStyle = 'rgb(0,100,0)' ;
  
  var cx = x0+0.4*cellSize ;
  var cy = y0+0.25*cellSize ;
  var t  = Math.PI/4 ;
  var l  = 0.1*cellSize ;
  var r  = 0.2*cellSize ;
  var p  = Math.acos(l/r) ;
  context.beginPath() ;
  context.arc(cx+l*Math.cos(t),cy+l*Math.sin(t),r,t+Math.PI+p,t+Math.PI-p,true) ;
  context.arc(cx-l*Math.cos(t),cy-l*Math.sin(t),r,t+p,t-p,true) ;
  context.fill() ;
  
  var cx = x0+0.72*cellSize ;
  var cy = y0+0.25*cellSize ;
  var t  = -1.3*Math.PI/4 ;
  var l  = 0.1*cellSize ;
  var r  = 0.2*cellSize ;
  var p  = Math.acos(l/r) ;
  context.beginPath() ;
  context.arc(cx+l*Math.cos(t),cy+l*Math.sin(t),r,t+Math.PI+p,t+Math.PI-p,true) ;
  context.arc(cx-l*Math.cos(t),cy-l*Math.sin(t),r,t+p,t-p,true) ;
  context.fill() ;
  
  context.beginPath() ;
  context.arc(x0+0.5*cellSize,y0+0.1*cellSize,0.1*cellSize,-0.45*Math.PI,0.5*Math.PI,false) ;
  context.stroke() ;
}

var lighthouse_lamp = new furniture_object() ;
lighthouse_lamp.description = 'Lamp' ;
lighthouse_lamp.is_animated = true ;
lighthouse_lamp.draw = function(context,i,j){
  context.save() ;
  var thing = get_thing(get_cell(player.A,player.B,i,j)) ;
  thing.draw(context,i,j) ;
  
  var x0 = (i+0.5)*cellSize ;
  var y0 = (j+0.5)*cellSize ;
  context.beginPath() ;
  context.fillStyle = 'rgb(255,255,255)' ;
  context.arc(x0, y0, 0.4*cellSize, 0, 2*Math.PI, true) ;
  context.fill() ;
  context.stroke() ;
  
  context.fillStyle = 'rgba(255,255,0,0.5)' ;
  var nSteps = 20 ;
  var tick = (animation_ticker%nSteps) ;
  var t1 = 2*Math.PI*(tick+0)/nSteps ;
  var t2 = 2*Math.PI*(tick+1)/nSteps ;
  context.beginPath() ;
  context.moveTo(x0,y0) ;
  context.lineTo(x0+w*Math.cos(t1),y0+h*Math.sin(t1) ) ;
  context.lineTo(x0+w*Math.cos(t2),y0+h*Math.sin(t2) ) ;
  context.lineTo(x0,y0) ;
  context.closePath() ;
  context.fill() ;
  context.restore() ;
}

var lamppost = new furniture_object() ;
lamppost.draw = function(context, i, j){
  var thing = get_thing(get_cell(player.A,player.B,i,j)) ;
  thing.draw(context,i,j) ;
  context.beginPath() ;
  context.fillStyle = 'rgb(100,100,100)' ;
  context.arc((i+0.5)*cellSize,(j+0.5)*cellSize,0.3*cellSize,0,2*Math.PI,true) ;
  context.fill() ;
}

var tree = new furniture_object() ;
tree.description = 'Tree' ;
tree.draw = function(context,i,j){
  context.beginPath() ;
  context.fillStyle = 'rgb(0,150,0)' ;
  var x0 = (i+0.5)*cellSize ;
  var y0 = (j+0.5)*cellSize ;
  var nBalls = 5 + Math.floor(3*random_from_ABij(player.A,player.B,i,j)) ;
  for(var u=0 ; u<nBalls+1 ; u++){
    var x = x0 + 0.25*cellSize*Math.cos(2*Math.PI*u/nBalls) ;
    var y = y0 + 0.25*cellSize*Math.sin(2*Math.PI*u/nBalls) ;
    context.arc(x, y, 0.25*cellSize, 0, 2*Math.PI, true) ;
  }
  context.fill() ;
  this.draw_details(context, i, j) ;
}
tree.draw_details = function(context, i, j){}

var apple_tree = new furniture_object() ;
apple_tree.description = 'Apple tree' ;
var apple_density = 0.9 ;
apple_tree.draw = function(context,i,j){
  context.beginPath() ;
  context.fillStyle = 'rgb(0,150,0)' ;
  var x0 = (i+0.5)*cellSize ;
  var y0 = (j+0.5)*cellSize ;
  var nBalls = 5 + Math.floor(3*random_from_ABij(player.A,player.B,i,j)) ;
  for(var u=0 ; u<nBalls+1 ; u++){
    var x = x0 + 0.25*cellSize*Math.cos(2*Math.PI*u/nBalls) ;
    var y = y0 + 0.25*cellSize*Math.sin(2*Math.PI*u/nBalls) ;
    context.arc(x, y, 0.25*cellSize, 0, 2*Math.PI, true) ;
  }
  context.fill() ;
  this.draw_details(context, i, j) ;
}
apple_tree.draw_details = function(context, i, j){
  context.beginPath() ;
  context.fillStyle = 'rgb(150,0,0)' ;
  var nApples = 0 + Math.floor(3*random_from_ABij(player.A,player.B,i,j)) ;
  for(var u=0 ; u<nApples+1 ; u++){
    var r = 0.15*cellSize ;
    var randomX = random_from_ABij(player.A,player.B+u,-i+5+u, j+5  ) ;
    var randomY = random_from_ABij(player.A,player.B  ,-i+5-u,-j+5+u) ;
    var randomC = random_from_ABij(player.A,player.B-u, i+5  ,-j+5-u) ;
    var dx = r + 0.5*randomX*cellSize ;
    var dy = r + 0.5*randomY*cellSize ;
    var x = i*cellSize + dx ;
    var y = j*cellSize + dy ;
    context.arc(x,y,r,0,2*Math.PI,true) ;
    context.fill() ;
  }
}

var beehive = new furniture_object() ;
beehive.description = 'Beehive' ;
beehive.is_animated = true ;
beehive.draw = function(context, i, j){
  context.beginPath() ;
  context.fillStyle = 'rgb(200,200,50)' ;
  var x0 = (i+0.5)*cellSize ;
  var y0 = (j+0.5)*cellSize ;
  context.moveTo(x0-0.4*cellSize,y0+0.4*cellSize) ;
  context.lineTo(x0+0.4*cellSize,y0+0.4*cellSize) ;
  context.lineTo(x0+0.2*cellSize,y0-0.4*cellSize) ;
  context.lineTo(x0-0.2*cellSize,y0-0.4*cellSize) ;
  context.lineTo(x0-0.4*cellSize,y0+0.4*cellSize) ;
  context.fill() ;
  
  context.beginPath() ;
  context.strokeStyle = 'rgb(0,0,0)' ;
  context.moveTo(x0-0.40*cellSize,y0+0.4*cellSize) ;
  context.lineTo(x0+0.40*cellSize,y0+0.4*cellSize) ;
  
  context.moveTo(x0-0.35*cellSize,y0+0.2*cellSize) ;
  context.lineTo(x0+0.35*cellSize,y0+0.2*cellSize) ;
  
  context.moveTo(x0-0.30*cellSize,y0+0.0*cellSize) ;
  context.lineTo(x0+0.30*cellSize,y0+0.0*cellSize) ;
  
  context.moveTo(x0-0.25*cellSize,y0-0.2*cellSize) ;
  context.lineTo(x0+0.25*cellSize,y0-0.2*cellSize) ;
  
  context.moveTo(x0-0.20*cellSize,y0-0.4*cellSize) ;
  context.lineTo(x0+0.20*cellSize,y0-0.4*cellSize) ;
  context.stroke() ;
  this.draw_details(context, i, j) ;
}
beehive.draw_details = function(context, i, j){
  var nBees = 8 ;
  context.fillStyle = 'rgb(0,0,0)' ;
  for(var u=0 ; u<nBees ; u++){
    var nTick = 5+u ;
    var tick = animation_ticker%nTick ;
    var q = random_from_ABij(player.A,player.B+u,i,j) ;
    var r = 0.3*cellSize + 0.5*q*cellSize ;
    var randomX = random_from_ABij(player.A,player.B+u,-i+5+u, j+5  ) ;
    var randomY = random_from_ABij(player.A,player.B  ,-i+5-u,-j+5+u) ;
    var randomC = random_from_ABij(player.A,player.B-u, i+5  ,-j+5-u) ;
    var sign_x = (random_from_ABij(player.A,player.B+u,-i+5+u, j+5)<0.5) ? 1 : -1 ;
    var sign_y = (random_from_ABij(player.A,player.B-u,-i+5+u, j+5+u)<0.5) ? 1 : -1 ;
    var dx = r*Math.cos(2*Math.PI*tick/nTick)*sign_x + randomX*cellSize ;
    var dy = r*Math.sin(2*Math.PI*tick/nTick)*sign_y + randomY*cellSize ;
    var x = i*cellSize + dx ;
    var y = j*cellSize + dy ;
    context.beginPath() ;
    context.arc(x,y,2,0,2*Math.PI,true) ;
    context.fill() ;
  }
}

var cauldron = new furniture_object() ;
cauldron.description = 'Cauldron' ;
cauldron.is_animated = true ;
cauldron.water_color = 'rgb(150,170,150)' ;
cauldron.metal_color = 'rgb( 40, 40, 40)' ;
cauldron.draw = function(context, i, j){
  var thing = get_thing(get_cell(player.A,player.B,i,j)) ;
  thing.draw(context,i,j) ;

  context.beginPath() ;
  context.fillStyle = this.metal_color ;
  circle(context, (i+0.5)*cellSize, (j+0.5)*cellSize, 0.45*cellSize) ;
  context.fill() ;
  
  context.beginPath() ;
  context.fillStyle = this.water_color ;
  circle(context, (i+0.5)*cellSize, (j+0.5)*cellSize, 0.35*cellSize) ;
  context.fill() ;
  this.draw_details(context, i, j) ;
}
cauldron.draw_details = function(context, i, j){
  var tick = animation_ticker%10 ;
  var nBubbles = Math.floor(5*random_from_ABij(player.A,player.B,i+tick,j-tick)) ;
  for(var u=0 ; u<nBubbles ; u++){
    context.beginPath() ;
    var randomR =       0.4*random_from_ABij(player.A,player.B,i+tick+u,j+tick) ;
    var randomT = 2*Math.PI*random_from_ABij(player.A,player.B,i-tick-u,j-tick) ;
    context.strokeStyle = 'rgb(0,0,0)' ;
    context.lineWidth = 1 ;
    var dx = randomR*Math.cos(randomT) ;
    var dy = randomR*Math.sin(randomT) ;
    circle(context,(i+0.5+dx)*cellSize, (j+0.5+dy)*cellSize, 0.05*cellSize) ;
    context.stroke() ;
  }
}

function get_thing(value){
  if(value==0) value = rooms[player.B][player.A].floor_type ;
  switch(value){
    case   0: return floor     ; break ;
    case   1: return wall      ; break ;
    case   2: return pb        ; break ;
    case   3: return barrel    ; break ;
    case  11: return grass     ; break ;
    case  12: return sand      ; break ;
    case  13: return wood      ; break ;
    case  14: return pave      ; break ;
    case  15: return gravel    ; break ;
    case  16: return stone     ; break ;
    case  21: return gp1       ; break ;
    case  22: return gp2       ; break ;
    case  23: return gp5       ; break ;
    case  30: return travN     ; break ;
    case  31: return travE     ; break ;
    case  32: return travS     ; break ;
    case  33: return travW     ; break ;
    case  40: return tile_bw   ; break ;
    case  41: return tile_BB   ; break ;
    case  50: return steps_H   ; break ;
    case  51: return steps_V   ; break ;
    case  60: return vine      ; break ;
    case  61: return apple_tree; break ;
    case  62: return tree      ; break ;
    case  70: return window_N  ; break ;
    case  71: return window_E  ; break ;
    case  72: return window_S  ; break ;
    case  73: return window_W  ; break ;
    case  80: return standing_stone ; break ;
    case  90: return sea       ; break ;
    case  91: return fence     ; break ;
    case  92: return fire      ; break ;
    case  93: return beehive   ; break ;
    case  99: return player    ; break ;
    
    case 101: return bed_red  ; break ;
    case 102: return bed_green; break ;
    case 103: return bed_blue ; break ;
    case 104: return faux_bed_red ; break ;
    case 110: return gravestone_1 ; break ;
    case 111: return gravestone_2 ; break ;
    
    case 200: return lighthouse_lamp ; break ;
    case 201: return lamppost        ; break ;
    case 202: return cauldron        ; break ;
    
    case 300: return ball ; break ;
  }
  return 0 ;
}

function get_description_of_thing(value){
  var t = get_thing(value) ;
  var description = '' ;
  if(t.description) description = t.description ;
  return description ;
}

function interact(value,di,dj){
  var thing = get_thing(value) ;
  if(thing==0) return true ;
  return thing.interact(di,dj) ;
}
function is_pushable_traversable(type){
  var t = get_thing(type) ;
  if(t.is_floor){
    return t.is_pushable_traversable ;
  }
  switch(type){
    default: break ;
  }
  if(type>=1000 && type<2000) return true ;
  if(type>=2000 && type<3000) return (  pad_and_door_objects[type%2000].door_status==2) ;
  if(type>=4000 && type<5000) return (lever_and_door_objects[type%4000].door_status==2) ;
  return false ;
}
function is_steps(type){
  var t = get_thing(type) ;
  if(t.is_steps) return true ;
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
