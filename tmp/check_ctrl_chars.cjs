const fs = require('fs');
const s = fs.readFileSync('src/pages/ProductPage.tsx');
for (let i=0;i<s.length;i++){
  const b = s[i];
  if (b===0 || (b<32 && b!==9 && b!==10 && b!==13)){
    console.log('ctrl char', b, 'at', i);
    const start = Math.max(0,i-30);
    const end = Math.min(s.length,i+30);
    console.log(s.slice(start,end).toString('utf8'))
    break;
  }
}
console.log('done');
