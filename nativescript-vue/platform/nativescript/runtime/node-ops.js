import Vue from './index'

function typof(v) {
    let s = Object.prototype.toString.call(v)
    return s.substring(8, s.length - 1).toLowerCase()
}

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
    let node = new Vue.renderer.Element('label')
    node.text = text
    return node
}

export function createComment(text) {
    console.log('createComment', text)
    return new Vue.renderer.Comment(text)
}

export function insertBefore(node, target, before) {
    console.log('insertBefore')
}

export function removeChild(node, child) {
    console.log('removeChild')
}

export function appendChild(node, child) {
    console.log('appendChild')
    Vue.prototype.$document.content = child
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
    // node.setAttr(key, val)
}