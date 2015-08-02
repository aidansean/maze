var npcs = [] ;
var npc_gerald = new npc_object('Gerald', 1, 1, 5, 5, 'red', 'white') ;
npc_gerald.dialogue.push(['Hello there!']) ;
npc_gerald.dialogue.push([['My name is Gerald, and I like grapes.',0], ['What?',4], ['Oh',2], ['My face hurts',5]]) ;
npc_gerald.dialogue.push(['I saw a hedge once.',[3]]) ;
npc_gerald.dialogue.push([['It\'s true.',[2]],['My face hurts',[2]],['Yes, I\'m sure it is.',2]]) ;
npc_gerald.dialogue.push(['I said I like grapes.  They make wine.',[3]]) ;
npc_gerald.dialogue.push(['You should see if they have a cream for that.',[2]]) ;
npc_gerald.dialogue_preamble.push('What what? (press space to continue the conversation)') ;

var npc_gertrude = new npc_object('Gertrude', 1, 1, 3, 3, 'brown', 'pink') ;
npc_gertrude.dialogue.push(['Do not listen to Gerald.']) ;
npc_gertrude.dialogue.push(['He lies.', [0,2]]) ;
npc_gertrude.dialogue.push(['I don\'t know what else to say.',[0]]) ;

var npc_glados = new npc_object('GLaDOS', 1, 1,10, 3, 'orange', '#ffdddd') ;
npc_glados.dialogue.push(['This was a triumph, I\'m making a note here: HUGE SUCCESS.']) ;
npc_glados.dialogue.push(['It\'s hard to overstate my satisfaction.']) ;
npc_glados.dialogue.push(['Aperture Science, we do what we must because we can.']) ;
npc_glados.dialogue.push(['For the good of all of us except the ones who are dead.']) ;
npc_glados.dialogue.push(['But there\'s no sense crying over every mistake, you just keep on trying \'til you run out of cake.']) ;
npc_glados.dialogue.push(['And the science gets done and you make a neat gun for the people who are still alive.']) ;

//npcs.push(npc_gerald  ) ;
//npcs.push(npc_gertrude) ;
//npcs.push(npc_glados  ) ;
