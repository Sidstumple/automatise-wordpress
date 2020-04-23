const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const glob = require('glob');
const config = require('./config/latest.js');

const { PORT } = process.env;
const entry = glob.sync('**/*.js', {
	cwd: './src/includes/components/acf-blocks'
}).reduce(function (obj, el) {
	obj[path.parse(el).dir] = './src/includes/components/acf-blocks/' + el;
	return obj;
}, {});
entry.main = './src/assets/index.js';

module.exports = {
	mode: config.mode,
	entry,
	output: {
		path: path.resolve(__dirname, `dist/content/themes/${config.themeName}/assets`),
		filename: '[name].js',
		publicPath: config.publicPath,
	},
	watchOptions: {
		ignored: ['wpconfig/**', 'node_modules/**', 'vendor/**', 'config/**', 'scripts/**']
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: [
					{
						loader: 'vue-loader',
					},
				],
			},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env',
									{
										targets: {
											esmodules: true,
										},
									}
								]
							],
							comments: false,
							plugins: ['@babel/plugin-transform-runtime']
						},
					},
					'eslint-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: (loader) => [
								require('postcss-import')({ root: loader.resourcePath }),
								require('postcss-preset-env')(),
								require('cssnano')()
							]
						}
					},
					'sass-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [
								'./src/assets/scss/tools/_index.scss'
							]
						},
					},
				]
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100'
			}
		]
	},
	resolve: {
		modules: ['node_modules'],
		alias: {
			'vue$': config.mode === 'development' ? 'vue/dist/vue.js' : 'vue/dist/vue.min'
		}
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new StylelintPlugin({
			configFile: './.stylelintrc.config.js',
			fix: true,
			emitWarning: true,
			emitError: true
		}),
		new CopyWebpackPlugin([
			{
				from: '**/*.php',
				to: path.resolve(__dirname, `dist/content/themes/${config.themeName}`),
				context: './src',
				ignore: ['includes/components/acf-blocks/*.js', 'includes/components/acf-blocks/*.css']
			},
			{
				from: '**/*',
				to: path.resolve(__dirname, `dist/content/themes/${config.themeName}/assets/img`),
				context: './src/assets/img'
			},
			{
				from: '**/*.svg',
				to: path.resolve(__dirname, `dist/content/themes/${config.themeName}/includes/components/svgs`),
				context: './src/includes/components/svgs',
				ignore: ['generate.php']
			},
			{
				from: '**/*.json',
				to: path.resolve(__dirname, `dist/content/themes/${config.themeName}/includes/field-groups`),
				context: './src/includes/field-groups'
			},
			{
				from: 'style.css',
				to: path.resolve(__dirname, `dist/content/themes/${config.themeName}`),
				context: './src'
			}
		]),
		new VueLoaderPlugin(),
		<% if(wordpressType === 'normal') { %>
	new BrowserSyncPlugin(
		{
			proxy: config.url,
			port: PORT,
			https: true,
			open: false
		}
	)
	<% } %>
	]
};