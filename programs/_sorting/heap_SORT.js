function heapSort(arr) {
    const n = arr.length;

    // Build Max Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {

        // Move current root to end
        [arr[0], arr[i]] = [arr[i], arr[0]];

        // Heapify reduced heap
        heapify(arr, i, 0);
    }

    return arr;
}

function heapify(arr, n, i) {

    let largest = i;

    let left = 2 * i + 1;

    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {

        [arr[i], arr[largest]] = [arr[largest], arr[i]];

        heapify(arr, n, largest);
    }
}

// Example
const arr = [4, 10, 3, 5, 1];

console.log(heapSort(arr));