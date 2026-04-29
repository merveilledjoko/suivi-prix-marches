const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const marches = require('./routes/marches');
const produits = require('./routes/produits');
const prix = require('./routes/prix');

app.use('/marches', marches);
app.use('/produits', produits);
app.use('/prix', prix);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
