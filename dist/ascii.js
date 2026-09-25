"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderReceiptASCII = renderReceiptASCII;
const layout_1 = require("./layout");
function renderReceiptASCII(data, options = {}) {
    const width = options.width ?? 38;
    const lines = [];
    const divider = '='.repeat(width);
    const dashed = '-'.repeat(width);
    // Top paper jagged simulation
    lines.push('^v'.repeat(Math.floor(width / 2)));
    lines.push('');
    // Brand Header
    const brand = data.header.brand.toUpperCase();
    lines.push(centerText(brand, width));
    if (data.header.subtitle) {
        lines.push(centerText(data.header.subtitle.toUpperCase(), width));
    }
    lines.push(dashed);
    // Metadata
    if (data.header.meta && data.header.meta.length > 0) {
        for (const m of data.header.meta) {
            lines.push((0, layout_1.padRow)(m.label.toUpperCase(), m.value, width));
        }
        lines.push(dashed);
    }
    // Highlight Box
    if (data.highlightBox) {
        lines.push(`[ ${data.highlightBox.title.toUpperCase()} ]`);
        if (data.highlightBox.subtitle) {
            lines.push(`> ${data.highlightBox.subtitle}`);
        }
        lines.push(dashed);
    }
    // Items
    if (data.items && data.items.length > 0) {
        lines.push((0, layout_1.padRow)('ITEM', 'PRICE', width));
        lines.push(dashed);
        data.items.forEach((item, idx) => {
            const idxStr = String(idx + 1).padStart(2, '0') + '. ';
            const name = (0, layout_1.truncate)(idxStr + item.name, width - 10);
            const price = item.price !== undefined ? String(item.price) : '';
            lines.push((0, layout_1.padRow)(name, price, width));
        });
        lines.push(dashed);
    }
    // Totals
    if (data.totals && data.totals.length > 0) {
        for (const t of data.totals) {
            const label = t.emphasis ? `* ${t.label.toUpperCase()}` : t.label.toUpperCase();
            const val = String(t.value);
            lines.push((0, layout_1.padRow)(label, val, width));
        }
        lines.push(divider);
    }
    // Barcode simulation
    if (data.barcode) {
        lines.push(centerText('|| | |||| || | || |||| |', width));
        lines.push(centerText(data.barcode.text || data.barcode.code, width));
        lines.push('');
    }
    // Footer
    const footerLines = data.footer?.lines || ['THANK YOU FOR YOUR SUPPORT'];
    for (const f of footerLines) {
        lines.push(centerText(f.toUpperCase(), width));
    }
    const powered = data.footer?.poweredBy ?? 'POWERED BY RYNIA STUDIOS';
    lines.push(centerText(`[ ${powered} ]`, width));
    lines.push('');
    // Bottom paper jagged simulation
    lines.push('^v'.repeat(Math.floor(width / 2)));
    return lines.join('\n');
}
function centerText(text, width) {
    if (text.length >= width)
        return text.substring(0, width);
    const leftPadding = Math.floor((width - text.length) / 2);
    return ' '.repeat(leftPadding) + text;
}
//# sourceMappingURL=ascii.js.map