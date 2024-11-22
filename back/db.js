// Charger les variables d'environnement
require('dotenv').config();

// Connexion à la base de données avec mysql2
const mysql = require('mysql2');

// Création de la connexion à la base de données
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Vérifier si la connexion est réussie
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données: ', err);
    } else {
        console.log('Connexion à la base de données réussie.');
    }
});

// Exporter la connexion pour l'utiliser ailleurs dans l'application
module.exports = db;
