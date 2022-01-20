function formatPercent(decimalPercent, decimalsLeft) {
  return (decimalPercent * 100).toFixed(decimalsLeft);
}

export default formatPercent;
