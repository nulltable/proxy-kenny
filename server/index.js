require('newrelic');
const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/search', proxy('http://localhost:3030/search'));

app.get('/', (req, res) => {
  if (!req.params.id) {
    res.status(400);
    res.end();
  } else {
    res.sendFile('index.html', { root: path.resolve(__dirname, '../public') });
  }
});

app.listen(3000, () => {
  console.log('Open Table proxy server listening on port 3000!');
});
