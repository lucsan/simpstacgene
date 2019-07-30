# 🛠 SimpStacGene

## ⚙ Machinations

Running engine.js causes the compiler to read the data files (in data nd template folders),

The compiler creates the site pages in memory from the data, templates files and instructions in config.js.

Once the site is _constructed_ the pages and any assets in the assets folder are copied into the portal folder.

Thus any site supporting files (css, browser js, images etc), should be in the assets folder ready to be copied over to the portal.

The portal is, of course, the web root folder from which the site is served.

First the file stack is read from piecesPath (which is created by config.js)

config.piecesPath =  `${config.projectPath}${config.siteRoot}\\engine`

Non-data files are removed, leaving files found in templates and data folders.

Next files are analysed (this is primarily a parsing exercise)

Instruction files (often page component htmls) are identified as having an instruction set by 3 dashes

```
---
 instructions
---
```

Here's an example instruction set used in a template (bardot_tpl.html) page:-
```
---
  contained | default
  page | Bardot
  title | Bardot Poster
---
```
This means, the above template is to be contained in default_tpl.html (note the ref is minus the `_tpl.html`)

This template will replace the `{{ contains }}` token in default_tpl.html

bardot_tpl.html in turn has a `{{ contains }}` token, which will be replae by the refrence page, here given as bardot, so bardot.html.

Finally the analysis engine identifies the pages which are to be contained.

The create engine (create.js) goes through each command template (ones with an instruction set),
finds a container (if specified), wraps the page in the container, removes the instruction set (from the output file, the template files are never edited by the software, I'm afraid you have to do that yourself).
The title, and further content (snippets are injected).

Finally finally the portal folder is created (if needed) and the compiled site is writen into the portal, this includes files in the assets folder.

The assets folder contains additional assets, such as css, less, images, and client side javascript scripts, these are all copied into the portal with the same structure as the assets folder, ie: `assets/css/css.css` is copied into `portal/css/css.css`.
