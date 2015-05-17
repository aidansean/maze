var current_enemy = 0 ;
var combat_delay = 500 ;
var enemies = [] ;
var in_combat = false ;

function enemy_object(name, coords, attack_base, attack_blur, defence_base, defence_blur, hit_points, recovery, color1, color2, reward){
  this.name         = name ;
  this.A            = coords[0] ;
  this.B            = coords[1] ;
  this.i            = coords[2] ;
  this.j            = coords[3] ;
  this.attack_base  = attack_base ;
  this.attack_blur  = attack_blur ;
  this.defence_base = defence_base ;
  this.defence_blur = defence_blur ;
  this.initial_hp   = hit_points ;
  this.hit_points   = hit_points ;
  this.recovery     = recovery ;
  this.reward       = reward ;
  this.color1       = color1 ;
  this.color2       = color2 ;
  
  this.draw = function(context,i,j){
    var th = 2 ;
    context.fillStyle   = this.color1 ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    th = 6 ;
    context.fillStyle   = this.color2 ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    
    context.fillStyle   = this.color1 ;
    var dx = th ;
    var dy = th ;
    var ew = 0.15*cellSize ; // eye width
    var eh = 0.15*cellSize ; // eye height
    context.fillRect((i+0)*cellSize+th+dx   ,j*cellSize+th+dy,ew,eh) ;
    context.fillRect((i+1)*cellSize-th-dx-ew,j*cellSize+th+dy,ew,eh) ;
    context.fillRect((i+0)*cellSize+th+dx,j*cellSize+th+4*dy,cellSize-2*th-2*dx,0.5*eh) ;
    
    if(in_combat){
      var health = this.hit_points/this.initial_hp ;
      var x = (i+0.0)*cellSize ;
      var y = (j-0.1)*cellSize ;
      var w = cellSize*health ;
      var h = 0.1*cellSize ;
      
      var th = 0 ;
      context.fillStyle = 'rgb(0,0,0)' ;
      context.fillRect(x,y,cellSize,h) ;
      
      var H = health ; // Save some characters
      var R = (health>0.5) ? 2*255*(1.0-H) : 255   ;
      var G = (health>0.5) ? 255           : 255*H*2 ;
      th = 1 ;
      context.fillStyle = 'rgb('+Math.floor(R)+','+Math.floor(G)+',0)' ;
      context.fillRect(x+th,y+th,w-2*th,h-2*th) ;
    } 
  }
  this.interact = function(){
    in_combat = true ;
    current_enemy = this ;
    increment_conflict() ;
    return false ;
  }
  this.kill = function(){
    master_map[this.B][this.A].cell_contents[this.j][this.i] = 0 ;
    room.cell_contents[this.j][this.i] = 0 ;
    draw_all() ;
  }
  this.reset = function(){
    master_map[this.B][this.A].cells[this.j][this.i] = 8000+this.index ;
    cells[this.j][this.i] = 8000+this.index ;
    this.hit_points = this.initial_hp ;
    draw_all() ;
  }
}

var combat_sounds = ['audio_sword','audio_clang'] ;
function increment_conflict(){
  if(current_enemy==0){
    reset_combat_table() ;
    window.setTimeout(increment_conflict,combat_delay) ;
    return ;
  }
  var index = Math.floor(Math.random()*combat_sounds.length) ;
  Get(combat_sounds[index]).play() ;
  draw_all() ; // A little bit of overkill?  Perhaps just redraw a few cells instead?
  var attack  = player.attack_base         + Math.random()*player.attack_blur ;
  var defence = current_enemy.defence_base + Math.random()*current_enemy.defence_blur ;
  var hurt = Math.floor(attack) - Math.floor(defence) ;
  if(hurt>0){
    current_enemy.hit_points -= hurt ;
  }
  if(current_enemy.hit_points<=0){
    current_enemy.kill() ;
    draw_combat_table() ;
    reset_combat_table() ;
    in_combat = false ;
    Get('audio_Wilhelm').play() ;
    return ;
  }
  var attack  = current_enemy.attack_base + Math.random()*current_enemy.attack_blur ;
  var defence = player.defence_base       + Math.random()*player.defence_blur ;
  var hurt = Math.floor(attack) - Math.floor(defence) ;
  if(hurt>0){
    player.hit_points -= hurt ;
  }
  draw_combat_table() ;
  if(player.hit_points<=0){
    player.kill() ;
    in_combat = false ;
    return ;
  }
  window.setTimeout(increment_conflict,combat_delay) ;
}

