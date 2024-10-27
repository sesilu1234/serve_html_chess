const https = require('https');
const fs = require('fs');
const path = require('path');

// Load SSL certificates
const options = {
  key: fs.readFileSync(path.join(__dirname, '../certbot/privkey.pem')), // Use __dirname for better path resolution
  cert: fs.readFileSync(path.join(__dirname, '../certbot/fullchain.pem')), // Same here
};

// Create an HTTPS server
const server = https.createServer(options, (req, res) => {
  // Serve the HTML file directly
  const filePath = path.join(__dirname, '../chess_game/eii3.html'); // Change 'eii3.html' to your HTML file name

  // Read the HTML file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(500);
      res.end('Sorry, there was an error: ' + error.code + ' ..\n');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf-8');
    }
  });
});

// Set the server to listen on port 443 (HTTPS)
const PORT = 443; // Default HTTPS port
server.listen(PORT, () => {
  console.log(`HTTPS server is running on https://localhost:${PORT}`);
});
