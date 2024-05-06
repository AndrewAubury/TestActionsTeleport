const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the path to the socket file one directory up
const socketPath = path.join(__dirname, '..', 'server.socket');

// Remove the socket file if it already exists
try {
  if (fs.existsSync(socketPath)) {
    fs.unlinkSync(socketPath);
  }
} catch (err) {
  console.error(err);
}

// Create the HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
});

// Listen on the Unix socket
server.listen(socketPath, () => {
  console.log(`Server running at ${socketPath}`);
});

// Handle server errors (such as EADDRINUSE)
server.on('error', (e) => {
  console.error(`Server error: ${e.message}`);
});
