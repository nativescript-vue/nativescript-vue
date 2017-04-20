import Vue from './index'

export const namespaceMap = {}

export function createElement(tagName, vnode) {
    console.log('createElement', tagName)
    return new Vue.renderer.Element(tagName)
}

export function createElementNS(namespace, tagName) {
    console.log('createElementNS', namespace, tagName)
    return new Vue.renderer.Element(namespace + ':' + tagName)
}

export function createTextNode(text) {
    console.log('createTextNode', text)
    let node = new Vue.renderer.Element('label')
    node.setAttr('text', text)
    return node
}

export function createComment(text) {
    console.log('createComment', text)
    return new Vue.renderer.Comment(text)
}

export function insertBefore(parentNode, newNode, referenceNode) {
    console.log('insertBefore')
}

export function removeChild(node, child) {
    console.log('removeChild')
}

export function appendChild(node, child) {
    console.log('appendChild')
    try {
        node.appendChild(child)
    } catch (e) {
        console.log('>>> ', e)
        // console.log('>>', console.createDump(e))
    }
}

export function parentNode(node) {
    console.log('parentNode ' + node)
    return node && node.parentNode
}

export function nextSibling(node) {
    console.log('nextSibling ' + node)
    return node && node.nextSibling
}

export function tagName(elementNode) {
    console.log('tagName')
    return elementNode.type
}

export function setTextContent(node, text) {
    console.log('setTextContent', text)
    node.setAttr('text', text)
}

export function setAttribute(nodeElement, key, val) {
    console.log('setAttribute')
    nodeElement.setAttr(key, val)
}