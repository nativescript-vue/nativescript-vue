import Vue from './index'

export const namespaceMap = {}

export function createElement(tagName, vnode) {
    console.log(`{NSVue} -> CreateElement(${tagName})`)
    return new Vue.renderer.Element(tagName)
}

export function createElementNS(namespace, tagName) {
    console.log(`{NSVue} -> CreateElementNS(${namespace}#${tagName})`)
    return new Vue.renderer.Element(namespace + ':' + tagName)
}

export function createTextNode(text) {
    console.log(`{NSVue} -> CreateTextNode(${text})`)
    let node = new Vue.renderer.Element('detached-text')
    node.setAttr('text', text)
    return node
}

export function createComment(text) {
    console.log(`{NSVue} -> CreateComment(${text})`)

    return new Vue.renderer.Comment(text)
}

export function insertBefore(parentNode, newNode, referenceNode) {
    console.log(`{NSVue} -> InsertBefore(${parentNode}, ${newNode}, ${referenceNode})`)
    try {
        parentNode.insertBefore(newNode, referenceNode)
    } catch (e) {
        console.log('IB>>> ', e)
    }
}

export function removeChild(node, child) {
    console.log(`{NSVue} -> RemoveChild(${node}, ${child})`)

    try {
        node.removeChild(child)
    } catch (e) {
        console.log('RC>>> ', e)
    }
}

export function appendChild(node, child) {
    console.log(`{NSVue} -> AppendChild(${node}, ${child})`)

    try {
        node.appendChild(child)
    } catch (e) {
        console.log('AC>>> ', e)
    }
}

export function parentNode(node) {
    console.log(`{NSVue} -> ParentNode(${node})`)

    return node.parentNode()
}

export function nextSibling(node) {
    console.log(`{NSVue} -> NextSibling(${node})`)

    return node.nextSibling()
}

export function tagName(elementNode) {
    console.log(`{NSVue} -> TagName(${elementNode})`)

    return elementNode.type
}

export function setTextContent(node, text) {
    console.log(`{NSVue} -> SetTextContent(${node}, ${text})`)

    node.setAttr('text', text)
}

export function setAttribute(nodeElement, key, val) {
    console.log(`{NSVue} -> SetAttribute(${nodeElement}, ${key}, ${val})`)

    nodeElement.setAttr(key, val)
}