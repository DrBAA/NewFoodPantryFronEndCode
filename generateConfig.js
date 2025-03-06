// generateConfig.js
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Generate config.js content
const configContent = `const config = ${JSON.stringify(process.env)};\nexport default config;\n`;

// Write config.js file
fs.writeFileSync('./js/config.js', configContent, 'utf8');
console.log('config.js file generated successfully.');
