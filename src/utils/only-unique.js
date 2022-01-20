// Used in a filter to get unique values in an array
const onlyUnique = (value, index, self) => self.indexOf(value) === index;

export default onlyUnique;
