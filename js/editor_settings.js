var canvas  = 0 ;
var context = 0 ;
var w = 750 ;
var h = 750 ;
var cellSize = 50 ;
var nRow = h/cellSize ;
var nCol = w/cellSize ;
var fontSize = 0.4*cellSize ;

var room = 0 ;
var cells = 0 ;
var cell_contents = 0 ;
var cells_revert = 0 ;
var player = 0 ;
var edit_mode = true ;

var wall_edge_color = 'rgb(255,  0,  0)' ;
var wall_fill_color = 'rgb(255,200,200)' ;

var step_stop = 0.5 ; // Gradient stop for steps

var animation_delay    = 100 ;
var animation_ticker   =   0 ;
var animations_present = false ;

var spotlight_mode = false ;
var done_spotlight = false ;

var p_i = -1 ;
var p_j = -1 ;
var p_A =  0 ;
var p_B =  0 ;

var O_A = p_A ;
var O_B = p_B ;

var currency_symbol = 'G' ;

var fade_fill = 'rgba(0,0,0,0)' ;
var napping = false ;
var nap_counter = 0 ;
var nap_steps =  60 ;
var nap_delay =  50 ;

var paintbrush_type = 'cells' ;
