// Insertion sort using only i and j

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    // Compare current element with the previous ones
    while (j > 0 && arr[j] < arr[j - 1]) {
      // Swap if out of order
      let temp = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = temp;
      j--;
    }
  }
  return arr;
}

// Example usage
const data = [5, 2, 9, 1, 5];
console.log("Input:", data);
console.log("Sorted:", insertionSort(data));
