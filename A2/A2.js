const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 80;

app.use(bodyParser.json());

// rds database
const connection = mysql.createConnection({
    host: 'database-1.cfcy44gyo543.us-east-1.rds.amazonaws.com',
    post: '3306',
    user: 'admin',
    password: 'jazibahmad',
    database: 'products'
});

// local database
// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     post: '3306',
//     user: 'root',
//     password: '@Allahisone1',
//     database: 'products'
// });

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Define MySQL table schema if not exist
const createTableQuery = `CREATE TABLE IF NOT EXISTS products (
    name VARCHAR(255),
    price DECIMAL(10,2),
    availability BOOLEAN
)`;



connection.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error creating table:', err);
        return;
    }
    console.log('Table created successfully');
});
app.post('/store-products', (req, res) => {
    let products=req.body.products;
    
    const storedata = `INSERT INTO products (name, price, availability) VALUES ?`;
    const values = products.map(product => [product.name, product.price, product.availability]);

    connection.query(storedata,[values], (err, result) => {
        if (err) {
            console.error('Error creating table:', err);
            res.status(200).send("Error creating table:");
            return;
        }
        console.log('Products inserted successfully');
        res.status(200).send({"message": "Success."});
    });
})

app.post('/list-products', (req, res) => {
    const listdata = `SELECT * FROM products`;

    connection.query(listdata, (err, result) => {
        if (err) {
            console.error('Error listing products:', err); 
            return res.status(500).json({ error: 'Error listing products' }); 
        }
        console.log('Products listed successfully');
        res.status(200).json({ products: result }); 
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

