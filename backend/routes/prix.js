const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    const prix = db.prepare('SELECT * FROM Prix').all();
    res.json(prix);
});

router.get('/stats/:produit_id', (req, res) => {
    const stats = db.prepare('SELECT pr.nom AS produit, COUNT(*) AS nombre_marches, SUM(p.prix) AS somme, ROUND(AVG(p.prix), 2) AS moyenne, MIN(p.prix) AS prix_min, MAX(p.prix) AS prix_max FROM Prix p JOIN Produit pr ON p.Produit_idprod = pr.idprod WHERE p.Produit_idprod = ?').get(req.params.produit_id);
    res.json(stats);
});

router.get('/marches/:produit_id', (req, res) => {
    const result = db.prepare('SELECT m.nom AS marche, m.ville, m.jour_marche, p.prix FROM Prix p JOIN Marche m ON p.Marche_id = m.id WHERE p.Produit_idprod = ?').all(req.params.produit_id);
    res.json(result);
});

router.post('/', (req, res) => {
    const { marche_id, produit_id, prix, collecte_par } = req.body;
    const result = db.prepare('INSERT INTO Prix (Marche_id, Produit_idprod, prix, collecte_par) VALUES (?, ?, ?, ?)').run(marche_id, produit_id, prix, collecte_par);
    res.json({ id: result.lastInsertRowid, message: 'Prix ajouté !' });
});

module.exports = router;

