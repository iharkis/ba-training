const fs = require('fs');
const ts = require('typescript');

try {
  const code = fs.readFileSync('/home/iain/ba-training/app/tutorial/chapter-3/page.tsx', 'utf8');
  
  // Try to parse with TypeScript compiler
  const sourceFile = ts.createSourceFile(
    'page.tsx',
    code,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TSX
  );
  
  // Check for syntax errors
  const diagnostics = ts.getPreEmitDiagnostics(
    ts.createProgram(['page.tsx'], {
      allowJs: true,
      jsx: ts.JsxEmit.React,
      target: ts.ScriptTarget.Latest,
      module: ts.ModuleKind.ESNext,
      skipLibCheck: true,
      noEmit: true,
    }, {
      getSourceFile: (fileName) => fileName === 'page.tsx' ? sourceFile : undefined,
      writeFile: () => {},
      getCurrentDirectory: () => '',
      getDirectories: () => [],
      fileExists: () => false,
      readFile: () => '',
      getCanonicalFileName: (fileName) => fileName,
      useCaseSensitiveFileNames: () => true,
      getNewLine: () => '\n',
    })
  );
  
  if (diagnostics.length > 0) {
    diagnostics.forEach(diagnostic => {
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(diagnostic.start);
      console.log(`Error at line ${line + 1}, column ${character + 1}: ${diagnostic.messageText}`);
    });
  } else {
    console.log('No TypeScript errors found');
  }
} catch (error) {
  console.log('Error:', error.message);
}