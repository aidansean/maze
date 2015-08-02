var dialogue_text = '' ;
var dialogue_step = -1 ;
var dialogue_length = 500 ;
var dialogue_responses = [] ;
var dialogue_chosen_response = -1 ;
var dialogue_waiting_for_response = false ;
var dialogue_written_responses = false ;
var dialogue_delay = 100 ;

function interupt_dialogue(){
  if(dialogue_step>=0 && dialogue_step<dialogue_text.length){ 
    dialogue_step = dialogue_text.length ;
    return ;
  }
  if(current_npc!=-1 && dialogue_waiting_for_response==false){
    npcs[current_npc].converse() ;
  }
}

var blank_dialogue_padding = '' ;
pad_string(dialogue_length, blank_dialogue_padding, ' ') ;

function update_dialogue_box_style(){
  document.getElementById('div_dialogue'         ).style.border = '5px solid ' + wall_edge_color ;
  document.getElementById('span_dialogue_visible').style.color  =  wall_edge_color ;
}

function clear_dialogue(){
  document.getElementById('span_dialogue_visible'  ).innerHTML = '' ;
  document.getElementById('span_dialogue_invisible').innerHTML = '' ;
  document.getElementById('span_dialogue_padding'  ).innerHTML = blank_dialogue_padding ;
  document.getElementById('div_dialogue_response_wrapper').innerHTML = '' ;
}

function increment_dialogue(){
  if(dialogue_written_responses==true) return ;
  if(dialogue_step==-1) return ;
  if(dialogue_text=='') return ;
  
  if(dialogue_responses.length!=0) dialogue_waiting_for_response = true ;
  if(dialogue_step>dialogue_text.length){
    dialogue_step = -1 ;
    if(dialogue_responses.length==0){
      dialogue_chosen_response = -1 ;
    }
    else{
      dialogue_chosen_response = 0 ;
      for(var i=0 ; i<dialogue_responses.length ; i++){
        var div = document.createElement('div') ;
        div.id = 'diaglogue_response_'+i ;
        div.innerHTML = dialogue_responses[i][0] ;
        div.style.color = wall_edge_color ;
        document.getElementById('div_dialogue_response_wrapper').appendChild(div) ;
      }
      dialogue_written_responses = true ;
      draw_dialogue_reponses() ;
    }
    return ;
  }
  var   vis_text = dialogue_text.substring(0,dialogue_step) ;
  var invis_text = dialogue_text.substring(dialogue_step) ;
  var pad_length = dialogue_length - vis_text.length - invis_text.length ;
  var   pad_text = pad_string(pad_length, '', ' ') ;
  document.getElementById('span_dialogue_visible'  ).innerHTML =   vis_text ;
  document.getElementById('span_dialogue_invisible').innerHTML = invis_text ;
  document.getElementById('span_dialogue_padding'  ).innerHTML =   pad_text ;
  dialogue_step++ ;
  window.setTimeout(increment_dialogue,dialogue_delay) ;
}

function pad_string(width, string, padding){
  return (width<=string.length) ? string : pad_string(width, padding+string, padding) ;
}

function dialogue_change_prev_response(){
  //alert('^'+dialogue_chosen_response) ;
  dialogue_chosen_response--
  if(dialogue_chosen_response<0) dialogue_chosen_response = 0 ;
  //alert('%'+dialogue_chosen_response) ;
  draw_dialogue_reponses() ;
}
function dialogue_change_next_response(){
  //alert('#'+dialogue_chosen_response) ;
  dialogue_chosen_response++ ;
  if(dialogue_chosen_response>=dialogue_responses.length) dialogue_chosen_response = dialogue_responses.length-1 ;
  //alert('$'+dialogue_chosen_response) ;
  draw_dialogue_reponses() ;
}
function dialogue_choose_default_response(){
  //dialogue_chosen_response = 0 ;
  dialogue_respond() ;
}
function dialogue_choose_current_response(){
  dialogue_respond() ;
}
function dialogue_respond(){
  npcs[current_npc].dialogue_counter = dialogue_responses[dialogue_chosen_response][1] ;
  dialogue_waiting_for_response = false ;
  dialogue_responses = [] ;
  dialogue_chosen_response = -1 ;
  dialogue_written_responses = false ;
  npcs[current_npc].converse() ;
  clear_dialogue() ;
}

function question_object(question_text, answers_texts){
  this.question_text = question_text ;
  this.answers_texts = answers_texts ;
  
  this.cost_type = 0 ;
  // 0 for not specified, free
  // 1 for gold pieces
  
  this.add_gp_price = function(amount){
    this.cost_type = 1 ;
    this.price = amount ;
  }
  this.add_special_price = function(type, amount){
    this.cost_type = 1 ;
    this.price = amount ;
  }
}
