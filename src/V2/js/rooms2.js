//pad_and_door_objects.push(new pad_and_door(1,3,6,4,1,3,6,6,'A',true) ) ;
//pad_and_door_objects.push(new pad_and_door(1,3,8,4,1,3,8,8,'B',true) ) ;

var lever_and_door_objects = [] ;
var   pad_and_door_objects = [] ;
var enemies = [] ;

for(var i=0 ; i<pad_and_door_objects.length ; i++){
  var p = pad_and_door_objects[i] ;
  master_map[p.B1][p.A1].cells[p.j1][p.i1] = 1000+i ;
  master_map[p.B2][p.A2].cells[p.j2][p.i2] = 2000+i ;
}
for(var i=0 ; i<lever_and_door_objects.length ; i++){
  var l = lever_and_door_objects[i] ;
  master_map[l.B1][l.A1].cells[l.j1][l.i1] = 3000+i ;
  master_map[l.B2][l.A2].cells[l.j2][l.i2] = 4000+i ;
}

for(var i=0 ; i<npcs.length ; i++){
  npcs[i].index = i ;
  master_map[npcs[i].B][npcs[i].A].cell_contents[npcs[i].j][npcs[i].i] = 9000+i ;
}

for(var i=0 ; i<enemies.length ; i++){
  enemies[i].index = i ;
  var e = enemies[i] ;
  master_map[e.B][e.A].cell_contents[e.j][e.i] = 8000+i ;
}

var rooms = 0 ;
populate_rooms() ;

var room_tmp = get_room_by_name('The water wheel') ;
room_tmp.load = function(){
  var sound = Get('audio_runningwater') ;
  sound.volume = 0.2 ;
  sound.play() ;
  return this.load0() ;
} ;
room_tmp.unload = function(){
  var sound = Get('audio_runningwater') ;
  sound.pause() ;
  sound.currentTime = 0 ;
} ;

room_tmp = get_room_by_name("Witch's house") ;
room_tmp.load = function(){
  this.load0() ;
  control_listeners = [] ;
  add_control_listener(7,7,"set_spotlight_mode(true)") ;
  var sound = Get('audio_bubbles2') ;
  sound.volume = 0.2 ;
  sound.play() ;
  return ;
}
room_tmp.unload = function(){
  var sound = Get('audio_bubbles2') ;
  sound.pause() ;
  sound.currentTime = 0 ;
} ;

room_tmp = get_room_by_name('Stone circle') ;
room_tmp.load = function(){
  this.load0() ;
  control_listeners = [] ;
  add_control_listener(7,8,"set_spotlight_mode(false)") ;
  return ;
}
