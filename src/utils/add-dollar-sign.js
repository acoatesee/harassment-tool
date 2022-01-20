function addDollarSign(num) {
  if (num < 0) {
    // Negative sign must be a non-breaking hyphen. Specifically this character: &#8209;
    // We do not type &#8209; directly because React would show it rather than insert it as raw html.
    return `‑$${Math.abs(num)}`;
  } else {
    return `$${num}`;
  }
}

export default addDollarSign;
