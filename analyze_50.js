const fs = require('fs');

const html = fs.readFileSync('drdesign-website (50).html', 'utf8');

const end = 29140141;
const start = end - 8000;
console.log(html.substring(start, end));
