const express = require(
'express');
const router = express.Router();
const db = require('../db');

// GET - Liste tous les marchés
router.get('/', (req, res) => {
    const marches = db.prepare('SELECT * FROM Marche').all();
    res.json(marches);
});

// GET - Un seul marché par ID
router.get('/:id', (req, res) => {
    const marche = db.prepare(
        'SELECT * FROM Marche WHERE id = ?'
    ).get(req.params.id);
    res.json(marche);
});

module.exports = router;
