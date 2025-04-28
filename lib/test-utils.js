const {reformatMarkdownUrls} = require('./utils.js')

// Test URL reformatting

const tests = [
  {
    name: 'single footer link',
    fixture: '[footer]: simple.md',
    expected: '[footer]: simple'
  },
  {
    name: 'anchor footer link',
    fixture: '[footer]: simple.md#anchor',
    expected: '[footer]: simple#anchor'
  },
  {
    name: 'relative footer link',
    fixture: '[footer]: ./simple.md',
    expected: '[footer]: ./simple'
  },
  {
    name: 'two footer links',
    fixture: `[first]: ./first.md
[second]: second.md`,
    expected: `[first]: ./first
[second]: second`
  },
  {
    name: 'hyphenated footer anchor',
    fixture: `[first]: ./first.md#some-long-label`,
    expected: `[first]: ./first#some-long-label`
  },
  {
    name: 'mix of footer file types',
    fixture: `[footer-links]: http://something.png
[footer-anchor]: ./example.md#some-long-label`,
    expected: `[footer-links]: http://something.png
[footer-anchor]: ./example#some-long-label`
  },
  {
    name: 'full page',
    fixture: `Testing
This [link](http://metabase.com) should not change.
[This link](page.md) should change.
[Image links](name.png) should not.
[Some links](../parent.md) go up, [some links](below/here.md) go down.
[And of course][we-can-use] [footer links][footer-links] as well.
[Anchors](anchor.md#label) are [preserved](preserved.html#label).
Anchors work [in footers][footer-anchor] too.

[we-can-use]: ../../somewhere/we-can-use.md
[footer-links]: http://something.png
[footer-anchor]: ./example.md#some-long-label`,
   expected: `Testing
This [link](http://metabase.com) should not change.
[This link](page) should change.
[Image links](name.png) should not.
[Some links](../parent) go up, [some links](below/here) go down.
[And of course][we-can-use] [footer links][footer-links] as well.
[Anchors](anchor#label) are [preserved](preserved.html#label).
Anchors work [in footers][footer-anchor] too.

[we-can-use]: ../../somewhere/we-can-use
[footer-links]: http://something.png
[footer-anchor]: ./example#some-long-label`
  },
]

function testUrlReformatting () {
  const filePath = ''

  for (const test of tests) {
    const actual = reformatMarkdownUrls(filePath, test.fixture)
    const expectedLines = test.expected.split('\n')
    const actualLines = actual.split('\n')
    expectedLines.forEach((eL, i) => {
      const aL = actualLines[i]
      if (eL !== aL) {
        console.log(`"${test.name}" ${i} E "${eL}" A "${aL}"`)
      }
    })
  }
}

testUrlReformatting()
