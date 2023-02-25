export const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1);
};

export const alphabeticSort = (arr, orientation) => {

  const array = [...arr]
  let aux;
  let swap;

  do {
    swap = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i + 1]) {
        if (
          array[orientation === "up" ? i : i + 1].name.toLowerCase() >
          array[orientation === "up" ? i + 1 : i].name.toLowerCase()
        ) {
          aux = array[i + 1];
          array[i + 1] = array[i];
          array[i] = aux;
          swap = true;
        }
      }
    }
  } while (swap);

  return array;
};

export const numericSort = (arr, orientation) => {

  const array = [...arr]
  let aux;
  let swap;

  do {
    swap = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i + 1]) {
        if (
          array[orientation === "up" ? i : i + 1].healthScore >
          array[orientation === "up" ? i + 1 : i].healthScore
        ) {
          aux = array[i + 1];
          array[i + 1] = array[i];
          array[i] = aux;
          swap = true;
        }
      }
    }
  } while (swap);

  return array;
};
