const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Configuración de la conexión a MySQL (XAMPP por defecto)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'surco_aprende'
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos MySQL:', err);
        return;
    }
    console.log('¡Conectado exitosamente a la base de datos MySQL!');
});

// ==========================================
// RUTAS DE LA API (Endpoints)
// ==========================================

// 1. Obtener todos los libros
app.get('/api/libros', (req, res) => {
    db.query('SELECT * FROM libros', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2. Obtener todos los socios
app.get('/api/socios', (req, res) => {
    db.query('SELECT * FROM socios', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 3. Obtener préstamos con relaciones
app.get('/api/prestamos', (req, res) => {
    const query = `
        SELECT p.id, s.nombre AS socio, l.titulo AS libro, p.fecha_prestamo, p.estado 
        FROM prestamos p
        JOIN socios s ON p.id_socio = s.id
        JOIN libros l ON p.id_libro = l.id
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 4. Obtener preguntas de práctica
app.get('/api/practica', (req, res) => {
    db.query('SELECT * FROM practica', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname)));

app.get('*', (req, res) => {
    if (path.extname(req.path)) return res.status(404).send('No encontrado: ' + req.path);
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${3000}`);
});
