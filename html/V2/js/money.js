var gp_fontSize = 0.3*cellSize ;

function gold_piece_object(amount){
  this.amount = amount ;
  this.interact = function(di, dj){
    player.gp_current_room += this.amount ;
    player.gp += this.amount ;
    
    var sound = Get('audio_smbcoin') ;
    sound.pause() ;
    sound.currentTime = 0 ;
    sound.play() ;
    rooms[player.B][player.A].cell_contents[player.j+dj][player.i+di] = 0 ;
    return true ;
  }
  this.draw = function(context,i,j){
    var cx = (i+0.5)*cellSize ;
    var cy = (j+0.5)*cellSize ;
    var cr = 0.3*cellSize ;
    context.beginPath() ;
    context.strokeStyle = 'rgb(0,0,0)' ;
    context.lineWidth = 2 ;
    context.fillStyle = 'rgb(255,223,0)' ;
    context.arc(cx,cy,cr,0,2*Math.PI,true) ;
    context.fill() ;
    context.stroke() ;
    context.font = gp_fontSize+'pt arial' ;
    context.fillStyle = 'rgb(0,0,0)' ;
    context.textAlign = 'center' ;
    context.fillText(currency_symbol+this.amount,cx,cy+0.35*fontSize) ;
  }
}
var gp1 = new gold_piece_object(1) ;
var gp2 = new gold_piece_object(2) ;
var gp5 = new gold_piece_object(5) ;
function count_gold_on_map(){
  var gp = 0 ;
  for(var B=0 ; B<master_map.length ; B++){
    for(var A=0 ; A<master_map[B].length ; A++){
      for(var j=0 ; j<master_map[B][A].cell_contents.length ; j++){
        for(var i=0 ; i<master_map[B][A].cell_contents[j].length ; i++){
          switch(master_map[B][A].cell_contents[j][i]){
            case 21: gp +=1 ; break ;
            case 22: gp +=2 ; break ;
            case 23: gp +=5 ; break ;
          }
        }
      }
    }
  }
  return gp ;
}
