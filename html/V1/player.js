function player_object(){
  this.A = -1 ;
  this.B = -1 ;
  this.i = -1 ;
  this.j = -1 ;
  this.i_in = -1 ;
  this.j_in = -1 ;
  this.gp = 0 ;
  this.gp_current_room = 0 ;
  this.ghost_mode = false ;
  this.hit_points   = 100 ;
  this.attack_base  = 10 ;
  this.attack_blur  =  5 ;
  this.defence_base = 10 ;
  this.defence_blur =  2 ;
  this.set_coords = function(A, B, i, j){
    this.A = A ;
    this.B = B ;
    this.i = i ;
    this.j = j ;
    this.i_in = i ;
    this.j_in = j ;
  }
  this.draw = function(context,i,j){
    var m = get_master_map_cell(player.A,player.B,i,j) ;
    var t = get_thing(m) ;
    if(t.is_floor) draw_cell(i,j,m) ;
    var th = 3 ;
    var margin  = 2 ;
    context.lineWidth = 4 ;
    context.beginPath() ;
    context.strokeStyle = 'rgb(  0,  0,  0)' ;
    context.fillStyle   = 'rgb(255,255,  0)' ;
    context.arc((i+0.5)*cellSize,(j+0.5)*cellSize,0.4*cellSize,0,2*Math.PI,true) ;
    context.fill() ;
    context.stroke() ;
    
    context.beginPath() ;
    context.fillStyle   = 'rgb(  0,  0,  0)' ;
    context.arc((i+0.32)*cellSize,(j+0.4)*cellSize,0.08*cellSize,0,2*Math.PI,false) ;
    context.fill() ;
    
    context.beginPath() ;
    context.fillStyle = 'rgb(  0,  0,  0)' ;
    context.arc((i+0.68)*cellSize,(j+0.4)*cellSize,0.08*cellSize,0,2*Math.PI,false) ;
    context.fill() ;
    
    context.beginPath() ;
    context.arc((i+0.5)*cellSize,(j+0.5)*cellSize,0.2*cellSize,0.2*Math.PI,0.8*Math.PI,false) ;
    context.stroke() ;
    return ;
  }
  this.update_map = function(){
    if(room.name=='Nothingness'){
      cells[this.j][this.i] = 99 ;
      return ;
    }
    set_cell(this.A,this.B,this.i,this.j,99) ;
    return 0 ;
  }
}
