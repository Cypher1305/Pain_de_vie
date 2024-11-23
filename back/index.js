//Saint Esprit, soit le maitre d'ouvrage de cette Application; Que chaque utilisateur puisse trouver les Saintes Paroles, un Message Divin au moment opportun; Ravive la flamme , Fais grandir la Foi, Console et Béni 

const express = require('express');
const db = require('./db'); // Importer la connexion à la base de données
const app = express();
const cors =require('cors');
const port = 3100;

app.use(cors()); // Autoriser toutes les origines
app.use(express.json()); // Parse le JSON des requêtes


app.get('/verset', (req, res) => {
    // Générer une graine basée sur la date pour garantir qu'un seul verset est sélectionné par jour
    const today = new Date().toISOString().split('T')[0];
    const seed = today.split('-').join('');

    // Query pour récupérer un verset aléatoire basé sur la graine
    db.query(
        `SELECT b.name AS book_name, v.chapter, v.verse, v.text
         FROM bible_verses_segond_1910 v
         JOIN books b ON v.book = b.id
         ORDER BY RAND(?) 
         LIMIT 1`,
        [seed],
        (err, result) => {
            if (err) {
                console.error('Erreur de requête :', err);
                res.status(500).send('Erreur lors de la récupération du verset.');
            } else {
                res.json(result[0]); // Retourne le verset sélectionné
            }
        }
    );
    
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
