CREATE TABLE IF NOT EXISTS Bosses(extid INTEGER PRIMARY KEY AUTOINCREMENT, boss_name TEXT NOT NULL, about TEXT NOT NULL, rating INTEGER NOT NULL, game TEXT NOT NULL, image TEXT, website TEXT, difficulty INTEGER)

-- INSERT INTO Bosses (boss_name,about,rating,game,image,website,difficulty) VALUES ("","",0,"","","",0) -- TEMPLATE

DROP TABLE Bosses;

INSERT INTO Bosses (boss_name,about,rating,game,image,website,difficulty) VALUES ("King Slime","First Actual boss of Terraria, Just dash underneath",3,"Terraria","","",2)
INSERT INTO Bosses (boss_name,about,rating,game,image,website,difficulty) VALUES ("Eye Of Cthulhu","Grappling Hook, Interesting boss without hermes Boots",4,"Terraria","https://static.wikia.nocookie.net/villains/images/8/83/EyeofCthulhubutscarier.png/revision/latest/scale-to-width/360?cb=20190829214450","https://terraria.fandom.com/wiki/Eye_of_Cthulhu",3)
INSERT INTO Bosses (boss_name,about,rating,game,image,website,difficulty) VALUES ("","",0,"","","",0)
INSERT INTO Bosses (boss_name,about,rating,game,image,website,difficulty) VALUES ("","",0,"","","",0)
INSERT INTO Bosses (boss_name,about,rating,game,image,website,difficulty) VALUES ("","",0,"","","",0)
SELECT * from Bosses;

UPDATE sqlite_sequence SET seq = 7 WHERE name = 'Bosses';

SELECT * FROM Bosses ORDER BY rating DESC