function pad_and_door(A1,B1,i1,j1,A2,B2,i2,j2,letter,toggle){
  // The switch exists at point 1 and the door is at point 2
  // The switch can be labelled with a letter
  // If toggle=true then the pad opens or closes the door with each interaction
  // Otherwise the door is open only when pressure is applied
  this.is_floor = true ;
  this.is_pushable_traversable = true ;
  this.id = pad_and_door_objects.length ;
  this.A1 = A1 ; this.A2 = A2 ;
  this.B1 = B1 ; this.B2 = B2 ;
  this.i1 = i1 ; this.i2 = i2 ;
  this.j1 = j1 ; this.j2 = j2 ;
  this.letter = letter ;
  this.toggle = (toggle==undefined) ? false : toggle ;
  this.door_status = 1 ; // 1 for closed, 2 for open
  this.door_status_in = this.door_status ;
  this.draw = function(flag){
    // flag values:
    // 1: Draw pressure pad
    // 2: Draw door
    // 3: Draw letter on pad
    var opacity = 0.2 ;
    if(player.A==this.A1 && player.B==this.B1){
      context.font = fontSize+'pt arial' ;
      context.textAlign = 'center' ;
      if(flag==1){
        var th = 8 ;
        context.fillStyle = 'black' ;
        context.fillRect(this.i1*cellSize+th,(this.j1-0)*cellSize+th,cellSize-2*th,cellSize-2*th) ;
        th = 12 ;
        context.fillStyle = 'silver' ;
        context.fillRect(this.i1*cellSize+th,(this.j1-0)*cellSize+th,cellSize-2*th,cellSize-2*th) ;
        context.fillStyle = (this.door_status==1) ? 'rgb(0,0,0)' : 'rgba(0,0,0,'+opacity+')' ;
        context.fillText(this.letter,(this.i1+0.5)*cellSize,(this.j1+0.7)*cellSize) ;
      }
      if(flag==2){
        var th = 0 ;
        context.strokeStyle = wall_edge_color ;
        context.fillStyle   = wall_fill_color ;
        //context.fillRect(this.i2*cellSize+th,(this.j2-0)*cellSize+th,cellSize-2*th,cellSize-2*th) ;
        context.strokeRect(this.i2*cellSize+th,(this.j2-0)*cellSize+th,cellSize-2*th,cellSize-2*th) ;
        th = 6 ;
        context.lineWidth = 4 ;
        
        context.strokeStyle = wall_edge_color ;
        //context.fillRect(this.i2*cellSize+th,(this.j2-0)*cellSize+th,cellSize-2*th,cellSize-2*th) ;
        
        var CS = cellSize ;
        var cx = (this.i2+0.5)*CS ;
        var cy = (this.j2+0.5)*CS ;
        var cr = 0.5*cellSize-th ;
        
        // Draw outline
        context.beginPath() ;
        context.moveTo(cx-0.5*CS,cy-0.5*CS) ;
        context.lineTo(cx+0.5*CS,cy-0.5*CS) ;
        context.lineTo(cx+0.5*CS,cy+0.5*CS) ;
        context.lineTo(cx-0.5*CS,cy+0.5*CS) ;
        context.lineTo(cx-0.5*CS,cy-0.5*CS) ;
        
        context.moveTo(cx-cr,cy) ;
        context.arc(cx,cy,cr,Math.PI,0,false) ;
        context.lineTo(cx+cr,cy+cr) ;
        context.lineTo(cx-cr,cy+cr) ;
        context.lineTo(cx-cr,cy) ;
        context.fill('evenodd') ;
        context.stroke() ;
        
        // Draw door
        context.fillStyle   = 'rgb(205,133,63)' ;
        context.beginPath() ;
        context.moveTo(cx-cr,cy) ;
        context.arc(cx,cy,cr,Math.PI,0,false) ;
        context.lineTo(cx+cr,cy+cr) ;
        context.lineTo(cx-cr,cy+cr) ;
        context.lineTo(cx-cr,cy) ;
        context.stroke() ;
        if(this.door_status==1){
          context.fill() ;
        }
        context.fillStyle = (this.door_status==1) ? 'rgb(0,0,0)' : 'rgba(0,0,0,'+opacity+')' ;
        context.fillText(this.letter,(this.i2+0.5)*cellSize,(this.j2+0.7)*cellSize) ;
      }
      if(flag==3){
        var th = 15 ;
        context.fillStyle = 'rgba(255,255,255,0.6)' ;
        context.fillRect(this.i1*cellSize+th, this.j1*cellSize+th, cellSize-2*th, cellSize-2*th) ;
        context.fillStyle = 'rgb(0,0,0)' ;
        context.fillText(this.letter,(this.i1+0.5)*cellSize,(this.j1+0.7)*cellSize) ;
      }
      if(flag==4){
        var th = 15 ;
        context.fillStyle = 'rgba(255,255,255,0.6)' ;
        context.fillRect(this.i2*cellSize+th, this.j2*cellSize+th, cellSize-2*th, cellSize-2*th) ;
        context.fillStyle = 'rgb(0,0,0)' ;
        context.fillText(this.letter,(this.i2+0.5)*cellSize,(this.j2+0.7)*cellSize) ;
      }
    }
  }
  this.interact = function(di,dj){
    var m_out = get_master_map_cell(player.A,player.B,player.i,player.j) ;
    var m_in  = get_master_map_cell(player.A,player.B,player.i+di,player.j+dj) ;
    
    if(m_in>=2000 && m_in<3000 && this.door_status==1) return false ;
    
    if(m_out>=1000 && m_out<2000) this.door_status = 3-this.door_status ;
    if(m_in >=1000 && m_in <2000) this.door_status = 3-this.door_status ;
    return true ;
  }
  this.write_output = function(){
    return 'pad_and_door_objects.push(new pad_and_door(' 
      + this.A1 + ',' + this.B1 + ',' 
      + this.i1 + ',' + this.j1 + ','
      + this.A2 + ',' + this.B2 + ',' 
      + this.i2 + ',' + this.j2 + ','
      + '"' + this.letter + '",true) ) ;' ;
  }
}

