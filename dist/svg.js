"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderReceiptSVG = renderReceiptSVG;
const layout_1 = require("./layout");
function renderReceiptSVG(data, options = {}) {
    const isStory = options.isStoryMode ?? false;
    const canvasWidth = isStory ? 720 : (options.width ?? 420);
    const canvasHeight = isStory ? 1280 : (options.height ?? 880);
    const paperWidth = isStory ? 540 : canvasWidth - 40;
    const paperX = (canvasWidth - paperWidth) / 2;
    const paperY = isStory ? 100 : 20;
    const paperHeight = isStory ? 1080 : canvasHeight - 40;
    const paperColor = options.paperColor ?? '#FAF9F5';
    const textColor = options.textColor ?? '#1A1A1A';
    const mutedColor = '#666666';
    const accentColor = options.accentColor ?? '#10B981';
    const fontFamily = options.fontFamily ?? '"Courier New", Courier, monospace, monospace';
    let currentY = paperY + 45;
    const contentWidth = paperWidth - 60;
    const contentLeft = paperX + 30;
    const contentRight = paperX + paperWidth - 30;
    const contentCenter = paperX + paperWidth / 2;
    let elements = [];
    // Story background if enabled
    if (isStory) {
        elements.push(`
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#18181B" />
          <stop offset="100%" stop-color="#09090B" />
        </radialGradient>
        <filter id="paperShadow" x="-10%" y="-5%" width="120%" height="115%">
          <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.45" />
        </filter>
      </defs>
      <rect width="${canvasWidth}" height="${canvasHeight}" fill="url(#bgGrad)" />
    `);
    }
    else {
        elements.push(`
      <defs>
        <filter id="paperShadow" x="-10%" y="-5%" width="120%" height="115%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.15" />
        </filter>
      </defs>
    `);
    }
    // Paper body
    const teethCount = 28;
    const toothH = 5;
    const topEdge = (0, layout_1.generateJaggedEdgePath)(paperX, paperY, paperWidth, teethCount, toothH, true);
    const bottomEdge = (0, layout_1.generateJaggedEdgePath)(paperX, paperY + paperHeight, paperWidth, teethCount, toothH, false);
    elements.push(`
    <g filter="url(#paperShadow)">
      <!-- Main Paper Body -->
      <rect x="${paperX}" y="${paperY}" width="${paperWidth}" height="${paperHeight}" fill="${paperColor}" />
      <!-- Top Jagged Tear Edge -->
      <path d="${topEdge}" fill="${isStory ? '#18181B' : '#FFFFFF'}" />
      <!-- Bottom Jagged Tear Edge -->
      <path d="${bottomEdge}" fill="${isStory ? '#09090B' : '#FFFFFF'}" />
    </g>
  `);
    // Brand Header
    elements.push(`
    <text x="${contentCenter}" y="${currentY}" font-family="${fontFamily}" font-size="20" font-weight="900" text-anchor="middle" fill="${textColor}" letter-spacing="1">
      ${escapeXml(data.header.brand.toUpperCase())}
    </text>
  `);
    currentY += 20;
    if (data.header.subtitle) {
        elements.push(`
      <text x="${contentCenter}" y="${currentY}" font-family="${fontFamily}" font-size="11" font-weight="600" text-anchor="middle" fill="${mutedColor}" letter-spacing="0.5">
        ${escapeXml(data.header.subtitle.toUpperCase())}
      </text>
    `);
        currentY += 18;
    }
    // Dashed Separator
    elements.push(renderDashedLine(contentLeft, contentRight, currentY));
    currentY += 18;
    // Metadata
    if (data.header.meta && data.header.meta.length > 0) {
        for (const m of data.header.meta) {
            elements.push(`
        <text x="${contentLeft}" y="${currentY}" font-family="${fontFamily}" font-size="10" font-weight="600" fill="${mutedColor}">
          ${escapeXml(m.label.toUpperCase())}
        </text>
        <text x="${contentRight}" y="${currentY}" font-family="${fontFamily}" font-size="10" font-weight="700" text-anchor="end" fill="${textColor}">
          ${escapeXml(m.value)}
        </text>
      `);
            currentY += 16;
        }
        elements.push(renderDashedLine(contentLeft, contentRight, currentY));
        currentY += 20;
    }
    // Highlight Box (e.g. Dish title or Major Saving)
    if (data.highlightBox) {
        const boxY = currentY;
        const boxH = 46;
        elements.push(`
      <rect x="${contentLeft}" y="${boxY}" width="${contentWidth}" height="${boxH}" rx="4" fill="#000000" fill-opacity="0.04" stroke="#000000" stroke-opacity="0.12" stroke-dasharray="3,3" />
      <text x="${contentLeft + 12}" y="${boxY + 18}" font-family="${fontFamily}" font-size="9" font-weight="700" fill="${mutedColor}">
        ${escapeXml(data.highlightBox.title.toUpperCase())}
      </text>
      <text x="${contentLeft + 12}" y="${boxY + 34}" font-family="${fontFamily}" font-size="13" font-weight="800" fill="${textColor}">
        ${escapeXml(data.highlightBox.subtitle || data.highlightBox.metric || '')}
      </text>
    `);
        currentY += boxH + 20;
    }
    // Item List
    if (data.items && data.items.length > 0) {
        elements.push(`
      <text x="${contentLeft}" y="${currentY}" font-family="${fontFamily}" font-size="10" font-weight="700" fill="${mutedColor}">
        ITEM DESCRIPTION
      </text>
      <text x="${contentRight}" y="${currentY}" font-family="${fontFamily}" font-size="10" font-weight="700" text-anchor="end" fill="${mutedColor}">
        AMOUNT
      </text>
    `);
        currentY += 8;
        elements.push(renderSolidLine(contentLeft, contentRight, currentY));
        currentY += 18;
        data.items.forEach((item, idx) => {
            const idxStr = String(idx + 1).padStart(2, '0') + '.';
            elements.push(`
        <text x="${contentLeft}" y="${currentY}" font-family="${fontFamily}" font-size="11" font-weight="600" fill="${mutedColor}">
          ${idxStr}
        </text>
        <text x="${contentLeft + 26}" y="${currentY}" font-family="${fontFamily}" font-size="12" font-weight="700" fill="${textColor}">
          ${escapeXml(item.name)}
        </text>
      `);
            if (item.price !== undefined) {
                elements.push(`
          <text x="${contentRight}" y="${currentY}" font-family="${fontFamily}" font-size="12" font-weight="700" text-anchor="end" fill="${textColor}">
            ${escapeXml(String(item.price))}
          </text>
        `);
            }
            currentY += 18;
        });
        elements.push(renderDashedLine(contentLeft, contentRight, currentY));
        currentY += 20;
    }
    // Totals Section
    if (data.totals && data.totals.length > 0) {
        for (const t of data.totals) {
            const isBig = t.emphasis ?? false;
            const fontSize = isBig ? 14 : 11;
            const fontWeight = isBig ? 900 : 600;
            const color = isBig ? accentColor : textColor;
            elements.push(`
        <text x="${contentLeft}" y="${currentY}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${isBig ? textColor : mutedColor}">
          ${escapeXml(t.label.toUpperCase())}
        </text>
        <text x="${contentRight}" y="${currentY}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="900" text-anchor="end" fill="${color}">
          ${escapeXml(String(t.value))}
        </text>
      `);
            currentY += isBig ? 24 : 18;
        }
        elements.push(renderSolidLine(contentLeft, contentRight, currentY));
        currentY += 24;
    }
    // Barcode Section
    if (data.barcode) {
        const barWidths = (0, layout_1.generateBarcodeBars)(data.barcode.code);
        const barcodeH = 34;
        const totalBarWidth = barWidths.reduce((a, b) => a + b, 0) * 1.5;
        let barX = (paperWidth - totalBarWidth) / 2 + paperX;
        for (const w of barWidths) {
            const actualW = w * 1.5;
            elements.push(`
        <rect x="${barX.toFixed(1)}" y="${currentY}" width="${actualW.toFixed(1)}" height="${barcodeH}" fill="#111111" />
      `);
            barX += actualW + 1.2;
        }
        currentY += barcodeH + 12;
        elements.push(`
      <text x="${contentCenter}" y="${currentY}" font-family="${fontFamily}" font-size="9" font-weight="600" text-anchor="middle" fill="${mutedColor}" letter-spacing="2">
        ${escapeXml(data.barcode.text || data.barcode.code)}
      </text>
    `);
        currentY += 22;
    }
    // Footer Tagline & Powered By
    const footerLines = data.footer?.lines || ['THANK YOU FOR CHOOSING SUSTAINABLE'];
    for (const line of footerLines) {
        elements.push(`
      <text x="${contentCenter}" y="${currentY}" font-family="${fontFamily}" font-size="9" font-weight="700" text-anchor="middle" fill="${mutedColor}" letter-spacing="1">
        ${escapeXml(line.toUpperCase())}
      </text>
    `);
        currentY += 14;
    }
    currentY += 6;
    const poweredText = data.footer?.poweredBy ?? 'GENERATED BY RECEIPT-RENDERER • POWERED BY RYNIA STUDIOS';
    elements.push(`
    <text x="${contentCenter}" y="${currentY}" font-family="${fontFamily}" font-size="8" font-weight="600" text-anchor="middle" fill="#999999" letter-spacing="0.5">
      ${escapeXml(poweredText)}
    </text>
  `);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvasWidth} ${canvasHeight}" width="${canvasWidth}" height="${canvasHeight}">
    ${elements.join('\n')}
  </svg>`;
}
function renderDashedLine(x1, x2, y) {
    return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#000000" stroke-opacity="0.2" stroke-width="1.2" stroke-dasharray="4,4" />`;
}
function renderSolidLine(x1, x2, y) {
    return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#000000" stroke-opacity="0.3" stroke-width="1.5" />`;
}
function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}
//# sourceMappingURL=svg.js.map