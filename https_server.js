const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');

// Load SSL certificates
const options = {
  key: fs.readFileSync(path.join(__dirname, '../certbot/privkey.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../certbot/fullchain.pem')),
};

// Create an Express application
const app = express();

// Serve static files from the 'chess_game' directory
app.use(express.static(path.join(__dirname, '../chess_game')));

// Serve the main HTML file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../chess_game/eii3.html'));
});

// Create an HTTPS server
const server = https.createServer(options, app);

// Set the server to listen on port 443 (HTTPS)
const PORT = 443;
server.listen(PORT, () => {
  console.log(`HTTPS server is running on https://localhost:${PORT}`);
});
