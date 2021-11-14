export function getItemById(arr, id) {
  return arr.find(item => item.id === id);
}

export function safePushToIndex(arr, item, index) {
  if (index === 0) {
    arr.unshift(item);
  } else if (index === arr.length) {
    arr.push(item);
  } else {
    arr.splice(index, 0, item);
  }
  arr.forEach((item, i) => {
    item.order = i;
  });
  return [...arr];
}

export function safeReorderByIndex(arr, item, index) {
  console.log("item to reorder", item);
  arr.splice(item.order, 1);
  arr.splice(index, 0, item);
  arr.forEach((item, i) => {
    item.order = i;
  });
  return [...arr];
}

export function removeAndReorder(arr, id) {
  const item = getItemById(arr, id);
  arr.splice(item.order, 1);
  arr.forEach((item, i) => {
    item.order = i;
  });
  return [...arr];
}
