const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const distDir = path.join(__dirname, 'dist');
const htaccess = path.join(__dirname, '.htaccess');

if (fs.existsSync(outDir)) {
  try {
    if (fs.existsSync(distDir)) {
      fs.rmSync(distDir, { recursive: true, force: true });
    }
    fs.cpSync(outDir, distDir, { recursive: true });
    if (fs.existsSync(htaccess)) {
      fs.copyFileSync(htaccess, path.join(distDir, '.htaccess'));
    }
    console.log('✓ Successfully mirrored out to dist with .htaccess');
  } catch (err) {
    console.warn('Postbuild copy warning:', err.message);
  }
}
