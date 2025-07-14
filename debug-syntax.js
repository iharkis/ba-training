const fs = require('fs');
const acorn = require('acorn');
const jsx = require('acorn-jsx');

try {
  const code = fs.readFileSync('/home/iain/ba-training/app/tutorial/chapter-3/page.tsx', 'utf8');
  
  // Try to parse with acorn
  const JSXParser = acorn.Parser.extend(jsx());
  const ast = JSXParser.parse(code, {
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true
  });
  
  console.log('File parsed successfully');
} catch (error) {
  console.log('Parse error:', error.message);
  console.log('Position:', error.pos);
  console.log('Location:', error.loc);
}