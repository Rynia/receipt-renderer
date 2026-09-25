/**
 * Helper to pad strings for monospace alignment
 */
export declare function padRow(left: string, right: string, totalWidth: number): string;
/**
 * Truncate text with ellipsis if it exceeds max length
 */
export declare function truncate(text: string, maxLength: number): string;
/**
 * Generate a procedural barcode pattern (series of bar widths)
 */
export declare function generateBarcodeBars(code: string): number[];
/**
 * Generate SVG Path for realistic jagged paper cut (top and bottom tear)
 */
export declare function generateJaggedEdgePath(startX: number, startY: number, width: number, toothCount?: number, toothHeight?: number, isTop?: boolean): string;
//# sourceMappingURL=layout.d.ts.map