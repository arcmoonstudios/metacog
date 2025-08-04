import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.join(__dirname, '..', 'dist', 'index.js');

if (fs.existsSync(buildPath)) {
  console.log('✅ PASS');
  process.exit(0);
} else {
  console.log('❌ FAIL');
  process.exit(1);
}