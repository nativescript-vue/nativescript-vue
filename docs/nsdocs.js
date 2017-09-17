window.NSDocs = () => {
    fetch.interceptors.push(async (res) => {
        if (res.url.endsWith('.md')) {
            const requested_markdown = await res.clone().text()
            const original = requested_markdown.match(/original: ?(.+)/)

            if (original) {
                const final = await process(requested_markdown, original[1])

                res.text = () => Promise.resolve(final)
            }
        }
        return res;
    })
}


async function process(fetched_markdown, original_url) {

    const original_markdown_res = await fetch(original_url)
    let original_markdown = await original_markdown_res.text()

    fetched_markdown = parseMarkdownContent(fetched_markdown)
    original_markdown = parseMarkdownContent(original_markdown)

    const json = getCodes(fetched_markdown.markdown).find(({ lang }) => lang === 'json')
    const rules = Object.assign({ rename: {}, remove: [] }, json ? JSON.parse(json.code) : {})
    const headings = getHeadings(original_markdown.markdown)

    headings.forEach(({ title, level }, index) => {
        const markdown_title = `${'#'.repeat(level)} ${title}`

        if (rules.rename.hasOwnProperty(markdown_title)) {
            // we want to rename a title
            const renamed_title = rules.rename[markdown_title]
            original_markdown.markdown = original_markdown.markdown.replace(markdown_title, renamed_title)
        }

        if (rules.remove.indexOf(markdown_title) !== -1) {
            // we want to remove a section
            const startIndex = original_markdown.markdown.search(markdown_title)
            let endIndex = original_markdown.markdown.length

            if (index !== headings.length - 1) {
                const next_heading = headings[index + 1]
                const next_heading_markdown = `${'#'.repeat(next_heading.level)} ${next_heading.title}`

                endIndex = original_markdown.markdown.search(next_heading_markdown)
            }

            const to_remove = original_markdown.markdown.substring(startIndex, endIndex)

            original_markdown.markdown = original_markdown.markdown.replace(to_remove, '')
        }
    })

    if(json) {
        fetched_markdown.markdown = fetched_markdown.markdown.replace('```json\n' + json.code + '\n```', '')
    }

    return `${original_markdown.frontMatter}
<p class="tip">
    This page has been auto generated based on [the official NativeScript Documentation](${original_url})
</p>
    ${original_markdown.markdown}
    ${fetched_markdown.markdown}`
}

/**
 * Extract headings from markdown string
 */
function getHeadings(markdown) {
    const headings = []

    const renderer = new marked.Renderer()
    renderer.heading = (title, level) => headings.push({ title, level })

    marked(markdown, {
        renderer: renderer
    })

    return headings
}

/**
 * Extract code blocks from markdown string
 */
function getCodes(markdown) {
    const codes = []

    const renderer = new marked.Renderer()
    renderer.code = (code, lang) => codes.push({ code, lang })

    marked(markdown, {
        renderer: renderer
    })

    return codes
}

/**
 * Parse fetched markdown file and remove / extract front matter
 */
function parseMarkdownContent(raw) {
    const markdown = raw.replace(/^---[\s\S]+?---/g, '')
    const frontMatter = raw.substring(0, raw.length - markdown.length)

    return {
        markdown,
        frontMatter
    }
}
