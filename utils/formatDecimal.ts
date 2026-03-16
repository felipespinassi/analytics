export function formatDecimal(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
  }).format(value);
}
