var canvas  = 0 ;
var context = 0 ;
var w  = 750 ; // Width  of context
var h  = 750 ; // Height of context
var cw = 450 ; // Pixel Width  of canvas
var ch = 450 ; // Pixel height of canvas
var cellSize = 50 ;
var nRow = h/cellSize ;
var nCol = w/cellSize ;
var fontSize = 0.4*cellSize ;

var room = 0 ;
var cells = 0 ;
var cells_revert = 0 ;
var player = 0 ;
var edit_mode = false ;
var completed_game = false ;

var wall_edge_color = 'rgb(255,  0,  0)' ;
var wall_fill_color = 'rgb(255,200,200)' ;

var p_i = 3 ;
var p_j = 6 ;
var p_A = 5 ;
var p_B = 3 ;

var O_A = p_A ;
var O_B = p_B ;

var currency_symbol = 'G' ;
var all_gp = 0 ;

var fade_fill = 'rgba(0,0,0,0)' ;
var napping = false ;
var nap_counter = 0 ;
var nap_steps =  60 ;
var nap_delay =  50 ;

var step_stop = 0.5 ; // Gradient stop for steps

var animation_delay    = 100 ;
var animation_ticker   =   0 ;
var animations_present = false ;

var spotlight_mode = false ;
var done_spotlight = false ;

function start(){
  document.addEventListener('keydown', keyDown) ;
  
  canvas = document.getElementById('playarea') ;
  context = canvas.getContext('2d') ;
  canvas.addEventListener('mousemove', mouseMove) ;
  canvas.addEventListener('mouseout' , mouseOut ) ;
  
  change_room(p_A,p_B) ;
  player = new player_object() ;
  player.set_coords(p_A,p_B,p_i,p_j) ;
  player.update_map() ;
  
  draw_all() ;
  reset_combat_table() ;
  
  all_gp = count_gold_on_map() ;
  
  increment_animation() ;
  
  $.get("http://ipinfo.io", function(response){ set_country(response.country) ; }, "jsonp") ;
}

function set_spotlight_mode(value){
  if(done_spotlight) return ;
  spotlight_mode =  value ;
  if(value==false) done_spotlight = true ;
  if(value) Get('div_descriptor').innerHTML = '' ;
}

function increment_animation(){
  animation_ticker++ ;
  animation_ticker = animation_ticker%1000000 ;
  if(animations_present) draw_all() ;
  if(false){
    for(var i=0 ; i<nRow ; i++){
      for(var j=0 ; j<nCol ; j++){
        var value = get_cell_contents(player.A,player.B,i,j) ;
        if(value==0) continue ;
        var t = get_thing(value) ;
        if(t){
          if(t.is_animated) t.draw(context,i,j) ;
        }
      }
    }
  }
  window.setTimeout(increment_animation,animation_delay) ;
}

function set_country(country){
  if(country=='BE'){
    currency_symbol = '€' ;
    return ;
  }
  if(country=='US'){
    currency_symbol = '$' ;
    return ;
  }
  if(country=='UK'){
    currency_symbol = '£' ;
    return ;
  }
}

function update_all(){
  document.getElementById('td_gold').innerHTML = player.gp ;
}