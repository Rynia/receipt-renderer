/**
 * Helper to pad strings for monospace alignment
 */
export function padRow(left: string, right: string, totalWidth: number): string {
  const leftClean = left.trim();
  const rightClean = right.trim();
  const spacesNeeded = Math.max(1, totalWidth - (leftClean.length + rightClean.length));
  return leftClean + ' '.repeat(spacesNeeded) + rightClean;
}

/**
 * Truncate text with ellipsis if it exceeds max length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 1) + '…';
}

/**
 * Generate a procedural barcode pattern (series of bar widths)
 */
export function generateBarcodeBars(code: string): number[] {
  const bars: number[] = [];
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
export function generateJaggedEdgePath(
  startX: number,
  startY: number,
  width: number,
  toothCount: number = 24,
  toothHeight: number = 6,
  isTop: boolean = false
): string {
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
