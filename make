#!/usr/bin/env node
var file, read,
	ujs = require('uglify-js'),
	fs = require('fs'),
	input = {
		core : 'raphael.core.js',
		svg  : 'raphael.svg.js',
		vml  : 'raphael.vml.js',
		eve  : './eve/eve.js',
		copy : 'copy.js'
	},
	output = {
		'raphael': ['eve', 'core', 'svg', 'vml']
	},
	out = '';

// Read
for (file in input) {
	read = fs.readFileSync(input[file], 'utf8');
	// Remove global checks in svg and vml files
	// Wrap in closures and return early if necessary
	if ( file === 'svg' || file === 'vml' ) {
		read = read.replace( /window\.Raphael.*\(R\)\s*\{/,
			'(function(){\n' +
			'    if (!R.' + file + ') {\n' +
			'        return;\n' +
			'    }'
		);
		read = read.replace( /\}\(window\.Raphael\);\s*$/, '})();' );
	}
	input[file] = read;
}

// Combine
console.log('Concatenating');
for (var i = 0, l = output.raphael.length; i < l; i++) {
	file = output.raphael[i];
	// Append svg and vml output before core's return statement
	if ( file === 'svg' || file === 'vml' ) {
		out = out.replace(/(\n\s*\/\/\s*EXPOSE(?:\n|.)*\}\)\);)/, '\n\n' + input[file] + '$1');
	} else {
		out += input[file] + '\n';
	}
}
output.raphael = out;

// Compress
console.log('Compressing');
output['raphael-min'] = ujs.minify(out, { fromString: true }).code;

// Write
function w( f, code ) {
	f += '.js';
	fs.writeFile(f, input.copy + '\n' + code, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Saved to \033[32m' + f + '\033[0m\n');
		}
	});
}
for (file in output) {
	w(file, output[file]);
}
