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
var cells_revert = 0 ;
var player = 0 ;
var edit_mode = false ;
var completed_game = false ;

var wall_edge_color = 'rgb(255,  0,  0)' ;
var wall_fill_color = 'rgb(255,200,200)' ;

var p_i = 3 ;
var p_j = 2 ;
var p_A = 1 ;
var p_B = 2 ;
var all_gp = 0 ;

var O_A = p_A ;
var O_B = p_B ;

function Get(id){ return document.getElementById(id) ; }
