const express = require('express');
const router = express.Router();
const db = require('../db');
router.get('/', (req, res) => {
  const produits = db.prepare('SELECT * FROM Produit').all();
  res.json(produits);
});
router.get('/categorie/:cat', (req, res) =>{
  const produits = db.prepare('SELECT * FROM Produit WHERE categorie = ?').all(req.params.cat);
  res.json(produits);
});
module.exports = router;
