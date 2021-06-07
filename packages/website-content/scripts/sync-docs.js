'use strict'

var fetch = require('node-fetch')
var fs = require('fs')
var path = require('path')
const { outdent } = require('outdent')

const OUTPUT_DIR = path.resolve(__dirname, '../content')
const DOCS_DIR = path.resolve(OUTPUT_DIR, 'docs')

const targets = [
    {
        section: 'data-types',
        title: 'Json',
        slug: 'json',
        path: 'data-types/02-json.md',
        url: `https://raw.githubusercontent.com/kransio/json/master/docs/README.md`,
    },
]
Promise.all(
    targets.map(async (target, index) => {
        const response = await fetch(target.url)
        const markdown = await response.text()
        const regex = /\n## Functions/
        const [, content] = markdown.split(regex)
        const cleaned = content.trim()
        const absolute = path.resolve(DOCS_DIR, target.path)
        const annotated = [
            outdent`
            ---
            section: ${target.section}
            title: ${target.title}
            slug: ${target.slug}
            ---`,
            cleaned,
        ].join('\n\n')
        fs.writeFileSync(absolute, annotated)
    })
)
