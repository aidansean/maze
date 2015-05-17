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
    var th = 0 ;
    context.fillStyle   = this.color1 ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    th = 4 ;
    context.fillStyle   = this.color2 ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    
    context.fillStyle   = this.color1 ;
    var dx = th ;
    var dy = th ;
    var ew = 0.2*cellSize ; // eye width
    var eh = 0.2*cellSize ; // eye height
    context.fillRect((i+0)*cellSize+th+dx   ,j*cellSize+th+dy,ew,eh) ;
    context.fillRect((i+1)*cellSize-th-dx-ew,j*cellSize+th+dy,ew,eh) ;
    context.fillRect((i+0)*cellSize+th+dx,j*cellSize+th+6*dy,cellSize-2*th-2*dx,eh) ;
  }
  this.interact = function(){
    in_combat = true ;
    current_enemy = this ;
    increment_conflict() ;
    return false ;
  }
  this.kill = function(){
    master_map[this.B][this.A].cells[this.j][this.i] = 0 ;
    cells[this.j][this.i] = 0 ;
    draw_all() ;
  }
  this.reset = function(){
    master_map[this.B][this.A].cells[this.j][this.i] = 8000+this.index ;
    cells[this.j][this.i] = 8000+this.index ;
    this.hit_points = this.initial_hp ;
    draw_all() ;
  }
}

function increment_conflict(){
  if(current_enemy==0){
    reset_combat_table() ;
    window.setTimeout(increment_conflict,combat_delay) ;
    return l
  }
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

