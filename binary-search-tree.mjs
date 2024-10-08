#!/usr/bin/env node
import mergeSort from './mergeSort.mjs';

function tree(array) {
  function node(data = null) {
    return { data, leftChild: null, rightChild: null };
  }

  function buildTree(array) {
    try {
      if (!Array.isArray(array) || array.length === 0) {
        throw new TypeError('Input must be a non-empty array.');
      }

      array = [...new Set(array)];
      array = mergeSort(array);

      if (array.length === 1) {
        return node(array[0]);
      }

      const mid = Math.floor(array.length / 2);
      let rootNode = node(array[mid]);

      if (array.length > 2) {
        const left = array.slice(0, mid);
        const right = array.slice(mid + 1);
        rootNode.leftChild = buildTree(left);
        rootNode.rightChild = buildTree(right);
      } else {
        const right = [array[1]];
        rootNode = node(array[0]);
        rootNode.rightChild = buildTree(right);
      }

      return rootNode;
    } catch (e) {
      console.error(e);
    }
  }

  const firstNode = buildTree(array);

  function root() {
    return firstNode;
  }

  function insert(value) {
    try {
      if (!Number.isInteger(value)) {
        throw new TypeError('Input must be an integer.');
      }

      let currentNode = root();

      while (
        (currentNode.leftChild !== null || currentNode.rightChild !== null) &&
        currentNode.data !== value
      ) {
        if (value < currentNode.data) {
          currentNode = currentNode.leftChild;
        } else {
          currentNode = currentNode.rightChild;
        }
      }

      if (value === currentNode.data) {
        return;
      }

      const leafNode = node(value);

      if (value < currentNode.data) {
        currentNode.leftChild = leafNode;
      } else {
        currentNode.rightChild = leafNode;
      }
    } catch (e) {
      console.error(e);
    }
  }

  return { root, insert };
}

const binarySearchTree = tree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node == null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

prettyPrint(binarySearchTree.root());
