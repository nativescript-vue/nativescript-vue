import Vue from './index'

export const namespaceMap = {}

export function createElement(tagName) {
    console.log('createElement', tagName)
    return new Vue.renderer.Element(tagName)
}

export function createElementNS(namespace, tagName) {
    console.log('createElementNS', namespace, tagName)
    return new Vue.renderer.Element(namespace + ':' + tagName)
}

export function createTextNode(text) {
    console.log('createTextNode', text)
    return new Vue.renderer.TextNode(text)
}

export function createComment(text) {
    console.log('createComment', text)
    return new Vue.renderer.Comment(text)
}

export function insertBefore(node, target, before) {
    console.log('insertBefore')
    if (target.nodeType === 3) {
        if (node.type === 'text') {
            node.setAttr('value', target.text)
            target.parentNode = node
        } else {
            const text = createElement('text')
            text.setAttr('value', target.text)
            node.insertBefore(text, before)
        }
        return
    }
    node.insetBefore(target, before)
}

export function removeChild(node, child) {
    console.log('removeChild')
    if (child.nodeType === 3) {
        node.setAttr('value', '')
        return
    }
    node.removeChild(child)
}

export function appendChild(node, child) {
    console.log('appendChild')
    if (child.nodeType === 3) {
        if (node.type === 'text') {
            node.setAttr('value', child.text)
            child.parentNode = node
        } else {
            const text = createElement('text')
            text.setAttr('value', child.text)
            node.appendChild(text)
        }
        return
    }
    node.appendChild(child)
}

export function parentNode(node) {
    console.log('parentNode')
    return node.parentNode
}

export function nextSibling(node) {
    console.log('nextSibling')
    return node.nextSibling
}

export function tagName(node) {
    console.log('tagName')
    return node.type
}

export function setTextContent(node, text) {
    console.log('setTextContent', text)
    node.text = text
}

export function setAttribute(node, key, val) {
    console.log('setAttribute')
    node.setAttr(key, val)
}