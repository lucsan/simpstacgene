# 🛠 SimpStacGene

💡 Simple Static Site Generator - 💎 A node based static page site generator which creates html files from template html files.

There are two modes:
  - Developing the generator
  - Site building

To develop the generator clone from https://github.com/lucsan/simpstacgene

# ⚙ Construct a static site

_(so you've decided to build a static website, yay, ✨)_

_use_ `npm install --save lucsan/simpstacgene#master`

This will install simpstacgene in the node_modules folder and create a config.js in the root of your project.

You should create a `templates` and an `assets` folder in the root of your project. You can copy these from `node_modules/simpstacgene/demo` if you like _(it's a very good place to begin)_.

The `📂demo` folder contains simple examples of how the templates work.

Your site components are organized into __3__ main folders: `templates`, `data`, and `assets` (snips is just an organizational folder which we will come to in due course).

### 🧬 Templates

Templates contain (and may be contained by) other templates, and may contain snips (which are just small chunks of html (ie: small templates) which probably don't contain anything else, though they can).

Templates must be named `_tpl.html` for example: `home_tpl.html`

You can give a template some simple instructions, for example:


```
---
  contained | site_main
  page | index
  title | Home Page
  contains | data.aList
---
```
_Note: these are all the instructions_

In the example above, `contained | site_main` means the file with this instruction in it, will be contained, inside `site_main_tpl.html` at the point where the special token `{{ contains }}` is stamped into, say, `site_main_tpl.html`.

Generally you will want a mega-container template such as `demo/templates/site_main_tpl.html`

This will most likely have some 🎟tokens such as `{{ menu }}` and `{{ banner }}` and of course `{{ contains }}` stuff which you will want on all your pages, but, will probably not contain any instructions.

The `page | index` instruction means the page will be called `index.html` when it is generated, which is to say, a file called index.html will be created in the web root (portal) made from the instructing, and the mega-container templates combined together.

`title` tells the mega-container template what to call this page (its title)

The instructing template may contain other templates by using tokens which we will look at next, it may also contain a list of templates, for example a gallery of pictures, this comes from the `data` folder, an explanation of which, we will arrive at shortly.

##### 🎟 tokens

Tokens refer to other templates or snips, they are referenced using the name of the file without the `_tpl.html`, so `{{ menu }}` refers to `menu_tpl.html` (which may be in either the template or snips folder)

##### ✂ snips

Snips is just an organizational folder inside the templates folder, you can add as many folders here as you like to organize your templates to your liking.

### 🧺 data

The data folder contains lists or collections of templates which are intended to be displayed in groups, the instruction `contains | data.aList` means, find all the templates in folder `data/aList`, and  stamp them into the instructing template at the point where the token `{{ contains }}` exists.

_note: if you have a mega-container it puts the contents of instruction pages with the `contains |` instruction, sooo, they shouldn't also refer to data lists._

### 🎎 assets

The contents of the assets folder is copied to the web root in it's entirety, with the exception of folders listed in the `assetFolderExcludes` config array (the details of which we will cover in the next section.)

This is where you put all the assets your site needs, ie: css files, images and other media.

#### 📃 Config.js

You may wish to call your web root something different than `portal`, change the value of `htmlRoot` to your favorite web root.

You may not like to have your site additional files in a folder called `assets`, change the assetsRoot value.

You may have files or folders you do not want copied from your assets folder to your web root, add them to the `assetFolderExcludes` values array - eg: `['less', 'doNotUse']`
```javascript
exports.values = () => {
  return {
    htmlRoot: 'portal',
    assetsRoot: 'assets',
    assetFolderExcludes: ['less']
  }
}
```

### configuring package.json

You can add the following to the scripts section of package.json and use `npm run build` and `npm run assets`

```javascript
"build":  "node node_modules\\simpstacgene\\engine\\engine.js",
"assets": "node node_modules\\simpstacgene\\engine\\npmMoveAssets.js",
```

## 🛠 In development mode
(ie: cloned from github)

🏃‍ to run use: `node engine/engine.js` - in the project root folder to build.

🏃‍ to load assets to the portal use: `node engine/npmMoveAssets.js` - in the project root folder to build.

🏃‍ Run tests use: `npm test` - in the project root folder.

If you have changed the root folder (simpstacgene) to some other, change `engine/config.js` siteRoot to your folder name.
