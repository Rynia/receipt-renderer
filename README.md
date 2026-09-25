# 🧾 receipt-renderer
### *Deterministic, zero-dependency engine turning structured JSON into retro 9:16 thermal receipts (SVG & ASCII).*

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Dependencies-0-success?style=for-the-badge" alt="Zero Dependencies" />
  <img src="https://img.shields.io/badge/Runtimes-Node%20·%20Web%20·%20React%20Native-8A2BE2?style=for-the-badge" alt="Runtimes" />
  <img src="https://img.shields.io/badge/Output-SVG%20%7C%20ASCII-F59E0B?style=for-the-badge" alt="Output" />
</p>

---

```text
^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v
          KALANLA ZERO-WASTE          
   TERMINAL #04 · RYNIA KITCHEN OS    
--------------------------------------
TX ID                  TR-IST // #8821
DATE                  26.09.2026 02:24
--------------------------------------
[ RESCUED DISH // ZERO SPOILAGE ]     
> Bayat Ekmek Mantisi (Artisan Skillet)
--------------------------------------
ITEM                             PRICE
--------------------------------------
01. Bayat Somun Ekmek           ₺24.00
02. Yogurt & Sarimsak Sosu      ₺32.50
03. Kiyma (Remaining 120g)      ₺85.00
--------------------------------------
* NET FOOD VALUE SAVED         ₺141.50
======================================
       || | |||| || | || |||| |       
          * 8821-0926-024 *           
[ POWERED BY RYNIA STUDIOS ]          
^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v^v
```

---

## ⚡ Why `receipt-renderer`?

Existing receipt solutions either require heavy Chromium/DOM headless instances (`puppeteer`), depend on obscure thermal printer driver protocols (`ESC/POS`), or look like ugly generic tables.

**`receipt-renderer` provides a third way:**
* 📐 **Deterministic Layout:** Pure data in, pixel-identical receipt out.
* 📦 **Zero External Dependencies:** Built with pure TypeScript math. Runs natively on **Node.js, Web browsers, and React Native**.
* 🎨 **Procedural Paper Aesthetics:** Realistic jagged zig-zag tear edges, monospaced typography, and procedural barcode generation.
* 📱 **Social 9:16 Story Ready:** Instantly renders in native 9:16 aspect ratio with luxury dark studio gradients for 1-tap Instagram/WhatsApp sharing.
* 💻 **CLI & Terminal Ready:** Includes a built-in ASCII generator for developer CLI tools, order debuggers, and terminal apps.

---

## 📦 Installation

```bash
npm install @rynia/receipt-renderer
# or
yarn add @rynia/receipt-renderer
# or
pnpm add @rynia/receipt-renderer
```

---

## 🚀 Quick Start

### 1. Generate High-Fidelity SVG

```typescript
import { renderReceiptSVG, ReceiptData } from '@rynia/receipt-renderer';
import fs from 'fs';

const receipt: ReceiptData = {
  header: {
    brand: 'COFFEE & CODE ROASTERS',
    subtitle: 'TERMINAL #01 · CUPERTINO, CA',
    meta: [
      { label: 'ORDER #', value: 'CC-9021' },
      { label: 'DATE', value: '2026-09-26 10:15' }
    ]
  },
  highlightBox: {
    title: 'ORDER SUMMARY',
    subtitle: 'Dine-In · Table 04'
  },
  items: [
    { name: 'Double Espresso (Single Origin)', price: '$4.50' },
    { name: 'Oat Milk Flat White', price: '$5.75' },
    { name: 'Almond Croissant', price: '$4.25' }
  ],
  totals: [
    { label: 'SUBTOTAL', value: '$14.50' },
    { label: 'TAX (8.25%)', value: '$1.20' },
    { label: 'TOTAL AMOUNT', value: '$15.70', emphasis: true }
  ],
  barcode: {
    code: '9021092601',
    text: '* 9021-0926-01 *'
  },
  footer: {
    lines: ['THANK YOU FOR VISITING US!'],
    poweredBy: 'POWERED BY RECEIPT-RENDERER'
  }
};

// Render standalone SVG (Optionally set isStoryMode: true for 9:16 aspect ratio)
const svg = renderReceiptSVG(receipt, { isStoryMode: false });
fs.writeFileSync('receipt.svg', svg);
```

### 2. Print Monospaced ASCII in Terminal

```typescript
import { renderReceiptASCII } from '@rynia/receipt-renderer';

const ascii = renderReceiptASCII(receipt, { width: 38 });
console.log(ascii);
```

---

## 🛠️ Data Schema & Options

```typescript
export interface ReceiptData {
  header: {
    brand: string;
    subtitle?: string;
    meta?: Array<{ label: string; value: string }>;
  };
  highlightBox?: {
    title: string;
    subtitle?: string;
  };
  items?: Array<{
    name: string;
    price?: number | string;
  }>;
  totals?: Array<{
    label: string;
    value: string | number;
    emphasis?: boolean; // Bold & accent colored
  }>;
  barcode?: {
    code: string;
    text?: string;
  };
  footer?: {
    lines?: string[];
    poweredBy?: string;
  };
}
```

---

## 💡 Real-World Use Cases

1. **FinTech & SaaS Confirmations:** Elegant brutalist receipts on payment success screens.
2. **Food Waste & Household Telemetry:** Used in production by [KALANLA](https://github.com/Rynia/KALANLA) to calculate domestic savings.
3. **Gaming & Quests:** Retro thermal quest rewards, dungeon completion loot logs.
4. **Developer CLI Tools:** Terminal checkout summaries and build artifact receipts.

---

## 📄 License & Attribution

* **License:** MIT © 2026 [Muharrem Özmen (@Rynia)](https://github.com/Rynia)
* **Maintained by:** [Rynia Studios](https://ryniastudios.netlify.app)
* *Part of the Rynia Local-First & Ambient Systems initiative.*
