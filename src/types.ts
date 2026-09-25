export interface ReceiptHeader {
  brand: string;
  subtitle?: string;
  meta?: Array<{ label: string; value: string }>;
}

export interface ReceiptItem {
  id?: string;
  name: string;
  tag?: string;
  qty?: number | string;
  price?: number | string;
}

export interface ReceiptTotal {
  label: string;
  value: string | number;
  emphasis?: boolean;
}

export interface ReceiptHighlightBox {
  title: string;
  subtitle?: string;
  metric?: string;
}

export interface ReceiptBarcode {
  code: string;
  text?: string;
}

export interface ReceiptFooter {
  lines?: string[];
  poweredBy?: string;
  timestamp?: string;
}

export interface ReceiptData {
  header: ReceiptHeader;
  highlightBox?: ReceiptHighlightBox;
  items?: ReceiptItem[];
  totals?: ReceiptTotal[];
  barcode?: ReceiptBarcode;
  footer?: ReceiptFooter;
}

export interface SVGRenderOptions {
  width?: number;
  height?: number;
  isStoryMode?: boolean; // 9:16 aspect ratio with stylish background
  paperColor?: string;
  textColor?: string;
  accentColor?: string;
  fontFamily?: string;
  showPaperTexture?: boolean;
  showCutEdges?: boolean;
}

export interface ASCIIRenderOptions {
  width?: number; // character width, default: 38
  border?: boolean;
}
