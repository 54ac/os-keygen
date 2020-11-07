/**
 * Assets Config file
 */

const serverConfiguration = {
	internal: {
		server: {
			baseDir: "dist"
		},
		port: 3000
	},
	external: {
		proxy: "http://localhost:9000/path/to/project/"
	}
};

const path = require("path");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

let targetServerConfiguration = serverConfiguration.internal;

const config = function(env, args) {
	if (args.externalServer !== undefined && args.externalServer) {
		targetServerConfiguration = serverConfiguration.external;
	}

	return {
		entry: {
			index: "./src/js/index.js"
		},
		output: {
			filename: "js/index.js",
			path: path.resolve(__dirname, "dist")
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						"style-loader",
						MiniCssExtractPlugin.loader,
						"css-loader",
						"postcss-loader"
					]
				},
				{
					test: /\.js$/,
					exclude: /(node_modules)/,
					loader: "babel-loader"
				},
				{
					test: /\.(eot|svg|ttf|woff|woff2)$/,
					use: [
						{
							loader: "url-loader",
							options: {
								name: "fonts/[name].[ext]",
								publicPath: "../",
								limit: 8192
							}
						}
					]
				}
			]
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					parallel: true
				}),
				new OptimizeCssAssetsPlugin({})
			]
		},
		watchOptions: {
			poll: 1000,
			ignored: /node_modules/
		},
		plugins: [
			new BrowserSyncPlugin({
				...targetServerConfiguration,
				files: ["src/*"],
				ghostMode: {
					clicks: false,
					location: false,
					forms: false,
					scroll: false
				},
				injectChanges: true,
				logFileChanges: true,
				logLevel: "debug",
				logPrefix: "webpack",
				notify: true,
				reloadDelay: 0
			}),
			new HtmlWebpackPlugin({
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					removeRedundantAttributes: false,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					useShortDoctype: true
				},
				inject: true,
				hash: false,
				filename: "index.html",
				template: path.resolve(__dirname, "src", "index.html")
			}),
			new MiniCssExtractPlugin({
				filename: "css/index.css"
			}),
			new CleanWebpackPlugin({
				/**
				 * Some plugins used do not correctly save to webpack's asset list.
				 * Disable automatic asset cleaning until resolved
				 */
				cleanStaleWebpackAssets: false,
				verbose: true
			}),
			new WorkboxPlugin.GenerateSW({
				clientsClaim: true,
				skipWaiting: true
			})
			//	new BundleAnalyzerPlugin()
		]
	};
};

module.exports = config;
