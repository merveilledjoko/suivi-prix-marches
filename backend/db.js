const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'marche_prix.db'));

db.exec(`CREATE TABLE IF NOT EXISTS Marche (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT NOT NULL, localisation TEXT, ville TEXT, jour_marche TEXT);`);

db.exec(`CREATE TABLE IF NOT EXISTS Produit (idprod INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT NOT NULL, categorie TEXT, unite TEXT NOT NULL);`);

db.exec(`CREATE TABLE IF NOT EXISTS Prix (idprix INTEGER PRIMARY KEY AUTOINCREMENT, Marche_id INTEGER NOT NULL, Produit_idprod INTEGER NOT NULL, prix REAL NOT NULL, date_collecte TEXT NOT NULL DEFAULT (date('now')), collecte_par TEXT, FOREIGN KEY (Marche_id) REFERENCES Marche(id), FOREIGN KEY (Produit_idprod) REFERENCES Produit(idprod));`);

const m = db.prepare('SELECT COUNT(*) as count FROM Marche').get();
if (m.count === 0) {
    db.exec(`INSERT INTO Marche (nom,localisation,ville,jour_marche) VALUES ('Marche central','Centre-ville','Yaounde','tous les jour'),('Marche Mvog-betsi','Mvog-betsi','Yaounde','samedi'),('Ndokoti','centre-ville','Douala','tous les jours');`);
}

const p = db.prepare('SELECT COUNT(*) as count FROM Produit').get();
if (p.count === 0) {
    db.exec(`INSERT INTO Produit (nom,categorie,unite) VALUES ('Tomate','legume','kg'),('Riz','cereale','kg'),('Goyave','fruit','kg'),('boeuf','viande','kg'),('Poisson','poison','kg');`);
}

const pr = db.prepare('SELECT COUNT(*) as count FROM Prix').get();
if (pr.count === 0) {
    db.exec(`INSERT INTO Prix (Marche_id,Produit_idprod,prix,collecte_par) VALUES (1,1,250,'Marvel'),(3,1,50,'Marvel'),(3,2,650,'Marvel'),(2,2,750,'Marvel'),(3,3,100,'Marvel'),(2,4,3500,'Marvel'),(1,4,2500,'Marvel'),(2,5,1500,'Marvel');`);
}

module.exports = db;
