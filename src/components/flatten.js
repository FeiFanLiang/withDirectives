import {
  Fragment,
  
  createTextVNode,
  
  Comment
} from 'vue'

// o(n) flatten
export function flatten (
  vNodes,
  filterCommentNode =true,
  result=  []
) {
  debugger
  vNodes.forEach((vNode) => {
    if (vNode === null) return
    if (typeof vNode !== 'object') {
      if (typeof vNode === 'string' || typeof vNode === 'number') {
        result.push(createTextVNode(String(vNode)))
      }
      return
    }
    if (Array.isArray(vNode)) {
      flatten(vNode, filterCommentNode, result)
      return
    }
    if (vNode.type === Fragment) {
      if (vNode.children === null) return
      if (Array.isArray(vNode.children)) {
        flatten(vNode.children, filterCommentNode, result)
      }
      // rawSlot
    } else {
      if (vNode.type === Comment && filterCommentNode) return
      result.push(vNode)
    }
  })
  return result
}
