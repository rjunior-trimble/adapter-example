const path = require('path')
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {
	const buildMode = argv.mode || 'production'

	let isProduction = buildMode === 'production';
	return {
		entry: './src/index.ts',
		output: {
			filename: 'index.js',
			libraryTarget: "commonjs2",
			path: path.resolve(__dirname, 'dist')
		},
		resolve: {
			extensions: ['.ts', '.js']
		},
		target: "node",
		externals: isProduction ? [] : [nodeExternals()],
		mode: process.env.NODE_ENV || 'production',
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					loader: 'ts-loader'
				}
			]
		}
	}
}