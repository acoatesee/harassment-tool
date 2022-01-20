function getDefaultOption(dropdowns, name) {
  const remaining = dropdowns.filter(element => element.name === name);
  if (remaining.length > 1) {
    console.warn("Remaining has more than one value because multiple dropdowns have the same name.");
    return "";
  } else if (remaining.length === 0) {
    console.warn(`Remaining has no elements because no dropdown matched the name ${name}`);
    return "";
  } else {
    return remaining[0].options[0];
  }
}

export default getDefaultOption;
