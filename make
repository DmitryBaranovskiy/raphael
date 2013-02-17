#!/usr/bin/env node
var ujs = require('uglify-js'),
    fs = require('fs'),
	input = {
		core : 'raphael.core.js',
		svg  : 'raphael.svg.js',
		vml  : 'raphael.vml.js',
		eve  : './eve/eve.js',
		copy : 'copy.js'
	},
	output = {
		'raphael-min.js'     : ['eve', 'core', 'svg', 'vml'],
		'raphael.js'         : ['eve', 'core', 'svg', 'vml']
	};

for (var file in input) {
	input[file] = fs.readFileSync(input[file], 'utf8');
}
for (file in output) {
	var out = '';
	if (file.indexOf('min') !== -1) {
		console.log('Compressing ' + file);
		for (var i = 0, l = output[file].length; i < l; i++) {
			var o = ujs.minify(input[output[file][i]], {
				fromString : true
			});
			out += o.code;
		}
	} else {
		console.log('Concatinating ' + file);
		for (i = 0, l = output[file].length; i < l; i++) {
			out += input[output[file][i]] + '\n';
		}
	}
	(function(f, code){
		fs.writeFile(f, input.copy + '\n' + code, function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log('Saved to \033[32m' + f + '\033[0m\n');
			}
		});
	})(file, out);
}
