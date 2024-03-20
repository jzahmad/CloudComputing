const express = require('express');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 6000;

const baseDirectory = '../storage/'; 

app.use(express.json());

app.post('/calculate', async (req, res) => {
  try {
    
    if (!req.body.file) {
      return res.status(400).json({
        file: null,
        error: 'Invalid JSON input.' 
        });
    }

    const filePath = path.join(baseDirectory, req.body.file);

    try {

      await fs.access(filePath);

    } catch (error) {

      return res.status(404).json({
        file: req.body.file,
        error: "File not found."     
        });
    }

    const response = await axios.post('http://con2_server:7301/send', {
      file: req.body.file,
      product: req.body.product,
    });

    res.json(response.data);

  } catch (error) {

    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(port, () => {
  console.log(`Container 1 listening at http://localhost:${port}`);
});
