import { default as document } from '../renderer/DocumentNode'
import { trace } from '../util'
import * as profiler from 'tns-core-modules/profiling'

export const namespaceMap = {}

export function createElement(tagName, vnode) {
  const start = profiler.time()

  const element = document.createElement(tagName)

  trace(`CreateElement(${tagName})`, profiler.time() - start)

  return element
}

export function createElementNS(namespace, tagName) {
  trace(`CreateElementNS(${namespace}#${tagName})`)
  return document.createElementNS(namespace, tagName)
}

export function createTextNode(text) {
  trace(`CreateTextNode(${text})`)
  return document.createTextNode(text)
}

export function createComment(text) {
  trace(`CreateComment(${text})`)

  return document.createComment(text)
}

export function insertBefore(parentNode, newNode, referenceNode) {
  trace(`InsertBefore(${parentNode}, ${newNode}, ${referenceNode})`)
  parentNode.insertBefore(newNode, referenceNode)
}

export function removeChild(node, child) {
  trace(`RemoveChild(${node}, ${child})`)
  node.removeChild(child)
}

export function appendChild(node, child) {
  const start = profiler.time()

  const element = node.appendChild(child)

  trace(`AppendChild(${node}, ${child})`, profiler.time() - start)

  return element
}

export function parentNode(node) {
  trace(`ParentNode(${node})`)

  return node.parentNode
}

export function nextSibling(node) {
  trace(`NextSibling(${node})`)

  return node.nextSibling
}

export function tagName(elementNode) {
  trace(`TagName(${elementNode})`)

  return elementNode.tagName
}

export function setTextContent(node, text) {
  trace(`SetTextContent(${node}, ${text})`)

  node.setText(text)
}

export function setAttribute(node, key, val) {
  trace(`SetAttribute(${node}, ${key}, ${val})`)

  node.setAttribute(key, val)
}

export function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '')
}
