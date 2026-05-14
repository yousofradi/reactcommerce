const fs = require('fs');
const path = require('path');

const files = ['collections.ts', 'customerRoutes.ts', 'orders.ts', 'products.ts', 'settings.ts', 'shipping.ts', 'webhooks.ts'].map(f => path.join(__dirname, 'routes', f));

for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/\(req\.params\.\s+as string\)/g, 'String(req.params.id)');
  
  // also fix if any remaining id was replaced with empty:
  c = c.replace(/req\.params\.\s+/g, 'req.params.id');
  fs.writeFileSync(f, c);
}
console.log('Fixed syntax errors');
