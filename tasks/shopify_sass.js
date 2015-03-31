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
        var match, fileIterator;

        // Iterate over each src/dest pairing
        if (this.files.length !== 0) {
            fileIterator = this.files;
        } else if (this.target === "files") {
            var dataKey = Object.keys(this.data)[0];
            fileIterator = [{ src: this.data[dataKey], dest: dataKey }];
        }

        fileIterator.forEach( function(files) {

            var fileContents = [];

            if (typeof files.src === "string")
                files.src = [files.src];

            // Iterate over each src file
            files.src.forEach( function(filepath, i) {

                fileContents[i] = grunt.file.read(filepath);
                var imports = {};

                /* Find all of our @imports */
                while( match = rex.exec(fileContents[i]) ) {

                    // [3] double quotes, @import "_import-file.scss";
                    // [5] single quotes, @import '_import-file.scss';
                    var importFile = path.join(path.dirname(filepath), (match[3] || match[5]));

                    // Skip the file if it doesn't exist
                    if (!grunt.file.exists(importFile)) {
                        grunt.log.warn('File to import: "' + importFile + '" not found.');
                        continue;
                    }

                    imports[match[0]] = importFile;
                }

                for( var imp in imports ) {
                    // Replace the @import text with the actual contents of the file
                    fileContents[i] = fileContents[i].replace(imp, grunt.file.read(imports[imp]));
                }
            });

            // Write our new file
            grunt.file.write(files.dest, fileContents.join("\n"));

            // Print a success message.
            grunt.log.writeln('File "' + files.dest + '" created.');

        });

    });

};
