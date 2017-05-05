import {default as document} from '../renderer/DocumentNode'

export const namespaceMap = {}

export function createElement(tagName, vnode) {
    console.log(`{NSVue} -> CreateElement(${tagName})`)
    return document.createElement(tagName)
}

export function createElementNS(namespace, tagName) {
    console.log(`{NSVue} -> CreateElementNS(${namespace}#${tagName})`)
    return document.createElementNS(namespace, tagName)
}

export function createTextNode(text) {
    console.log(`{NSVue} -> CreateTextNode(${text})`)
    return document.createTextNode(text)
}

export function createComment(text) {
    console.log(`{NSVue} -> CreateComment(${text})`)

    return document.createComment(text)
}

export function insertBefore(parentNode, newNode, referenceNode) {
    console.log(`{NSVue} -> InsertBefore(${parentNode}, ${newNode}, ${referenceNode})`)
    parentNode.insertBefore(newNode, referenceNode)
}

export function removeChild(node, child) {
    console.log(`{NSVue} -> RemoveChild(${node}, ${child})`)
    node.removeChild(child)
}

export function appendChild(node, child) {
    console.log(`{NSVue} -> AppendChild(${node}, ${child})`)

    node.appendChild(child)
}

export function parentNode(node) {
    console.log(`{NSVue} -> ParentNode(${node})`)

    return node.parentNode
}

export function nextSibling(node) {
    console.log(`{NSVue} -> NextSibling(${node})`)

    return node.nextSibling
}

export function tagName(elementNode) {
    console.log(`{NSVue} -> TagName(${elementNode})`)

    return elementNode.tagName
}

export function setTextContent(node, text) {
    console.log(`{NSVue} -> SetTextContent(${node}, ${text})`)

    node.setText(text)
}

export function setAttribute(node, key, val) {
    console.log(`{NSVue} -> SetAttribute(${node}, ${key}, ${val})`)

    node.setAttribute(key, val)
}