function lever_and_door(A1,B1,i1,j1,A2,B2,i2,j2,letter,dir){
  // The switch exists at point 1 and the door is at point 2
  // The switch can be labelled with a letter
  // The direction of the switch as it is embedded in a wall
  this.is_floor = true ;
  this.is_pushable_traversable = true ;
  this.id = lever_and_door_objects.length ;
  this.A1 = A1 ; this.A2 = A2 ;
  this.B1 = B1 ; this.B2 = B2 ;
  this.i1 = i1 ; this.i2 = i2 ;
  this.j1 = j1 ; this.j2 = j2 ;
  this.letter = letter ;
  this.dir = dir ;
  this.door_status = 1 ; // 1 for closed, 2 for open
  this.door_status_in = this.door_status ;
  this.draw = function(flag){
    // flag values:
    // 1: Draw pressure pad
    // 2: Draw door
    // 3: Draw letter on pad
    var opacity = 0.2 ;
    if(player.A==this.A1 && player.B==this.B1){
      context.font = fontSize+'pt arial' ;
      context.textAlign = 'center' ;
      if(flag==1){
        var t = get_thing(1) ;
        //t.draw(context,this.i1,this.j1) ;
        
        context.fillStyle = wall_edge_color ;
        var x = (this.i1+0)*cellSize ;
        var y = (this.j1+0)*cellSize ;
        var w = cellSize ;
        var h = cellSize ;
        var th = 6 ;
        context.fillRect(x,y,w,h) ;
        
        if(true){
          if(this.dir=='N'){
          }
          else if(this.dir=='E'){
          }
          else if(this.dir=='S'){
          }
          else if(this.dir=='W'){
            x += th ;
            y += th ;
            if(this.door_status==1){
              context.strokeStyle = 'rgb(255,0,0)' ;
              context.beginPath() ;
              context.moveTo(x,y) ;
              context.lineTo(x+2*th,y+2*th) ;
              context.moveTo(x+2*th,y) ;
              context.lineTo(x,y+2*th) ;
              context.stroke() ;
            }
            else{
              context.strokeStyle = 'rgb(0,255,0)' ;
              y += 4*th ;
              context.beginPath() ;
              context.moveTo(x+2.5*th,y) ;
              context.lineTo(x+0.5*th,y+2*th) ;
              context.moveTo(x+0.5*th,y+2*th) ;
              context.lineTo(x+0.0*th,y+1.5*th) ;
              context.stroke() ;
            }
            th = 12 ;
            x = this.i1*cellSize+2*th ;
            y = (this.j1-0)*cellSize+th ;
            w = cellSize-2*th ;
            h = cellSize-2*th ;
            context.fillStyle = wall_edge_color ;
            context.fillRect(x,y,w,h) ;
            
            context.fillStyle = wall_fill_color ;
            context.fillText(this.letter,(this.i1+0.5)*cellSize+th,(this.j1+0.7)*cellSize) ;
          }
        }
        
        
      }
      if(flag==2){
        var th = 0 ;
        context.strokeStyle = wall_edge_color ;
        context.fillStyle   = wall_fill_color ;
        //context.fillRect(this.i2*cellSize+th,(this.j2-0)*cellSize+th,cellSize-2*th,cellSize-2*th) ;
        context.strokeRect(this.i2*cellSize+th,(this.j2-0)*cellSize+th,cellSize-2*th,cellSize-2*th) ;
        th = 6 ;
        context.lineWidth = 4 ;
        
        context.strokeStyle = wall_edge_color ;
        //context.fillRect(this.i2*cellSize+th,(this.j2-0)*cellSize+th,cellSize-2*th,cellSize-2*th) ;
        
        var CS = cellSize ;
        var cx = (this.i2+0.5)*CS ;
        var cy = (this.j2+0.5)*CS ;
        var cr = 0.5*cellSize-th ;
        
        // Draw outline
        context.beginPath() ;
        context.moveTo(cx-0.5*CS,cy-0.5*CS) ;
        context.lineTo(cx+0.5*CS,cy-0.5*CS) ;
        context.lineTo(cx+0.5*CS,cy+0.5*CS) ;
        context.lineTo(cx-0.5*CS,cy+0.5*CS) ;
        context.lineTo(cx-0.5*CS,cy-0.5*CS) ;
        
        context.moveTo(cx-cr,cy) ;
        context.arc(cx,cy,cr,Math.PI,0,false) ;
        context.lineTo(cx+cr,cy+cr) ;
        context.lineTo(cx-cr,cy+cr) ;
        context.lineTo(cx-cr,cy) ;
        context.fill('evenodd') ;
        context.stroke() ;
        
        // Draw door
        context.fillStyle   = 'rgb(205,133,63)' ;
        context.beginPath() ;
        context.moveTo(cx-cr,cy) ;
        context.arc(cx,cy,cr,Math.PI,0,false) ;
        context.lineTo(cx+cr,cy+cr) ;
        context.lineTo(cx-cr,cy+cr) ;
        context.lineTo(cx-cr,cy) ;
        context.stroke() ;
        if(this.door_status==1){
          context.fill() ;
        }
        context.fillStyle = (this.door_status==1) ? 'rgb(0,0,0)' : 'rgba(0,0,0,'+opacity+')' ;
        context.fillText(this.letter,(this.i2+0.5)*cellSize,(this.j2+0.7)*cellSize) ;
      }
      if(flag==3){
        var th = 15 ;
        context.fillStyle = 'rgba(255,255,255,0.6)' ;
        context.fillRect(this.i1*cellSize+th, this.j1*cellSize+th, cellSize-2*th, cellSize-2*th) ;
        context.fillStyle = 'rgb(0,0,0)' ;
        context.fillText(this.letter,(this.i1+0.5)*cellSize,(this.j1+0.7)*cellSize) ;
      }
      if(flag==4){
        var th = 15 ;
        context.fillStyle = 'rgba(255,255,255,0.6)' ;
        context.fillRect(this.i2*cellSize+th, this.j2*cellSize+th, cellSize-2*th, cellSize-2*th) ;
        context.fillStyle = 'rgb(0,0,0)' ;
        context.fillText(this.letter,(this.i2+0.5)*cellSize,(this.j2+0.7)*cellSize) ;
      }
    }
  }
  this.interact = function(di,dj){
    var m = get_master_map_cell(player.A,player.B,player.i+di,player.j+dj) ;
    if(m>=4000 && m<5000) return (this.door_status==2) ;
    m = get_cell(this.A2,this.B2,this.i2,this.j2) ;
    if(m==2) return false ;
    if(di== 1 && dir=='W') this.door_status = 3 - this.door_status ;
    if(di==-1 && dir=='E') this.door_status = 3 - this.door_status ;
    if(dj== 1 && dir=='N') this.door_status = 3 - this.door_status ;
    if(dj==-1 && dir=='S') this.door_status = 3 - this.door_status ;
    draw_all() ;
    return false ;
  }
  this.write_output = function(){
    return 'lever_and_door_objects.push(new lever_and_door(' 
      + this.A1 + ',' + this.B1 + ',' 
      + this.i1 + ',' + this.j1 + ','
      + this.A2 + ',' + this.B2 + ',' 
      + this.i2 + ',' + this.j2 + ','
      + '"' + this.letter + '","'+this.dir+'") ) ;' ;
  }
}
