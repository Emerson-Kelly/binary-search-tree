import Node from "./node.js";

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (!array.length) return null;

    const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);

    const build = (start, end) => {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);
      const node = new Node(uniqueSortedArray[mid]);

      node.left = build(start, mid - 1);
      node.right = build(mid + 1, end);

      return node;
    };

    return build(0, uniqueSortedArray.length - 1);
  }

  insert(value) {
    let currentNode = this.root;
    if (currentNode === null) {
      this.root = new Node();
      return;
    }
    while (true) {
      if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
          break;
        } else {
          currentNode = currentNode.left;
        }
      } else if (value > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
          break;
        } else {
          currentNode = currentNode.right;
        }
      } else {
        console.log("Value already exists in the tree.");
        break;
      }
    }
  }

  deleteItem(value, currentNode = this.root) {
    if (currentNode === null) {
      return currentNode;
    }

    if (value < currentNode.data) {
      currentNode.left = this.deleteItem(value, currentNode.left);
    } else if (value > currentNode.data) {
      currentNode.right = this.deleteItem(value, currentNode.right);
    } else {
      if (currentNode.left === null) {
        return currentNode.right;
      }
      if (currentNode.right === null) {
        return currentNode.left;
      }
      currentNode.data = this.minValue(currentNode.right);
      currentNode.right = this.deleteItem(currentNode.data, currentNode.right);
    }
    return currentNode;
  }

  minValue(currentNode) {
    let minV = currentNode.data;
    while (currentNode.left !== null) {
      minV = minV.left.data;
      currentNode = currentNode.left;
    }
    return minV;
  }

  find(value, currentNode = this.root) {
    if (value < currentNode.data) {
      this.find(value, currentNode.left);
    } else if (value > currentNode.data) {
      this.find(value, currentNode.right);
    } else {
      //console.log(currentNode.data);
      return currentNode;
    }
  }

  levelOrder(callback) {
    const visited = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();

      if (!currentNode) continue;

      if (callback) {
        callback(currentNode);
      } else {
        visited.push(currentNode.data);
      }

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }

    if (!callback && visited.length > 0) {
      console.log(visited);
      return visited;
    }
  }

  inOrder(callback, node = this.root, inOrderList = []) {
    if (node === null) {
      return;
    }
    this.inOrder(callback, node.left, inOrderList);
    if (callback) {
      callback(node);
    } else {
      inOrderList.push(node.data);
    }
    this.inOrder(callback, node.right, inOrderList);
    if (inOrderList.length > 0) {
      return inOrderList;
    }
  }

  preOrder(callback, node = this.root, preOrderList = []) {
    if (node === null) {
      return;
    }
    if (callback) {
      callback(node);
    } else {
      preOrderList.push(node.data);
    }
    this.preOrder(callback, node.left, preOrderList);
    this.preOrder(callback, node.right, preOrderList);
    if (preOrderList.length > 0) {
      return preOrderList;
    }
  }

  postOrder(callback, node = this.root, postOrderList = []) {
    if (node === null) {
      return;
    }
    this.postOrder(callback, node.left, postOrderList);
    this.postOrder(callback, node.right, postOrderList);
    if (callback) {
      callback(node);
    } else {
      postOrderList.push(node.data);
    }
    if (postOrderList.length > 0) {
      return postOrderList;
    }
  }

  height(node = this.root) {
    if (node === null) {
      return 0;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(data = this.data, node = this.root) {
    if (node === null) {
      return console.log("This node does not exist in the tree");
    }
    if (node.data === data) {
      return 0;
    }
    if (data < node.data) {
      return this.depth(data, node.left) + 1;
    }
    if (data > node.data) {
      return this.depth(data, node.right) + 1;
    }
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    const currentTreeArray = this.inOrder();
    this.root = this.buildTree(currentTreeArray);
  }
}
