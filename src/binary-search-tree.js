const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.top = null
  }

  root() {
    return this.top
  }

  add(data) {
    this.top = addWithin(this.top, data)

    function addWithin(node, data) {
      if (!node) {
        return new Node(data);
      }
      if (node.data === data) {
        return node
      }
      if (data > node.data) {
        node.right = addWithin(node.right, data)
      } else {
        node.left = addWithin(node.left, data)
      }
      return node
    }
  }

  has(data) {
    return !!this.find(data)
  }

  find(data) {
    return searchWithin(this.top, data)

    function searchWithin(node, data) {
      if (!node) {
        return null
      }

      if (node.data === data) {
        return node
      }
      if (data < node.data) {
        return searchWithin(node.left, data)
      } else {
        return searchWithin(node.right, data)
      }
    }
  }

  remove(data) {
    this.top = removeData(this.top, data)
    return this.top

    function removeData(node, data) {
      if (!node) {
        return null
      }
      if (data < node.data) {
        node.left = removeData(node.left, data)
        return node
      } else if (data > node.data) {
        node.right = removeData(node.right, data)
        return node
      } else {
        if (!node.left && !node.right) {
          return null
        }
        if (!node.left) {
          node = node.right
          return node
        }
        if (!node.right) {
          node = node.left
          return node
        }

        let leftMax = node.left
        while (leftMax.right) {
          leftMax = leftMax.right
        }
        node.data = leftMax.data
        node.left = removeData(node.left, leftMax.data)
        return node
      }
    }
  }

  min() {
    if (!this.top) {
      return null
    } else {
      let node = this.top
      while (node.left) {
        node = node.left
      }
      return node.data
    }

  }

  max() {
    if (!this.top) {
      return null
    } else {
      let node = this.top
      while (node.right) {
        node = node.right
      }
      return node.data
    }
  }
}

module.exports = {
  BinarySearchTree
};