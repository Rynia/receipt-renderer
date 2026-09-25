"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padRow = padRow;
exports.truncate = truncate;
exports.generateBarcodeBars = generateBarcodeBars;
exports.generateJaggedEdgePath = generateJaggedEdgePath;
/**
 * Helper to pad strings for monospace alignment
 */
function padRow(left, right, totalWidth) {
    const leftClean = left.trim();
    const rightClean = right.trim();
    const spacesNeeded = Math.max(1, totalWidth - (leftClean.length + rightClean.length));
    return leftClean + ' '.repeat(spacesNeeded) + rightClean;
}
/**
 * Truncate text with ellipsis if it exceeds max length
 */
function truncate(text, maxLength) {
    if (text.length <= maxLength)
        return text;
    return text.substring(0, maxLength - 1) + '…';
}
/**
 * Generate a procedural barcode pattern (series of bar widths)
 */
function generateBarcodeBars(code) {
    const bars = [];
    let seed = 0;
    for (let i = 0; i < code.length; i++) {
        seed = (seed * 31 + code.charCodeAt(i)) & 0xffffffff;
    }
    // Guard bars
    bars.push(2, 1, 2);
    for (let i = 0; i < code.length; i++) {
        const charCode = code.charCodeAt(i);
        const pattern = (charCode * 7 + (seed % 13)) % 16;
        for (let bit = 0; bit < 4; bit++) {
            bars.push((pattern & (1 << bit)) ? 3 : 1);
            bars.push(1); // space
        }
    }
    // End guard
    bars.push(2, 1, 2);
    return bars;
}
/**
 * Generate SVG Path for realistic jagged paper cut (top and bottom tear)
 */
function generateJaggedEdgePath(startX, startY, width, toothCount = 24, toothHeight = 6, isTop = false) {
    const toothWidth = width / toothCount;
    let path = `M ${startX} ${startY}`;
    for (let i = 0; i < toothCount; i++) {
        const midX = startX + i * toothWidth + toothWidth / 2;
        const endX = startX + (i + 1) * toothWidth;
        const peakY = isTop ? startY - toothHeight : startY + toothHeight;
        path += ` L ${midX} ${peakY} L ${endX} ${startY}`;
    }
    return path;
}
//# sourceMappingURL=layout.js.map