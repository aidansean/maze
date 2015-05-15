function posession_object(){
  this.draw = function(context,i,j){
    context.fillStyle = 'rgb(0,255,255)' ;
    context.fillRect(i*cellSize,j*cellSize,cellSize,cellSize) ;
  }
  this.interact = function(di,dj){
    var i = player.i+di ;
    var j = player.j+dj ;
    player.add_to_inventory(this) ;
    set_cell_contents(player.A,player.B,i,j,0) ;
    draw_all() ;
    return true ;
  }
}

var ball = new posession_object() ;
ball.draw = function(context, i, j){
  context.fillStyle = 'rgb(255,0,0)' ;
  context.beginPath() ;
  context.arc((i+0.5)*cellSize,(j+0.5)*cellSize,0.4*cellSize,0,2*Math.PI,true) ;
  context.fill() ;
}

