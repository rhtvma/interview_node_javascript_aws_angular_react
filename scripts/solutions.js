// 1: remove empty spaces
const useID = row.replace(/^\s*/, "").replace(/\s*$/, "");

// 2: Valid Email
const emailValidation =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// 3: Alphanumeric Sorting:
function customSort(tableValue, order, field) {
  const collatorCompare = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });
  tableValue.sort((val1, val2) => {
    let result;
    let value1 = val1[field] != null ? val1[field] : "";
    let value2 = val2[field] != null ? val2[field] : "";

    result = collatorCompare.compare(value1, value2);
    return order * result;
  });
  return tableValue;
}
