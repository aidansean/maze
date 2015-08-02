var sea_fill_color = 'rgb(200,200,255)' ;
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
    context.lineWidth = 4 ;
    if((i!=0 && get_cell(A,B,i-1,j)!=1) || tb_flag){
      context.beginPath() ;
      context.moveTo((i+0)*cellSize,(j+0)*cellSize) ;
      context.lineTo((i+0)*cellSize,(j+1)*cellSize) ;
      context.stroke() ;
    }
    if((i!=nCol-1 && get_cell(A,B,i+1,j)!=1) || tb_flag){
      context.beginPath() ;
      context.moveTo((i+1)*cellSize,(j+0)*cellSize) ;
      context.lineTo((i+1)*cellSize,(j+1)*cellSize) ;
      context.stroke() ;
    }
    if((j!=0 && get_cell(A,B,i,j-1)!=1) || tb_flag){
      context.beginPath() ;
      context.moveTo((i+0)*cellSize,(j+0)*cellSize) ;
      context.lineTo((i+1)*cellSize,(j+0)*cellSize) ;
      context.stroke() ;
    }
    if((j!=nRow-1 && get_cell(A,B,i,j+1)!=1) || tb_flag){
      context.beginPath() ;
      context.moveTo((i+0)*cellSize,(j+1)*cellSize) ;
      context.lineTo((i+1)*cellSize,(j+1)*cellSize) ;
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
var sea  = new wall_object() ;
sea.draw = function(context,i,j,tb_flag){
  var th = 0 ;
  context.fillStyle   = sea_fill_color ;
  context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
  context.strokeStyle = sea_edge_color ;
      
  var A = player.A ;
  var B = player.B ;
  context.lineCap = 'round' ;
  context.lineWidth = 4 ;
  if((i!=0 && get_cell(A,B,i-1,j)!=90) || tb_flag){
    context.beginPath() ;
    context.moveTo((i+0)*cellSize,(j+0)*cellSize) ;
    context.lineTo((i+0)*cellSize,(j+1)*cellSize) ;
    context.stroke() ;
  }
  if((i!=nCol-1 && get_cell(A,B,i+1,j)!=90) || tb_flag){
    context.beginPath() ;
    context.moveTo((i+1)*cellSize,(j+0)*cellSize) ;
    context.lineTo((i+1)*cellSize,(j+1)*cellSize) ;
    context.stroke() ;
  }
  if((j!=0 && get_cell(A,B,i,j-1)!=90) || tb_flag){
    context.beginPath() ;
    context.moveTo((i+0)*cellSize,(j+0)*cellSize) ;
    context.lineTo((i+1)*cellSize,(j+0)*cellSize) ;
    context.stroke() ;
  }
  if((j!=nRow-1 && get_cell(A,B,i,j+1)!=90) || tb_flag){
    context.beginPath() ;
    context.moveTo((i+0)*cellSize,(j+1)*cellSize) ;
    context.lineTo((i+1)*cellSize,(j+1)*cellSize) ;
    context.stroke() ;
  }
}
