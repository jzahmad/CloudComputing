const express = require('express');
const app = express();
const fs = require('fs');

const csv = require('csv-parser');
var detect=require('detect-csv')

const PORT = 7301;

app.use(express.json()); 

app.post('/send', async (req, res) => {
  const file = req.body.file; 
  const product = req.body.product;

  let sums = 0;

  const filepath = '../storage/'; 

  const csvfile = `${filepath}/${file}`;

  var isCsv=detect(fs.readFileSync(csvfile));

  if(!isCsv){
    res.status(500).json({
      file: null,
      error: "Input file not in CSV format."
    });
    return;
  }

  const stream = fs.createReadStream(csvfile)
    .pipe(csv());

  stream.on('data', (data) => {
    if (data.product === product) {
      sums += parseInt(data.amount, 10);
    }
  });

  stream.on('end', () => {
    res.status(200).json({ file: file, sum: sums });
  });

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
