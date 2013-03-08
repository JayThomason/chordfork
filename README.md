ChordFork
========

ChordFork is a simple song hosting/dvcs application which I have begun working 
on for the class CS184. Users will have the ability to upload songs, where a 
song is currently a simple chord progression, rework those songs over time while 
saving different revisions, fork other users' public songs, and share songs with 
other users or friends. 

ChordFork is currently very alpha and can be tested at 
[chordfork.com](http://chordfork.com). It is built on 
[node.js](https://github.com/joyent/node) with 
[Express](https://github.com/visionmedia/express). I am running ChordFork on 
Heroku with the PostgreSQL add-on and using 
[sequelize](https://github.com/sequelize/sequelize) to interface with the 
database, although ChordFork can also be run locally with a local Postgres 
instance. 

In the long term I would love to make ChordFork into a full-fledged score editor 
in the browser, but as of right now solving the UI/UX problems associated with 
writing scores in the browser and engraving sheet music in real time are both 
outside of my expertise and too time-consuming to tackle.
