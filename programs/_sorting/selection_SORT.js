function selectionSort(arr) {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {

        // Assume current index has the smallest value
        let minIndex = i;

        // Find the smallest element
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Swap if needed
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return arr;
}

// Example
const nums = [64, 25, 12, 22, 11];
console.log(selectionSort(nums));