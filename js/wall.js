var sea_fill_color = 'rgb(150,200,255)' ;
var sea_edge_color = 'rgb(  0,  0,255)' ;

function wall_object(){
  this.is_wall  = true  ;
  this.draw = function(context,i,j,tb_flag){
    var th = 0 ;
    var dy0 = 2 ;
    context.fillStyle   = wall_fill_color ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    
    context.strokeStyle = wall_edge_color ;  
    var A = player.A ;
    var B = player.B ;
    context.lineCap = 'round' ;
    var lw = 4 ;
    context.lineWidth = lw ;
    if((i!=0 && get_cell(A,B,i-1,j)!=1) || tb_flag){
      context.beginPath() ;
      context.moveTo((i+0)*cellSize+0.5*lw,(j+0)*cellSize+0.5*lw) ;
      context.lineTo((i+0)*cellSize+0.5*lw,(j+1)*cellSize-0.5*lw) ;
      context.stroke() ;
    }
    if((i!=nCol-1 && get_cell(A,B,i+1,j)!=1) || tb_flag){
      context.beginPath() ;
      context.moveTo((i+1)*cellSize-0.5*lw,(j+0)*cellSize+0.5*lw) ;
      context.lineTo((i+1)*cellSize-0.5*lw,(j+1)*cellSize-0.5*lw) ;
      context.stroke() ;
    }
    if((j!=0 && get_cell(A,B,i,j-1)!=1) || tb_flag){
      context.beginPath() ;
      context.moveTo((i+0)*cellSize+0.5*lw,(j+0)*cellSize+0.5*lw) ;
      context.lineTo((i+1)*cellSize-0.5*lw,(j+0)*cellSize+0.5*lw) ;
      context.stroke() ;
    }
    if((j!=nRow-1 && get_cell(A,B,i,j+1)!=1) || tb_flag){
      context.beginPath() ;
      context.moveTo((i+0)*cellSize+0.5*lw,(j+1)*cellSize-0.5*lw) ;
      context.lineTo((i+1)*cellSize-0.5*lw,(j+1)*cellSize-0.5*lw) ;
      context.stroke() ;
    }
    
    var nBricksAcross = 2 ;
    var nBricksDown   = 4 ;
    var mortar = 3 ;
    var bw = cellSize/nBricksAcross-mortar ;
    var bh = cellSize/nBricksDown-mortar ;
    context.fillStyle   = wall_edge_color ;
    var x0 = i*cellSize+th ;
    for(var u=0 ; u<nBricksAcross+1 ; u++){
      for(var v=0 ; v<nBricksDown ; v++){
        var dx = u*(bw+mortar) ;
        dx += -0.25*bw ;
        if(v%2==1) dx -= bw*0.5 ;
        var w = bw ;
        if(dx<0){
          w += dx ;
          dx = 0 ;
        }
        var x = x0+dx ;
        var y = j*cellSize+th+v*(bh+mortar)+dy0 ;
        if(dx+w>cellSize) w = cellSize-dx ;
        context.fillRect(x,y,w,bh) ;
      }
    }
  }
  this.interact = function(di,dj){ return false ; }
}
var wall = new wall_object() ;
wall.description = 'Wall' ;

var fence = new wall_object() ;
fence.description = 'Fence' ;
fence.draw = function(context,i,j){
  var fw = 0.2*cellSize ; // fence width
  var A = player.A ;
  var B = player.B ;
  var connect_N = get_thing(get_cell(A,B,(i+0),(j-1))).is_wall ;
  var connect_E = get_thing(get_cell(A,B,(i+1),(j+0))).is_wall ;
  var connect_S = get_thing(get_cell(A,B,(i+0),(j+1))).is_wall ;
  var connect_W = get_thing(get_cell(A,B,(i-1),(j+0))).is_wall ;
  
  var floor = get_thing(room.floor_type) ;
  floor.draw(context,i,j) ;
  context.fillStyle = 'rgb(205,133,63)' ;
  if(connect_N) context.fillRect((i+0.5)*cellSize-0.5*fw,(j+0)*cellSize,fw,0.5*cellSize) ;
  if(connect_E) context.fillRect((i+0.5)*cellSize,(j+0.5)*cellSize-0.5*fw,0.5*cellSize,fw) ;
  if(connect_S) context.fillRect((i+0.5)*cellSize-0.5*fw,(j+0.5)*cellSize,fw,0.5*cellSize) ;
  if(connect_W) context.fillRect((i+0.0)*cellSize,(j+0.5)*cellSize-0.5*fw,0.5*cellSize,fw) ;
  
  var draw_post = false ;
  var ps = 3 ; // post size
  if(connect_N && connect_E) draw_post = true ;
  if(connect_N && connect_W) draw_post = true ;
  if(connect_S && connect_E) draw_post = true ;
  if(connect_S && connect_W) draw_post = true ;
  
  var nConnect = 0 ;
  if(connect_N) nConnect++ ;
  if(connect_E) nConnect++ ;
  if(connect_S) nConnect++ ;
  if(connect_W) nConnect++ ;
  if(nConnect<=1) draw_post = true ;
  if(draw_post) context.fillRect((i+0.5)*cellSize-0.5*ps*fw,(j+0.5)*cellSize-0.5*ps*fw,ps*fw,ps*fw) ;
}

