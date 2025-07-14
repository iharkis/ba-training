const fs = require('fs');
const babel = require('@babel/core');

const code = fs.readFileSync('/home/iain/ba-training/app/tutorial/chapter-3/page.tsx', 'utf8');

try {
  babel.transformSync(code, {
    presets: ['@babel/preset-react', '@babel/preset-typescript'],
    filename: 'page.tsx'
  });
  console.log('File is syntactically correct');
} catch (error) {
  console.log('Syntax error:', error.message);
  console.log('Location:', error.loc);
}