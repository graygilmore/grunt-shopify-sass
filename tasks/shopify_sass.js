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

        var rex = /@import\s*(("([^"]+)")|('([^']+)'))\s*;/g;
        var match;

        // Iterate over each src/dest pairing
        this.files.forEach( function(files) {

            var fileContents = [];

            // Iterate over each src file
            files.src.forEach( function(filepath, i) {

                fileContents[i] = grunt.file.read(filepath);

                while (match = rex.exec(fileContents[i])) {

                    // [3] double quotes, @import "_import-file.scss";
                    // [5] single quotes, @import '_import-file.scss';
                    var importFile = path.join(path.dirname(filepath), (match[3] || match[5]));

                    // Skip the file if it doesn't exist
                    if (!grunt.file.exists(importFile)) {
                        grunt.log.warn('File to import: "' + importFile + '" not found.');
                        continue;
                    }

                    // Replace the @import text with the actual contents of the file
                    fileContents[i] = fileContents[i].replace(match[0], grunt.file.read(importFile));
                }
            });

            // Write our new file
            grunt.file.write(files.dest, fileContents.join("\n"));

            // Print a success message.
            grunt.log.writeln('File "' + files.dest + '" created.');

        });

    });

};
