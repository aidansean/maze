var current_npc = -1 ;

function npc_object(name, A, B, i, j, color1, color2){
  this.name = name ;
  this.A = A ;
  this.B = B ;
  this.i = i ;
  this.j = j ;
  this.color1 = color1 ;
  this.color2 = color2 ;
  
  this.dialogue_preamble = new Array() ;
  this.said_preamble = false ;
  
  this.dialogue = new Array() ;
  this.dialogue_counter = 0 ;
  
  this.questions = new Array() ;
  
  this.index = -1 ;
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
  this.interact = function(di,dj){
    this.converse() ;
    current_npc = this.index ;
    return false ;
  }
  this.converse = function(){
    if(this.dialogue_preamble.length==0) this.said_preamble = true ;
    if(dialogue_step>0 && dialogue_step<this.dialogue[this.dialogue_counter].length){
      interupt_dialogue() ;
    }
    else if(this.said_preamble==false){
      dialogue_text = this.name + ': ' + this.dialogue_preamble[this.dialogue_counter] ;
      dialogue_step = this.name.length+2 ;
      increment_dialogue() ;
      this.dialogue_counter = (this.dialogue_counter+1)%this.dialogue_preamble.length ;
      if(this.dialogue_counter==0){
        this.said_preamble = true ;
      }
    }
    else{
      dialogue_responses = [] ;
      if(this.dialogue[this.dialogue_counter].length==1){
        // Normal dialogue
        dialogue_text = this.name + ': ' + this.dialogue[this.dialogue_counter][0] ;
        dialogue_step = this.name.length+2 ;
        increment_dialogue() ;
        this.dialogue_counter = (this.dialogue_counter+1)%this.dialogue.length ;
        if(this.dialogue_counter==this.dialogue.length) this.dialogue_counter = 0 ;
      }
      else if(this.dialogue[this.dialogue_counter].length==2){
        // Normal dialogue, different destination
        dialogue_text = this.name + ': ' + this.dialogue[this.dialogue_counter][0] ;
        dialogue_step = this.name.length+2 ;
        increment_dialogue() ;
        if(this.dialogue[this.dialogue_counter][1].length==1){
          this.dialogue_counter = this.dialogue[this.dialogue_counter][1] ;
        }
        else{
          var r = Math.floor(Math.random()*this.dialogue[this.dialogue_counter][1].length) ;
          this.dialogue_counter = this.dialogue[this.dialogue_counter][1][r] ;
        }
      }
      else{ // Multiple responses
        dialogue_text = this.name + ': ' + this.dialogue[this.dialogue_counter][0][0] ;
        dialogue_step = this.name.length+2 ;
        dialogue_chosen_response = 0 ;
        for(var i=1 ; i<this.dialogue[this.dialogue_counter].length ; i++){
          dialogue_responses.push(this.dialogue[this.dialogue_counter][i]) ;
        }
        increment_dialogue() ;
      }
    }
  }
}



