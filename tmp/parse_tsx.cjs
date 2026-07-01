const ts = require('typescript');
const fs = require('fs');
const path = 'src/pages/ProductPage.tsx';
const src = fs.readFileSync(path, 'utf8');
const sf = ts.createSourceFile(path, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const diagnostics = ts.getPreEmitDiagnostics(sf);
if (diagnostics.length === 0) {
  console.log('No diagnostics');
} else {
  diagnostics.forEach(d => {
    const { line, character } = d.file.getLineAndCharacterOfPosition(d.start);
    console.log(`${d.messageText} at ${line+1}:${character+1}`);
  });
}
