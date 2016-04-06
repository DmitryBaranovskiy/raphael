var webpack = require("webpack");

module.exports = {
	entry: './dev/raphael.amd.js',
	output: {
		filename: "raphael-wp.js",
		libraryTarget: "umd",
		library: "Raphael",
		umdNamedDefine: true
	},

	target: "web",

	externals: [
	],

	loaders: [
		
	],
	plugins: [
		
	],

	resolveLoader: {
		
	},

	resolve: {
		modulesDirectories: ["bower_components"]
	}
};