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
  this.smiling = true ;
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
    //if(t.is_floor) draw_cell(i,j,m) ;
    var th = 3 ;
    var margin  = 2 ;
    
    // Main face
    context.lineWidth = 4 ;
    context.beginPath() ;
    context.strokeStyle = 'rgb(  0,  0,  0)' ;
    context.fillStyle   = 'rgb(255,255,  0)' ;
    context.arc((i+0.5)*cellSize,(j+0.5)*cellSize,0.4*cellSize,0,2*Math.PI,true) ;
    context.fill() ;
    context.stroke() ;
    
    // Eyes
    context.beginPath() ;
    context.fillStyle = 'rgb(  0,  0,  0)' ;
    context.arc((i+0.32)*cellSize,(j+0.4)*cellSize,0.08*cellSize,0,2*Math.PI,false) ;
    context.fill() ;
    
    context.beginPath() ;
    context.fillStyle = 'rgb(  0,  0,  0)' ;
    context.arc((i+0.68)*cellSize,(j+0.4)*cellSize,0.08*cellSize,0,2*Math.PI,false) ;
    context.fill() ;
    
    // Mouth
    context.beginPath() ;
    context.fillStyle = 'rgb(  0,  0,  0)' ;
    if(this.smiling){
      context.arc((i+0.5)*cellSize,(j+0.5)*cellSize,0.2*cellSize,0.2*Math.PI,0.8*Math.PI,false) ;
    }
    else{
      context.moveTo((i+0.3)*cellSize,(j+0.65)*cellSize);
      context.lineTo((i+0.7)*cellSize,(j+0.65)*cellSize);
    }
    context.stroke() ;
    return ;
  }
  this.update_map = function(){
    if(room.name=='Nothingness'){
      cell_contents[this.j][this.i] = 99 ;
      return ;
    }
    set_cell_contents(this.A,this.B,this.i,this.j,99) ;
    return 0 ;
  }
  this.inventory = [] ;
  this.add_to_inventory = function(posession){
    this.inventory.push(posession) ;
  }
  this.remove_from_inventory = function(name){
    for(var i=0 ; i<this.inventory ; i++){
      if(this.inventory[i].name==name){
        this.inventory.splice(i,1) ;
        return ;
      }
    }
  }
}

function nap(){
  nap_counter = 0 ;
  iterate_nap() ;
}
function iterate_nap(){
  nap_counter++ ;
  if(nap_counter>nap_steps){
    nap_counter = 0 ;
    napping = false ;
    draw_all() ;
    return ;
  }
  if(nap_counter<=nap_steps/3){
    fade_fill = 'rgba(0,0,0,'+nap_counter/(nap_steps/3)+')' ;
  }
  else if(nap_counter<=2*nap_steps/3){
    fade_fill = 'rgba(0,0,0,1)' ;
  }
  else{
    fade_fill = 'rgba(0,0,0,'+(nap_steps-nap_counter)/(nap_steps/3)+')' ;
  }
  if(nap_counter==15){
    // Do all the sleepy things here.
    // Restore health etc.
  }
  draw_all() ;
  if(nap_counter>=2+1*nap_steps/3 && nap_counter<=2*nap_steps/3-2){
    context.fillStyle = 'rgb(255,255,0)' ;
    context.font = 'italic 50px georgia' ;
    context.textAlign = 'center' ;
    context.fillText('zzz...',0.5*w,0.5*h) ;
    
    context.beginPath() ;
    var x = 0.75*w ;
    var y = 0.20*h ;
    context.arc(x,y,0.1*w,0,2*Math.PI,true) ;
    context.fill() ;
    context.fillStyle = 'rgb(0,0,0)' ;
    context.beginPath() ;
    context.arc(x-0.03*w,y-0.01*h,0.09*w,0,2*Math.PI,true) ;
    context.fill() ;
  }
  window.setTimeout(iterate_nap, nap_delay) ;
}
