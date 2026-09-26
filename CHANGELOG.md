# Changelog

All notable changes to `receipt-renderer` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-09-25

### Added
- **Production Stable Release**: Audited and certified for production grade performance.
- Standalone zero-dependency SVG renderer with jagged thermal paper edges (`roughness`, `wavelength`, `amplitude`).
- Pure ASCII mono-spaced terminal output engine with box-drawing Unicode characters.
- High-fidelity Code 128 / EAN-13 barcode generation from raw numeric and alphanumeric strings.
- Interactive Web Playground (`index.html`) with live receipt preview, thermal paper tearing animations, and SVG export.
- Fully typed TypeScript AST (Abstract Syntax Tree) model supporting headers, tables, key-values, dividers, barcodes, and decorative footers.

### Security & Performance
- Zero runtime dependencies (`0 npm dependencies`).
- Memory footprint under `35 KB` minified.
- Production hardened in **[KALANLA](https://github.com/Rynia/KALANLA)** pantry and receipt tracking engine.

---

## [0.9.4] - 2026-09-18

### Changed
- Refactored jagged paper tear path generation using deterministic sinusoidal harmonics.
- Optimized text bounding box estimation for monospace 9:16 layout constraint.

### Fixed
- Fixed SVG XML namespace serialization in strict browser sandboxes.
- Corrected right-aligned price column truncation on 32-column virtual thermal widths.

---

## [0.8.0] - 2026-08-30

### Added
- Initial public beta of the AST layout pipeline.
- Raw JSON receipt schema validation.
- Basic terminal ASCII formatter with dashed separators.
