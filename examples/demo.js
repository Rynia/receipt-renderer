const fs = require('fs');
const path = require('path');
const { renderReceiptSVG, renderReceiptASCII } = require('../dist/index');

const sampleReceipt = {
  header: {
    brand: 'KALANLA ZERO-WASTE',
    subtitle: 'TERMINAL #04 · RYNIA KITCHEN OS',
    meta: [
      { label: 'TX ID', value: 'TR-IST // #8821' },
      { label: 'DATE', value: '26.09.2026 02:24' },
      { label: 'MODE', value: 'DETERMINISTIC CHEF' }
    ]
  },
  highlightBox: {
    title: 'RESCUED DISH // ZERO SPOILAGE',
    subtitle: 'Bayat Ekmek Mantisi (Artisan Crouton Skillet)'
  },
  items: [
    { name: 'Bayat Somun Ekmek (Stale Bread)', price: '₺24.00' },
    { name: 'Yogurt & Sarimsak Sosu', price: '₺32.50' },
    { name: 'Kiyma (Remaining 120g)', price: '₺85.00' },
    { name: 'Tereyagi & Nane Sosu', price: '₺18.00' }
  ],
  totals: [
    { label: 'SUBTOTAL RESCUED', value: '₺159.50' },
    { label: 'EST. CARBON SAVED', value: '1.42 kg CO2e' },
    { label: 'NET FOOD VALUE SAVED', value: '₺159.50', emphasis: true }
  ],
  barcode: {
    code: '88210926024',
    text: '* 8821-0926-024 *'
  },
  footer: {
    lines: [
      'ALL INGREDIENTS SAVED FROM EXPIRY',
      'THANK YOU FOR PROTECTING OUR PLANET'
    ],
    poweredBy: 'GENERATED VIA @RYNIA/RECEIPT-RENDERER • POWERED BY KALANLA'
  }
};

// 1. Test ASCII output in terminal
console.log('--- ASCII TERMINAL OUTPUT ---');
const ascii = renderReceiptASCII(sampleReceipt);
console.log(ascii);

// 2. Test SVG output and save to file
const svg = renderReceiptSVG(sampleReceipt, { isStoryMode: true });
const outPath = path.join(__dirname, 'preview-story.svg');
fs.writeFileSync(outPath, svg, 'utf8');
console.log(`\nSuccessfully generated SVG preview at: ${outPath}`);
