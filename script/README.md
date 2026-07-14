# Linter

A linter for Learn Metabase.

## Usage

Lints a file or directory by running all checks on all files.

```
script/linter
```

If linter finds problems, it will return the file, message, kind, line number, and text of each infected line. E.g.,

```
{
  file: '../tests/sample-dir/cross-filtering.md',
  message: "Figure formatting: should be '<em>Fig. 1</em>.'",
  kind: 'Figure',
  num: 19,
  text: `{% include image_and_caption.html url='/learn/images/cross-filtering-using-a-chart-to-update-a-dashboard-filter/starter-dashboard.png' description="<em>Fig. X</em>. Our starter dashboard that with cards about Orders from the Sample Dataset included with Metabase.." %}`
}
{
  file: '../tests/sample-dir/secret-dir/custom-destinations.md',
  message: "Figure formatting: should be '<em>Fig. 3</em>.'",
  kind: 'Figure',
  num: 37,
  text: '{% include image_and_caption.html url="/learn/images/custom-destinations-choose-what-happens-when-people-click-on-charts-in-your-dashboard/clickpath.gif" description="<em>Fig. 4</em>. A clickpath from the <strong>Orders overview</strong> dashboard to the <strong>Product detail</strong> dashboard, to the Metabase docs search page for the clicked category: Widget." %}'
}
```

### Commands

```
Usage: linter [options] [command]

Options:
  -V, --version           output the version number
  -V, --version           output the version number
  -h, --help              display help for command

Commands:
  figure|fig <paths>      Check figure formatting.
  all-checks|all <paths>  Run all checks on path.
  help [command]          display help for command
```

## Configuration

List checks to run with the `all-checks` command in the `config/default.json`. You can disable checks by prefixing a check with an underscore (e.g., "\_figure").

## Install

From the metabase.github.io directory, run:

```
npm install
```

This command downloads the node_modules.
