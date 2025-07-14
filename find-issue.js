const fs = require('fs');

// Read the original file
const content = fs.readFileSync('/home/iain/ba-training/app/tutorial/chapter-3/page.tsx', 'utf8');

// Check for specific patterns that might cause issues
const lines = content.split('\n');

// Look for potential issues
let issues = [];

// Check for unmatched quotes in strings
lines.forEach((line, index) => {
  // Count single quotes that are not escaped
  const singleQuotes = (line.match(/(?<!\\)'/g) || []).length;
  // Count double quotes that are not escaped  
  const doubleQuotes = (line.match(/(?<!\\)"/g) || []).length;
  
  if (singleQuotes % 2 !== 0) {
    issues.push(`Line ${index + 1}: Unmatched single quotes`);
  }
  if (doubleQuotes % 2 !== 0) {
    issues.push(`Line ${index + 1}: Unmatched double quotes`);
  }
});

// Check for JSX expression issues
let braceCount = 0;
let inJSX = false;
let inString = false;
let inTemplate = false;
let stringChar = '';

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  const prevChar = i > 0 ? content[i - 1] : '';
  
  // Track string/template literal state
  if (!inString && !inTemplate && (char === '"' || char === "'")) {
    inString = true;
    stringChar = char;
  } else if (inString && char === stringChar && prevChar !== '\\') {
    inString = false;
    stringChar = '';
  } else if (!inString && !inTemplate && char === '`') {
    inTemplate = true;
  } else if (inTemplate && char === '`' && prevChar !== '\\') {
    inTemplate = false;
  }
  
  // Only count braces when not in strings/templates
  if (!inString && !inTemplate) {
    if (char === '<' && /[A-Za-z]/.test(content[i + 1] || '')) {
      inJSX = true;
    } else if (char === '>' && inJSX) {
      // Check if it's a closing tag
      const beforeTag = content.substring(Math.max(0, i - 10), i);
      if (!beforeTag.includes('</')) {
        inJSX = true; // Still in JSX content
      }
    }
    
    if (char === '{') {
      braceCount++;
    } else if (char === '}') {
      braceCount--;
      if (braceCount < 0) {
        const lineNum = content.substring(0, i).split('\n').length;
        issues.push(`Line ${lineNum}: Unmatched closing brace at position ${i}`);
        break;
      }
    }
  }
}

if (braceCount > 0) {
  issues.push(`Missing ${braceCount} closing braces`);
}

console.log('Issues found:');
issues.forEach(issue => console.log(issue));

if (issues.length === 0) {
  console.log('No obvious syntax issues found');
}