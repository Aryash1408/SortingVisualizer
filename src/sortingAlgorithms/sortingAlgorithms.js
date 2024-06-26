export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSort(array, animations);
    return animations;
  }
  
  function heapSort(array, animations) {
    let n = array.length;
  
    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(array, n, i, animations);
    }
  
    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
      // Move current root to end
      animations.push([0, i]);
      animations.push([0, i]);
      animations.push([0, array[i]]);
      animations.push([i, array[0]]);
      let temp = array[0];
      array[0] = array[i];
      array[i] = temp;
  
      // call max heapify on the reduced heap
      heapify(array, i, 0, animations);
    }
  }
  
  function heapify(array, n, i, animations) {
    let largest = i; // Initialize largest as root
    let left = 2 * i + 1; // left = 2*i + 1
    let right = 2 * i + 2; // right = 2*i + 2
  
    // If left child is larger than root
    if (left < n && array[left] > array[largest]) {
      largest = left;
    }
  
    // If right child is larger than largest so far
    if (right < n && array[right] > array[largest]) {
      largest = right;
    }
  
    // If largest is not root
    if (largest !== i) {
      animations.push([i, largest]);
      animations.push([i, largest]);
      animations.push([i, array[largest]]);
      animations.push([largest, array[i]]);
      let swap = array[i];
      array[i] = array[largest];
      array[largest] = swap;
  
      // Recursively heapify the affected sub-tree
      heapify(array, n, largest, animations);
    }
  }


    export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(mainArray, startIdx, endIdx, animations) {
    if (startIdx >= endIdx) return;
    const pivotIdx = partition(mainArray, startIdx, endIdx, animations);
    quickSortHelper(mainArray, startIdx, pivotIdx - 1, animations);
    quickSortHelper(mainArray, pivotIdx + 1, endIdx, animations);
  }
  
  function partition(array, startIdx, endIdx, animations) {
    const pivotValue = array[endIdx];
    let pivotIdx = startIdx;
    for (let i = startIdx; i < endIdx; i++) {
      animations.push(['compare', i, endIdx]);
      animations.push(['revert', i, endIdx]);
      if (array[i] < pivotValue) {
        animations.push(['swap', i, array[pivotIdx]]);
        animations.push(['swap', pivotIdx, array[i]]);
        swap(array, i, pivotIdx);
        pivotIdx++;
      } else {
        animations.push(['no-op', i, array[i]]);
        animations.push(['no-op', i, array[i]]);
      }
    }
    animations.push(['swap', pivotIdx, array[endIdx]]);
    animations.push(['swap', endIdx, array[pivotIdx]]);
    swap(array, pivotIdx, endIdx);
    return pivotIdx;
  }
  
  function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  
  

  export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSort(array, animations);
    return animations;
  }
  
  function bubbleSort(array, animations) {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        animations.push([j, j + 1]);
        animations.push([j, j + 1]);
        if (array[j] > array[j + 1]) {
          animations.push([j, array[j + 1]]);
          animations.push([j + 1, array[j]]);
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        } else {
          animations.push([j, array[j]]);
          animations.push([j + 1, array[j + 1]]);
        }
      }
    }
  }
  