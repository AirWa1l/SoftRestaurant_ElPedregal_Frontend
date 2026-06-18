const fs = require('fs');
const p = 'src/pages/ProductPage.tsx';
let s = fs.readFileSync(p,'utf8');
if (s.indexOf('\r\n')!==-1){
  s = s.replace(/\r/g,'');
  fs.writeFileSync(p,s,'utf8');
  console.log('Normalized EOL in',p);
} else console.log('No CRLF found in',p);
