/*
 * grunt-shopify-sass
 * https://github.com/graygilmore/grunt-shopify-sass
 *
 * Copyright (c) 2014 Gray Gilmore
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var path = require("path");

    grunt.registerMultiTask('shopify_sass', 'Concatenate your Sass files defined by the @import order.', function() {

        var options = this.options({
            base: ''
        });

        var rex = /@import\s*("[^"]+"|'[^']+')\s*;/g;
        var match;

        // Iterate over each specified src file
        this.files.forEach( function(files) {

            var sources = [];

            var file = files.src.filter(function(filepath) {

                var fileContents = grunt.file.read(filepath);

                if( !options.base ) {
                    // If no base is provided, make it relative to the src file
                    options.base = path.dirname(filepath);
                }

                while (match = rex.exec(fileContents)) {
                    // Extract just the source of the file
                    sources.push(path.join(options.base, (match[1])) );
                }
            });

            var newContents = sources.filter( function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map( function(filepath) {
                // Read file source.
                return grunt.file.read(filepath);
            }).join("\n");

            grunt.file.write(files.dest, newContents);

            // Print a success message.
            grunt.log.writeln('File "' + files.dest + '" created.');

        });

    });

};
