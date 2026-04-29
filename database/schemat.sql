CREATE TABLE Marche ( id INTEGER PRIMARY KEY AUTOINCREMENT , nom TEXT NOT NULL , localisation TEXT , ville TEXT , jour_marche TEXT);
CREATE TABLE Produit ( idprod INTEGER PRIMARY KEY AUTOINCREMENT , nom TEXT NOT NULL , categorie TEXT CHECK(categorie IN ('legume', 'fruit', 'cereale', 'viande', 'poisson', 'autre')), unite TEXT NOT NULL);
CREATE TABLE Prix ( idprix INTEGER PRIMARY KEY AUTOINCREMENT, Marche_id INTEGER NOT NULL, Produit_idprod INTEGER NOT NULL, prix REAL NOT NULL, date_collecte TEXT NOT NULL DEFAULT (date('now')), FOREIGN KEY (Marche_id) REFERENCES Marche(id), FOREIGN KEY ( Produit_idprod) REFERENCES Produit(idprod));
	 
