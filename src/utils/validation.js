function isEmptyText(text) {
  // Check if the string is undefined or empty after accounting for spaces, tabs, etc.
  return !text || text.trim().length === 0;
}

function isNumeric(text) {
  // Check if the text field is an integer.
  // Does not work for floats.
  return text.match(/^-{0,1}\d+$/);
}

function isEmail(text) {
  const re = /\S+@\S+\.\S+/;
  return re.test(text);
}

export {isEmptyText, isNumeric, isEmail};
