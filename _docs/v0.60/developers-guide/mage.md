---
version: v0.60
has_magic_breadcrumbs: true
show_category_breadcrumb: true
show_title_breadcrumb: true
category: 'Developers Guide'
title: Mage
source_url: 'https://github.com/metabase/metabase/blob/master/docs/developers-guide/mage.md'
layout: new-docs
---

# MAGE - Development Automation

Run `./bin/mage` to list your tasks. All of them support `-h` to learn more and show examples.

All tasks support a `-h` option and will print their usage info.

```shell
$ ./bin/mage
   ███╗   ███╗ █████╗  ██████╗ ███████╗
   ████╗ ████║██╔══██╗██╔════╝ ██╔════╝
   ██╔████╔██║███████║██║  ███╗█████╗
   ██║╚██╔╝██║██╔══██║██║   ██║██╔══╝
   ██║ ╚═╝ ██║██║  ██║╚██████╔╝███████╗
   ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
    The Metabase Automation Genius Engine

The following tasks are available:

cljfmt-staged   Runs cljfmt on staged files
kondo           Runs Kondo against a file, directory, or everything we usually lint
...
start-db        Start a db on a default port in docker
jar-download    Given a version, downloads a metabase jar
$ ./bin/mage kondo -h
<prints help for easily running kondo>
```

### mage Autocomplete

Run `./bin/mage setup-autocomplete` and follow the instructions to setup autocomplete in your terminal.
