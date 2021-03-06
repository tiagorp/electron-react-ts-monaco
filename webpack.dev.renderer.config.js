const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { spawn } = require('child_process')

const _mode = 'development'

const configurationRenderer = {
    entry: {
        index: path.resolve(__dirname, 'src', 'renderer', 'index.tsx'),
    },

    output: {
        //filename: '[name].[hash].js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true, // Does not perform type check but speeds up the hot reload.
                    },
                },
            },

            {
                test: /\.hbs$/,
                use: { loader: 'handlebars-loader' },
            },

            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },

            {
                test: /\.scss$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
            },

            {
                test: /\.(png|jpg)$/,
                use: { loader: 'file-loader' },
            },
        ],
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },

    mode: _mode,
    target: 'electron-renderer',
    //devtool: 'source-map',
    devtool: 'eval-cheap-source-map',
    //devtool: 'cheap-source-map',

    devServer: {
        contentBase: [path.resolve(__dirname, 'dist'), path.resolve(__dirname, 'node_modules')],
        contentBasePublicPath: ['/', '/node_modules'],
        historyApiFallback: true,
        compress: true,
        port: 4000,
        publicPath: '/',

        stats: {
            colors: true,
            chunks: false,
            children: false,
        },
        before() {
            spawn('electron', ['.'], {
                shell: true,
                env: process.env,
                stdio: 'inherit',
            })
                .on('close', (code) => process.exit(0))
                .on('error', (spawnError) => console.error(spawnError))
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index'],
            title: 'electron react ts boilerplate',
            description: 'custom boilerplate',
            template: path.resolve(__dirname, 'src', 'renderer', 'index-template.hbs'),
        }),
    ],
}

module.exports = configurationRenderer
