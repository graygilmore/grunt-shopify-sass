# grunt-shopify-sass [![Build Status](https://travis-ci.org/graygilmore/grunt-shopify-sass.svg?branch=master)](https://travis-ci.org/graygilmore/grunt-shopify-sass)

> Concatenate your Sass files defined by the @import order.

### Why on earth does this exist?

Good question. Recently, Shopify has allowed theme developers to upload `.scss.liquid` files (yay!). This opens up all sorts of opportunities for theme developers being able to manipulate merchant settings with Sass functions like `lighten()`, `mix()`, mixins and includes (to name a few).

Unfortunately, the Shopify platform currently doesn't support `@import`. This means that developers must first concatenate their Sass files into a single file to upload. Previously, you'd use [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) and manually declare the order of files in your Gruntfile. This is a big departure from what developers have grown accustomed to when dealing with Sass – bring back the `@import`!

This plugin takes your main Sass file, finds and reads all of the `@import` and concatenates them into a destination file of your choosing.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-shopify-sass --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-shopify-sass');
```

## The "shopify_sass" task

### Overview
In your project's Gruntfile, add a section named `shopify_sass` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    shopify_sass: {
        your_target: {
            // Target-specific file lists
        },
    },
});
```

### Usage Examples

#### Simple
In this example, all of the imports in `styles/theme.scss` will be concatenated into `assets/theme.scss.liquid`.

```scss
/* Example "styles.theme.scss" */

@import 'normalize.scss';

@import '_typography.scss';
@import '_layout.scss';

@import '_product.scss';
```

```js
grunt.initConfig({
    shopify_sass: {
        files: {
            'assets/theme.scss.liquid': "styles/theme.scss"
        },
    },
});
```

#### Multiple sources
In this example we're using two different source files written in CoffeeScript.

```coffee
grunt.initConfig
    shopify_sass:
        files:
            'assets/theme.scss.liquid': ['styles/theme.scss', 'styles/additional.scss']
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2014-11-01   v0.2.2   No longer need to specify targets
* 2014-11-01   v0.2.1   Remove base option, keep styles in src files
* 2014-10-30   v0.2.0   First working version
