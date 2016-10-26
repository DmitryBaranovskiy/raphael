"use strict";

const webpack = require("webpack");
const fs = require("fs");

const args = process.argv;
var sourceEntry = './dev/raphael.amd.js';

let plugins = [
	new webpack.BannerPlugin(fs.readFileSync('./dev/banner.txt', 'utf8'), { raw: true, entryOnly: true })
];
let externals = [];
let filename = "raphael";


if(args.indexOf('--no-deps') !== -1){
	console.log('Building version without deps');
	externals.push("eve");
	filename += ".no-deps"
}

if(args.indexOf('--no-vml') !== -1){
	console.log('Building version without vml');
    sourceEntry = './dev/raphael.amd.novml.js';
	filename += ".no-vml"
}

if(args.indexOf('--min') !== -1){
	console.log('Building minified version');
	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress:{
				dead_code: false,
				unused: false
			}
		})
	);
	filename += ".min"
}

module.exports = {
	entry: sourceEntry,
	output: {
		filename: filename + ".js",
		libraryTarget: "umd",
		library: "Raphael"
	},

	externals: externals,

	plugins: plugins,

	loaders: [
  		{
  			test: /\.js$/, 
  			loader: "eslint-loader", 
  			include: "./dev/"
  		}
	],
  	
	eslint: {
    	configFile: './.eslintrc'
  	},

	resolve: {
		modulesDirectories: ["bower_components"],
		alias: {
			"eve": "eve-raphael/eve"
		}
	}
};