const ViewNode = require('renderer2/ViewNode').ViewNode

describe('ViewNode', () => {

    it('firstChild returns null initially', () => {
        let node = new ViewNode

        expect(node.firstChild).toBeNull()
    })

    it('firstChild returns the only child', () => {
        let node = new ViewNode
        let childNode = new ViewNode

        node.childNodes = [childNode]

        expect(node.firstChild).toEqual(childNode)
    })

    it('firstChild returns the correct child', () => {
        let node = new ViewNode
        let childNode = new ViewNode
        let otherChildNode = new ViewNode

        node.childNodes = [childNode, otherChildNode]

        expect(node.firstChild).toEqual(childNode)
    })

    it('lastChild returns null initially', () => {
        let node = new ViewNode

        expect(node.lastChild).toBeNull()
    })

    it('lastChild returns the only child', () => {
        let node = new ViewNode
        let childNode = new ViewNode

        node.childNodes = [childNode]

        expect(node.lastChild).toEqual(childNode)
    })

    it('lastChild returns the correct child', () => {
        let node = new ViewNode
        let childNode = new ViewNode
        let otherChildNode = new ViewNode

        node.childNodes = [otherChildNode, childNode]

        expect(node.lastChild).toEqual(childNode)
    })

    it('insertBefore throws if no childNode is given', () => {
        let node = new ViewNode

        expect(node.insertBefore).toThrow(`Can't insert child.`)
    })

    it('insertBefore throws if childNode has a different parent', () => {
        let node = new ViewNode
        let childNode = new ViewNode
        childNode.parentNode = new ViewNode

        expect(() => node.insertBefore(childNode)).toThrow(`already has a different parent`)
    })


    it('insertBefore throws if childNode is already a child', () => {
        let node = new ViewNode
        let childNode = new ViewNode
        childNode.parentNode = node

        expect(() => node.insertBefore(childNode)).toThrow(`already a child`)
    })

    it('insertBefore throws if reference node has a different parent', () => {
        let node = new ViewNode
        let childNode = new ViewNode
        let refNode = new ViewNode

        refNode.parentNode = new ViewNode

        expect(() => node.insertBefore(childNode, refNode)).toThrow(`reference node has a different parent`)
    })

    it('insertBefore sets the correct node relations', () => {
        let node = new ViewNode
        let childNode = new ViewNode
        let refNode = new ViewNode
        node.childNodes = [refNode]
        refNode.parentNode = node

        node.insertBefore(childNode, refNode)

        expect(node.childNodes.length).toBe(2)
        expect(childNode.parentNode).toEqual(node)
        expect(childNode.prevSibling).toBeFalsy()
        expect(childNode.nextSibling).toEqual(refNode)
        expect(refNode.prevSibling).toEqual(childNode)
        expect(refNode.nextSibling).toBeFalsy()
    })

    it('appendChild throws if no childNode is given', () => {
        let node = new ViewNode

        expect(node.appendChild).toThrow(`Can't append child.`)
    })

    it('appendChild throws if childNode has a different parent', () => {
        let node = new ViewNode
        let childNode = new ViewNode
        childNode.parentNode = new ViewNode

        expect(() => node.appendChild(childNode)).toThrow(`already has a different parent`)
    })

    it('appendChild throws if childNode is already a child', () => {
        let node = new ViewNode
        let childNode = new ViewNode
        childNode.parentNode = node

        expect(() => node.appendChild(childNode)).toThrow(`already a child`)
    })

    it('appendChild sets the correct node relations for only child', () => {
        let node = new ViewNode
        let childNode = new ViewNode

        node.appendChild(childNode)

        expect(node.childNodes.length).toBe(1)
        expect(childNode.parentNode).toEqual(node)
        expect(childNode.prevSibling).toBeFalsy()
    })

    it('appendChild sets the correct node relations for multiple children', () => {
        let node = new ViewNode
        let childNode = new ViewNode
        let prevChildNode = new ViewNode

        node.appendChild(prevChildNode)
        node.appendChild(childNode)

        expect(node.childNodes.length).toBe(2)
        expect(childNode.prevSibling).toEqual(prevChildNode)
        expect(prevChildNode.nextSibling).toEqual(childNode)
    })

    it('removeChild throws if no childNode is given', () => {
        let node = new ViewNode

        expect(node.removeChild).toThrow(`Can't remove child.`)
    })

    it('removeChild throws if childNode has a different parent', () => {
        let node = new ViewNode
        let childNode = new ViewNode
        childNode.parentNode = new ViewNode

        expect(() => node.removeChild(childNode)).toThrow(`different parent.`)
    })

    it('removeChild sets the correct node relations', () => {
        let node = new ViewNode
        let prevChildNode = new ViewNode
        let childNode = new ViewNode
        let nextChildNode = new ViewNode

        node.appendChild(prevChildNode)
        node.appendChild(childNode)
        node.appendChild(nextChildNode)

        expect(prevChildNode.nextSibling).toEqual(childNode)
        expect(nextChildNode.prevSibling).toEqual(childNode)

        node.removeChild(childNode)

        expect(node.childNodes.length).toBe(2)
        expect(prevChildNode.nextSibling).toEqual(nextChildNode)
        expect(nextChildNode.prevSibling).toEqual(prevChildNode)
        expect(childNode.parentNode).toBeNull()
    })
})