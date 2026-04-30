import { useState } from 'react';
import './App.css';

const MARCHES = [
  {id:1, nom:"Marche central", localisation:"Centre-ville", ville:"Yaounde", jour_marche:"tous les jours"},
  {id:2, nom:"Marche Mvog-betsi", localisation:"Mvog-betsi", ville:"Yaounde", jour_marche:"samedi"},
  {id:3, nom:"Ndokoti", localisation:"Centre-ville", ville:"Douala", jour_marche:"tous les jours"}
];

const PRODUITS = [
  {idprod:1, nom:"Tomate", categorie:"legume", unite:"kg", prix:[{marche:"Marche central",prix:250},{marche:"Ndokoti",prix:50}], stats:{nombre_marches:2,prix_min:50,prix_max:250,moyenne:150,somme:300}},
  {idprod:2, nom:"Riz", categorie:"cereale", unite:"kg", prix:[{marche:"Ndokoti",prix:650},{marche:"Marche Mvog-betsi",prix:750}], stats:{nombre_marches:2,prix_min:650,prix_max:750,moyenne:700,somme:1400}},
  {idprod:3, nom:"Goyave", categorie:"fruit", unite:"kg", prix:[{marche:"Ndokoti",prix:100}], stats:{nombre_marches:1,prix_min:100,prix_max:100,moyenne:100,somme:100}},
  {idprod:4, nom:"Boeuf", categorie:"viande", unite:"kg", prix:[{marche:"Marche Mvog-betsi",prix:3500},{marche:"Marche central",prix:2500}], stats:{nombre_marches:2,prix_min:2500,prix_max:3500,moyenne:3000,somme:6000}},
  {idprod:5, nom:"Poisson", categorie:"poisson", unite:"kg", prix:[{marche:"Marche Mvog-betsi",prix:1500}], stats:{nombre_marches:1,prix_min:1500,prix_max:1500,moyenne:1500,somme:1500}}
];

function App() {
  const [categorie, setCategorie] = useState('');
  const categories = [...new Set(PRODUITS.map(p => p.categorie))];
  const produitsFiltres = categorie ? PRODUITS.filter(p => p.categorie === categorie) : PRODUITS;

  return (
    <div className="app">
      <header className="header">
        <h1> Suivi des Prix des Marchés</h1>
        <p>Collecte et analyse des prix des denrées alimentaires</p>
      </header>
      <div className="container">
        <section className="section">
          <h2> Marchés Locaux</h2>
          <div className="cards">
            {MARCHES.map(m => (
              <div className="card" key={m.id}>
                <h3>{m.nom}</h3>
                <p> {m.localisation}</p>
                <p>{m.ville}</p>
                <p> {m.jour_marche}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="section">
          <h2> Produits</h2>
          <div className="filtre">
            <label>Filtrer par catégorie : </label>
            <select onChange={e => setCategorie(e.target.value)}>
              <option value="">Tous</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="cards-produit">
            {produitsFiltres.map(p => (
              <div className="card-produit" key={p.idprod}>
                <div className="produit-header">
                  <h3>{p.nom}</h3>
                  <span className="badge">{p.categorie}</span>
                </div>
                <p>Unité : {p.unite}</p>
                <hr/>
                <p><strong> Prix par marché :</strong></p>
                {p.prix.map((px, i) => (
                  <div className="prix-ligne" key={i}>
                    <span> {px.marche}</span>
                    <strong>{px.prix} FCFA/kg</strong>
                  </div>
                ))}
                <hr/>
                <p><strong> Statistiques :</strong></p>
                <div className="stats-mini">
                  <div className="stat-mini-card"><p>Marchés</p><h4>{p.stats.nombre_marches}</h4></div>
                  <div className="stat-mini-card"><p>Min</p><h4>{p.stats.prix_min} F</h4></div>
                  <div className="stat-mini-card"><p>Max</p><h4>{p.stats.prix_max} F</h4></div>
                  <div className="stat-mini-card"><p>Moyenne</p><h4>{p.stats.moyenne} F</h4></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
