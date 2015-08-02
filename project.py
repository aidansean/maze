from project_module import project_object, image_object, link_object, challenge_object

p = project_object('maze', 'Maze - Island Quest')
p.domain = 'http://www.aidansean.com/'
p.path = 'maze'
p.preview_image    = image_object('%s/images/project.jpg'   %p.path, 150, 250)
p.preview_image_bw = image_object('%s/images/project_bw.jpg'%p.path, 150, 250)
p.folder_name = 'aidansean'
p.github_repo_name = 'maze'
p.mathjax = False
p.tags = 'Games'
p.technologies = 'canvas,CSS,HTML,JavaScript'
p.links.append(link_object(p.domain, 'maze', 'Live page'))
p.introduction = 'Following on from the <a href="http://aidansean.com/projects/?tag=platform-game">Platform game</a> and <a href="http://aidansean.com/projects/?tag=explorer-game">Explorer game</a> I wanted to create a tile based game.  This was partly inspired by the game <a href="http://www.roguetemple.com/2008/05/01/indev-kharne/">Kharne</a> which I had played many times, and I became frustrated with the lack of similar games online.  (It was this frustration that lead to a minor obsession with <a href="http://startcontinue.com/91/">91</a>, and the creation of the huge <a href="http://aidansean.com/projects/?p=490">91 map poster</a>.)'
p.overview = '''This game builds on the experience I gained from the Platform game, Explorer game and others.  The player finds themself on an island where they must pursue several adventures.  All of the graphics are procedurally generated and the emphasis is placed on making each adventure unique and special, rather than "Collect 100 coins" or "Beat this boss".  Like the other similar game projects the progress has been postponed here, as other projects are considered more important.'''

p.challenges.append(challenge_object('This game needed dialgoue trees and combat.', 'I wanted to make a game with some standaard dialogue and combat functionality for NPCs.  The dialogue tree to a while to work out, mostly because there\'s no clean way to do it, but I\'m quite happy with the outcome.  The combat was easier to manage, but it will take some iteration before it becomes optmised.', 'Resolved'))

p.challenges.append(challenge_object('I wanted to arrange object pseudorandomly on the canvas.', 'One of the things I wanted to do was auto-generate environemnts (for example, arrange flowers on grass randomly.)  Initially I used random number to do this, but immediately found that the flowers would move around as the player moved!  To get around this I used the room and position coordinates to generate pseudorandom numbers, which work much better.  Some objects moved (such as bees around the beehive) so for those I added a time dependent part to the motion.', 'Resolved'))

p.challenges.append(challenge_object('I wanted to envinonment to change slowly.', 'I wanted to have an adventure where the life on the island slow dies, and I made an effect where the grass slowly fades from green to grey.  This needs to be changed so that it only comes into play during certain missions, but I am very pleased with the result.  It looks very creepy and it was quite easy to implement.  I took some inspiration from <a href="http://jayisgames.com/games/one-chance/"One chance</a> for this.', 'Resolved'))

