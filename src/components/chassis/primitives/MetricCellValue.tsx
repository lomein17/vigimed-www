// Slot Map v1.1 §2 em-dash carve-out (D-S25-1): this primitive is the only
// place in the repo where a literal em dash is permitted in user-visible
// output, exclusively as a null-state placeholder for metricCell value
// fields. The vm-metric-cell-value class pins font-feature-settings and
// font-variant-numeric for consistent glyph rendering across the General
// Sans / Inter / fallback chain.

export function MetricCellValue({ value }: { value: string }) {
  return <span className="vm-metric-cell-value">{value}</span>;
}
