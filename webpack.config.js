"use strict";

const webpack = require("webpack");
const fs = require("fs");
const path = require("path");

module.exports = function(env) {
	let plugins = [
		new webpack.BannerPlugin({
			banner: fs.readFileSync('./dev/banner.txt', 'utf8'),
			raw: true,
			entryOnly: true
		})
	];
	let externals = [];
	let filename = "raphael";

	if(env && env.noDeps){
		console.log('Building version without deps');
		externals.push("eve");
		filename += ".no-deps"
	}

	if(env && env.min){
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

	return {
		entry: './dev/raphael.amd.js',
		output: {
			filename: filename + ".js",
			libraryTarget: "umd",
			library: "Raphael"
		},

		externals: externals,

		plugins: plugins,

		module: {
			rules: [
				{
					test: /\.js$/,
					loader: "eslint-loader",
					include: path.join(__dirname, "dev"),
					options: {
						configFile: path.join(__dirname, '.eslintrc.js')
					}
				}
			],
		},

		resolve: {
			modules: ["bower_components", "node_modules"],
			alias: {
				"eve": "eve-raphael/eve"
			}
		}
	};
};
