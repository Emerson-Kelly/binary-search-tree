import Tree from './tree.js';

//const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
let treeRange = Array.from({length: 20}, () => Math.floor(Math.random() * 100));

const testTree = new Tree(treeRange);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  //myTree.insert(333);
  //myTree.deleteItem(67);
  //myTree.find(333);
  //myTree.levelOrder();
  //console.log(myTree.inOrder());
  //console.log(myTree.preOrder());
  //console.log(myTree.postOrder());
  //console.log(myTree.height());
  //console.log(myTree.depth(23));
  //console.log(myTree.rebalance());
  //console.log(myTree.isBalanced());

  //prettyPrint(myTree.root);

  //console.log(testTree.isBalanced());
  //console.log(testTree.inOrder());
  //console.log(testTree.preOrder());
  //console.log(testTree.postOrder());
  //console.log(testTree.rebalance());
  prettyPrint(testTree.root);