const fs = require('fs');
const s = fs.readFileSync('src/pages/ProductPage.tsx','utf8');
const pairs = {'(':')','[':']','{':'}'};
const opens = Object.keys(pairs);
const closes = Object.values(pairs);
let stack = [];
let inside = null;
for (let i=0;i<s.length;i++){
  const c = s[i];
  if (!inside){
    if (s.startsWith('//',i)){
      i = s.indexOf('\n',i);
      if (i===-1) break;
      continue;
    }
    if (s.startsWith('/*',i)){
      const j = s.indexOf('*/',i+2);
      if (j===-1){ console.log('Unclosed block comment'); break; }
      i = j+1; continue;
    }
    if (c==='"' || c==="'" || c==='`') { inside = c; continue; }
    if (opens.includes(c)) stack.push({c, pos: i+1});
    else if (closes.includes(c)){
      if (stack.length===0) console.log('Unmatched closing',c,'at',i+1);
      else{
        const o = stack.pop();
        if (pairs[o.c] !== c) console.log('Mismatched', o.c, 'at', o.pos, 'closed by', c, 'at', i+1);
      }
    }
  } else {
    if (c===inside){
      // check escapes
      let back=0; let j=i-1; while(j>=0 && s[j]==='\\'){ back++; j--; }
      if (back%2===0) inside=null;
    }
  }
}
console.log('stack length', stack.length);
if (stack.length>0) console.log('remaining opens:', stack.slice(-10));
