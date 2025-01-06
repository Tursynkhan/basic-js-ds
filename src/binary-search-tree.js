const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  head = null;

  root() {
    return this.head;
  }

  add(data) {
    let n = new Node(data);

    if (this.head == null) {
      this.head = n;
      return;
    }

    let current = this.head;
    while (current.data !== data) {
      if (data < current.data) {
        if (current.left == null) {
          current.left = n;
          return;
        }
        current = current.left;
        continue;
      }

      if (current.data < data) {
        if (current.right == null) {
          current.right = n;
          return;
        }
        current = current.right;
        continue;
      }
    }
  }

  has(data) {
    let current = this.head;

    while (current != null) {
      if (current.data === data) {
        return true;
      }

      if (data < current.data) {
        current = current.left;
        continue;
      }

      if (current.data < data) {
        current = current.right;
        continue;
      }
    }

    return false;
  }

  find(data) {
    let current = this.head;

    while (current != null) {
      if (current.data === data) {
        return current;
      }

      if (data < current.data) {
        current = current.left;
        continue;
      }

      if (current.data < data) {
        current = current.right;
        continue;
      }
    }

    return null;
  }

  remove(data) {
    if (this.head == null) {
      return;
    }

    let parent = null;
    let nodeToRemove = this.head;
    while (nodeToRemove != null && nodeToRemove.data !== data) {
      if (nodeToRemove.data === data) {
        break;
      }

      if (data < nodeToRemove.data) {
        parent = nodeToRemove;
        nodeToRemove = nodeToRemove.left;
        continue;
      }

      if (nodeToRemove.data < data) {
        parent = nodeToRemove;
        nodeToRemove = nodeToRemove.right;
        continue;
      }
    }

    if (nodeToRemove == null) {
      return;
    }

    let nodes = [];
    let stack = [nodeToRemove];
    while (stack.length > 0) {
      const node = stack[0];
      if (node.left) {
        stack.push(node.left);
        nodes.push(node.left.data);
      }
      if (node.right) {
        stack.push(node.right);
        nodes.push(node.right.data);
      }
      stack.shift();
    }

    let tree = new BinarySearchTree();
    for (let i = 0; i < nodes.length; i++) {
      tree.add(nodes[i]);
    }

    if (parent == null) {
      this.head = null;
      this.head = tree.head;
    } else if (parent.left == nodeToRemove) {
      parent.left = null;
      parent.left = tree.head;
    } else if (parent.right == nodeToRemove) {
      parent.right = null;
      parent.right = tree.head;
    }
  }

  min() {
    console.log("min");
    let current = this.head;
    if (current == null) {
      return null;
    }

    while (current.left != null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    console.log("max");
    let current = this.head;
    if (current == null) {
      return null;
    }

    while (current.right != null) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
