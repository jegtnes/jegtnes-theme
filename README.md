# Jegtnes-theme
A theme for Ghost created mostly for personal use.
Thanks to *[Linen](http://themespectre.com/linen)* for providing a great
starting point.

## Prerequisites

1. Node.js
2. Gulp (`npm install -g gulp`)

## Setup

Clone (or fork) this repository into your /content/themes/ folder.

Run `npm install` in the directory directory to install Gulp modules.

Open the `Gulpfile.js`, find the `styles-build` task, and change the URLs there
to reflect some pages that will contain all of the CSS you're using. Ideally
you'd have a styleguide covering this with some blog posts for edge cases.

Run `gulp` to build your assets, `gulp watch` to watch for changes continually,
and `gulp build` to create compressed assets for production use.
