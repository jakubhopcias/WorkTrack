export default function formatMoney(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "0";
  return amount.toLocaleString("pl-PL", { maximumFractionDigits: 2 });
}
