function travelator_N(){
  this.is_floor = true ;
  this.draw = function(context,i,j){
    var th = 0 ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    th = 1 ;
    context.fillStyle   = 'rgb(255,255,255)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    context.beginPath() ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.moveTo((i+0.0)*cellSize+th,(j+1.0)*cellSize-th) ;
    context.lineTo((i+0.0)*cellSize+th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+0.0)*cellSize+th) ;
    context.lineTo((i+1.0)*cellSize+th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+1.0)*cellSize+th,(j+1.0)*cellSize-th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+0.0)*cellSize+th,(j+1.0)*cellSize-th) ;
    context.fill() ;
  }
  this.interact = function(di,dj){ return !(dj==1) ; }
}
function travelator_E(){
  this.is_floor = true ;
  this.draw = function(context,i,j){
    var th = 0 ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    th = 1 ;
    context.fillStyle   = 'rgb(255,255,255)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    context.beginPath() ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.moveTo((i+0.0)*cellSize+th,(j+0.0)*cellSize+th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+0.0)*cellSize+th) ;
    context.lineTo((i+1.0)*cellSize-th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+1.0)*cellSize-th) ;
    context.lineTo((i+0.0)*cellSize+th,(j+1.0)*cellSize-th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+0.0)*cellSize+th,(j+0.0)*cellSize+th) ;
    context.fill() ;
  }
  this.interact = function(di,dj){ return !(di==-1) ; }
}
function travelator_S(){
  this.is_floor = true ;
  this.draw = function(context,i,j){
    var th = 0 ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    th = 1 ;
    context.fillStyle   = 'rgb(255,255,255)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    context.beginPath() ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.moveTo((i+0.0)*cellSize+th,(j+0.0)*cellSize+th) ;
    context.lineTo((i+0.0)*cellSize+th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+1.0)*cellSize-th) ;
    context.lineTo((i+1.0)*cellSize-th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+1.0)*cellSize-th,(j+0.0)*cellSize+th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+0.0)*cellSize+th,(j+0.0)*cellSize+th) ;
    context.fill() ;
  }
  this.interact = function(di,dj){ return !(dj==-1) ; }
}
function travelator_W(){
  this.is_floor = true ;
  this.draw = function(context,i,j){
    var th = 0 ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    th = 1 ;
    context.fillStyle   = 'rgb(255,255,255)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    context.beginPath() ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.moveTo((i+1.0)*cellSize-th,(j+0.0)*cellSize+th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+0.0)*cellSize+th) ;
    context.lineTo((i+0.0)*cellSize+th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+1.0)*cellSize-th) ;
    context.lineTo((i+1.0)*cellSize-th,(j+1.0)*cellSize-th) ;
    context.lineTo((i+0.5)*cellSize+th,(j+0.5)*cellSize+th) ;
    context.lineTo((i+1.0)*cellSize-th,(j+0.0)*cellSize+th) ;
    context.fill() ;
  }
  this.interact = function(di,dj){ return !(di==1) ; }
}
var travN = new travelator_N() ;
var travE = new travelator_E() ;
var travS = new travelator_S() ;
var travW = new travelator_W() ;

function floor_object(color){
  this.is_floor = true  ;
  this.color = color ;
  this.draw = function(context,i,j){
    var th = 0 ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    th = 0 ;
    context.fillStyle   = this.color ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    this.draw_details(context,i,j) ;
  }
  this.draw_details = function(context,i,j){ return ; }
  this.interact = function(di,dj){ return true ; }
}
var floor = new floor_object('rgb(255,255,255)') ;
var grass = new floor_object('rgb(200,255,200)') ;
var  sand = new floor_object('rgb(255,255,200)') ;

var flower_colors = [] ;
flower_colors.push( 'rgb(255,  0,  0)' ) ;
flower_colors.push( 'rgb(255,200,255)' ) ;
flower_colors.push( 'rgb(200,200,255)' ) ;
flower_colors.push( 'rgb(255,140,255)' ) ;
var flower_density = 0.1 ;

grass.draw_details = function(context,i,j){
  if(random_from_ABij(player.A,player.B,i,j)>1.0-flower_density){
    var r = 0.15*cellSize ;
    var randomX = random_from_ABij(player.A,player.B,-i+5, j+5) ;
    var randomY = random_from_ABij(player.A,player.B,-i+5,-j+5) ;
    var randomC = random_from_ABij(player.A,player.B, i+5,-j+5) ;
    var dx = r + 0.6*randomX*cellSize ;
    var dy = r + 0.6*randomY*cellSize ;
    var x = i*cellSize + dx ;
    var y = j*cellSize + dy ;
    var color = flower_colors[ Math.floor( flower_colors.length*randomC ) ] ;
    draw_flower(context,x,y,r,color) ;
  }
}

function draw_flower(context,x,y,r,color){
  context.lineWidth = 1 ;
  for(var i=0 ; i<5 ; i++){
    var cx = x + 0.6*r*Math.cos(2*Math.PI*i/5) ;
    var cy = y + 0.6*r*Math.sin(2*Math.PI*i/5) ;
    context.beginPath() ;
    context.arc(cx,cy,r,0,2*Math.PI,true) ;
    context.strokeStyle = 'rgb(0,0,0)' ;
    context.fillStyle   = color ;
    context.fill() ;
    context.stroke() ;
  }
  context.beginPath() ;
  context.arc(x,y,0.75*r,0,2*Math.PI,true) ;
  context.strokeStyle = 'rgb(0,0,0)' ;
  context.fillStyle   = 'rgb(255,255,0)' ;
  context.fill() ;
  context.stroke() ;
}

function tile_object(color1, color2){
  this.is_floor = true  ;
  this.color1 = color1 ;
  this.color2 = color2 ;
  this.draw = function(context,i,j){
    var th = 0 ;
    context.fillStyle   = 'rgb(200,200,200)' ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    th = 1 ;
    context.fillStyle   = this.color1 ;
    context.fillRect(i*cellSize+th,j*cellSize+th,cellSize-2*th,cellSize-2*th) ;
    context.fillStyle   = this.color2 ;
    context.fillRect(i*cellSize+th,(j+0.5)*cellSize+th,0.5*cellSize-th,0.5*cellSize-th) ;
    context.fillRect((i+0.5)*cellSize+th,j*cellSize+th,0.5*cellSize-th,0.5*cellSize-th) ;
  }
  this.interact = function(di,dj){ return true ; }
}
var tile_bw = new tile_object('rgb(200,200,200)','rgb(255,255,255)') ;
var tile_BB = new tile_object('rgb(150,150,255)','rgb(200,200,255)') ;