var stone = new wall_object() ;
stone.description = 'Stone' ;
stone.type = 16 ;
stone.draw = function(context, i, j){
  context.fillStyle = 'rgb(200,200,200)' ;
  context.fillRect(i*cellSize,j*cellSize,cellSize,cellSize) ;
  context.fillStyle = 'rgb(0,0,0)' ;
  var A = player.A ;
  var B = player.B ;
  if(get_cell(A,B,i,j-1)!=16) context.fillRect((i+0)*cellSize,(j+0)*cellSize,cellSize,1) ;
  if(get_cell(A,B,i+1,j)!=16) context.fillRect((i+1)*cellSize-1,(j+0)*cellSize,1,cellSize) ;
  if(get_cell(A,B,i,j+1)!=16) context.fillRect((i+0)*cellSize,(j+1)*cellSize-1,cellSize,1) ;
  if(get_cell(A,B,i-1,j)!=16) context.fillRect((i+0)*cellSize,(j+0)*cellSize,1,cellSize) ;
  this.draw_details(context, i, j) ;
}
stone.draw_details = function(context, i, j){
  var A = player.A ;
  var B = player.B ;
  if(random_from_ABij(A,B,i,j)<0.6) return ;
  var rgb = 100+Math.floor(155*random_from_ABij(A,B,i,j)) ;
  context.beginPath() ;
  context.fillStyle = 'rgb('+rgb+','+rgb+','+rgb+')' ;
  var x0 = (i+0.2+0.6*random_from_ABij(A,B,i+j,j))*cellSize ;
  var y0 = (j+0.2+0.6*random_from_ABij(A,B,i,i+j))*cellSize ;
  
  var xys = [] ;
  var nPoints = 4 + Math.floor(10*random_from_ABij(A,B,i,j)) ;
  for(var u=0 ; u<nPoints ; u++){
    var r = (0.5+0.1*random_from_ABij(A,B,i+u,j))*cellSize ;
    var t = random_from_ABij(A,B,i,j+u)*2*Math.PI ;
    var x = x0+r*Math.cos(t) ;
    var y = y0+r*Math.sin(t) ;
    x = Math.max((i+0)*cellSize+1,Math.min((i+1)*cellSize-1,x)) ;
    y = Math.max((j+0)*cellSize+1,Math.min((j+1)*cellSize-1,y)) ;
    xys.push([x,y,t]) ;
  }
  xys.sort(function (u,v){ return u[2]-v[2] } ) ;
  context.moveTo(xys[xys.length-1][0],xys[xys.length-1][1]) ;
  for(var u=0 ; u<xys.length ; u++){
    context.lineTo(xys[u][0],xys[u][1]) ;
  }
  context.closePath() ;
  //circle(context, x0, y0, 0.3*cellSize) ;
  context.fill() ;
}

// G for generic, and to avoid replacing the global window variable
var window_G = function(rotation){
  var w = new wall_object() ;
  w.rotation = rotation ;
  w.description = 'Window' ;
  w.draw = function(context, i, j){
    context.save() ;
    context.translate((i+0.5)*cellSize,(j+0.5)*cellSize) ;
    context.rotate(this.rotation*0.5*Math.PI) ;
    
    context.fillStyle = 'rgb(0,0,0)' ;
    context.fillRect(-0.5*cellSize, -0.28*cellSize, cellSize, 0.16*cellSize) ;
    context.fillStyle = 'rgb(200,200,200)' ;
    context.fillRect(-0.5*cellSize, -0.25*cellSize, cellSize, 0.10*cellSize) ;
    context.fillStyle = wall_edge_color ;
    
    var pillar_radius = 10 ;
    context.beginPath() ;
    context.arc(-0.5*cellSize, -0.2*cellSize, pillar_radius, 0.5*Math.PI, 1.5*Math.PI, true ) ;
    context.fill() ;
    context.beginPath() ;
    context.arc( 0.55*cellSize,-0.2*cellSize, pillar_radius, 0.5*Math.PI, 1.5*Math.PI, false) ;
    context.fill() ;
    context.restore() ;
  }
  return w ;
}

var window_N = window_G(0) ;
var window_E = window_G(1) ;
var window_S = window_G(2) ;
var window_W = window_G(3) ;

var standing_stone = new wall_object() ;
standing_stone.description = 'Standing stone' ;
standing_stone.draw = function(context, i, j){
  var thing = get_thing(get_cell(player.A,player.B,i,j)) ;
  thing.draw(context,i,j) ;
  context.beginPath() ;
  context.fillStyle = 'rgb(150,150,150)' ;
  circle(context, (i+0.5)*cellSize, (j+0.5)*cellSize, 0.3*cellSize) ;
  context.fill() ;
}

var sea  = new wall_object() ;
sea.description = 'Water' ;
sea.color = sea_fill_color ;
sea.get_corner_floor = function(edge1, edge2){
  if(edge1==0) edge1 = room.floor_type ;
  if(edge2==0) edge2 = room.floor_type ;
  if( edge1==11 && edge2==11                             ) return 11 ; // grass , grass
  if((edge1==11 && edge2==12) || (edge1==12 && edge2==11)) return 12 ; // grass , sand
  if( edge1==12 && edge2==12                             ) return 12 ; // sand , sand
  return 90 ;
}
sea.draw = function(context,i,j,tb_flag){
  var th = 0 ;
  context.fillStyle   = sea_fill_color ;
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
  context.fillStyle = this.color ;
  context.arc((i+0.5)*cellSize,(j+0.5)*cellSize,0.5*cellSize,0,2*Math.PI,true) ;
  context.fill() ;
}
