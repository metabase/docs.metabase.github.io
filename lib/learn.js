const fs = require('fs')
const util = require("util");
const YAML = require("yamljs");

const mkdirp = util.promisify(require("mkdirp"));

const learnManifestPath = "./_data/learn.yml"

function readManifest () {
    return YAML.parse(fs.readFileSync(learnManifestPath).toString())
}

function nameToFS (name) {
    return name.replace(/\s+/g, '-').toLowerCase()
}

async function makeDirectory (trackName) {
    await mkdirp(`./_learn/${nameToFS(trackName)}`)
}

async function copyFile(src, dest) {
    console.log(src, dest)
    if(!src) return false
    fs.copyFileSync(src, dest)
}

async function copyContent (manifest = readManifest()) {

    console.log("making _learn directory")

    await mkdirp("./_learn")

    manifest.map(async section => {
        makeDirectory(section.name)
        if(section.articles) {
            section.articles.map(async article => {
                // TODO - update the frontmatter for all articles
                await copyFile(article.content, `./_learn/${nameToFS(section.name)}/${nameToFS(article.title)}.md`)
            })
        }
    })

    await copyFile("./learn-fixture.html", "./_learn/index.html")
}

// destructive function to clean the learn directory
function clean() {
    fs.rmdirSync("_learn/", { recursive: true, force: true }, (error) => console.log(error))
}

clean()
copyContent()
